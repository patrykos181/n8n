import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import csrf from 'csurf';
import rateLimit from 'express-rate-limit';

import { AuthService } from './auth/service.js';
import { AuditLogger } from './security/audit.js';
import { Permissions, requirePermission } from './security/rbac.js';
import { SecretStore } from './security/secrets.js';

const app = express();
const auth = new AuthService();
const audit = new AuditLogger();
const secretStore = new SecretStore({ provider: 'vault' });

app.use(express.json());
app.use(
	helmetsWithPolicies(),
);
app.use(
	cors({
		origin: ['https://app.example.com'],
		methods: ['GET', 'POST', 'PATCH'],
		credentials: true,
	}),
);
app.use(rateLimit({ windowMs: 60 * 1000, limit: 100, standardHeaders: 'draft-7' }));
app.use(csrf({ cookie: false }));
app.use(audit.middleware());

app.use((req, _res, next) => {
	const sessionId = req.header('x-session-id');
	if (sessionId) {
		req.user = auth.getSession(sessionId);
	}
	next();
});

app.post('/auth/register', (req, res) => {
	const { email, password, oauthProvider } = req.body;
	const { user, verifyToken } = auth.register({ email, password, oauthProvider });
	req.audit('auth.register', { userId: user.id, email });
	res.status(201).json({ userId: user.id, verifyToken });
});

app.post('/auth/login/password', (req, res) => {
	const result = auth.loginPassword({ ...req.body, ip: req.ip, userAgent: req.get('user-agent') });
	if (!result.ok) return res.status(401).json(result);
	req.audit('auth.login.password', { unusualLogin: result.unusualLogin });
	res.json(result);
});

app.post('/auth/login/oauth', (req, res) => {
	const result = auth.loginOAuth({ ...req.body, ip: req.ip, userAgent: req.get('user-agent') });
	if (!result.ok) return res.status(401).json(result);
	req.audit('auth.login.oauth', { unusualLogin: result.unusualLogin });
	res.json(result);
});

app.post('/auth/email/verify', (req, res) => {
	const ok = auth.verifyEmail(req.body.token);
	req.audit('auth.email.verify', { ok });
	res.json({ ok });
});

app.post('/auth/password/reset/request', (req, res) => {
	const token = auth.requestPasswordReset(req.body.email);
	req.audit('auth.password.reset.request', { requestedFor: req.body.email, sent: Boolean(token) });
	res.json({ sent: Boolean(token), token });
});

app.post('/auth/password/reset/confirm', (req, res) => {
	const ok = auth.resetPassword(req.body.token, req.body.newPassword);
	req.audit('auth.password.reset.confirm', { ok });
	res.json({ ok });
});

app.post('/auth/2fa/enable', (req, res) => {
	const uri = auth.configureTOTP(req.body.email);
	req.audit('auth.2fa.enable', { email: req.body.email, ok: Boolean(uri) });
	if (!uri) return res.status(404).json({ error: 'User not found' });
	res.json({ provisioningUri: uri });
});

app.patch('/admin/config/secret', requirePermission(Permissions.SECRETS_WRITE), (req, res) => {
	secretStore.setSecret(req.body.name, req.body.value);
	req.audit('admin.secret.update', { name: req.body.name, provider: secretStore.provider });
	res.json({ ok: true });
});

app.post('/admin/config/secret/rotate-key', requirePermission(Permissions.ADMIN_CONFIG), (req, res) => {
	const keyVersion = secretStore.rotateKey();
	req.audit('admin.secret.key.rotate', { keyVersion });
	res.json({ ok: true, keyVersion });
});

app.get('/workflow', requirePermission(Permissions.WORKFLOW_READ), (_req, res) => {
	res.json({ items: [] });
});

app.use((_req, res) => {
	res.status(404).json({ error: 'Not Found' });
});

app.listen(5678, () => {
	console.log('Security baseline server listening on :5678');
});

function helmetsWithPolicies() {
	return helmet({
		contentSecurityPolicy: {
			directives: {
				defaultSrc: ["'self'"],
				imgSrc: ["'self'", 'data:'],
				connectSrc: ["'self'"],
				frameAncestors: ["'none'"],
			},
		},
		crossOriginEmbedderPolicy: true,
		crossOriginOpenerPolicy: { policy: 'same-origin' },
		crossOriginResourcePolicy: { policy: 'same-site' },
		referrerPolicy: { policy: 'no-referrer' },
		hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
	});
}
