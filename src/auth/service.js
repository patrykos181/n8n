import crypto from 'node:crypto';
import { authenticator } from 'otplib';

export class AuthService {
	constructor() {
		this.users = new Map();
		this.sessions = new Map();
		this.resetTokens = new Map();
		this.emailVerifyTokens = new Map();
	}

	hashPassword(password) {
		return crypto.pbkdf2Sync(password, 'static-salt-change-me', 210000, 64, 'sha512').toString('hex');
	}

	register({ email, password, oauthProvider = null }) {
		const id = crypto.randomUUID();
		const user = {
			id,
			email,
			passwordHash: password ? this.hashPassword(password) : null,
			oauthProvider,
			emailVerified: false,
			role: 'viewer',
			totpSecret: null,
			knownIps: new Set(),
			permissionOverrides: [],
		};
		this.users.set(email, user);
		const verifyToken = crypto.randomBytes(24).toString('hex');
		this.emailVerifyTokens.set(verifyToken, email);
		return { user, verifyToken };
	}

	verifyEmail(token) {
		const email = this.emailVerifyTokens.get(token);
		if (!email) return false;
		const user = this.users.get(email);
		if (!user) return false;
		user.emailVerified = true;
		this.emailVerifyTokens.delete(token);
		return true;
	}

	requestPasswordReset(email) {
		if (!this.users.has(email)) return null;
		const token = crypto.randomBytes(24).toString('hex');
		this.resetTokens.set(token, email);
		return token;
	}

	resetPassword(token, newPassword) {
		const email = this.resetTokens.get(token);
		if (!email) return false;
		const user = this.users.get(email);
		if (!user) return false;
		user.passwordHash = this.hashPassword(newPassword);
		this.resetTokens.delete(token);
		return true;
	}

	configureTOTP(email) {
		const user = this.users.get(email);
		if (!user) return null;
		user.totpSecret = authenticator.generateSecret();
		return authenticator.keyuri(email, 'n8n-security-baseline', user.totpSecret);
	}

	loginPassword({ email, password, ip, userAgent, totpToken }) {
		const user = this.users.get(email);
		if (!user || user.passwordHash !== this.hashPassword(password)) return { ok: false };
		if (user.totpSecret && !authenticator.verify({ token: totpToken, secret: user.totpSecret })) {
			return { ok: false, reason: 'invalid_2fa' };
		}
		return this.createSession(user, { ip, userAgent, provider: 'password' });
	}

	loginOAuth({ email, provider, ip, userAgent, totpToken }) {
		const user = this.users.get(email);
		if (!user || user.oauthProvider !== provider) return { ok: false };
		if (user.totpSecret && !authenticator.verify({ token: totpToken, secret: user.totpSecret })) {
			return { ok: false, reason: 'invalid_2fa' };
		}
		return this.createSession(user, { ip, userAgent, provider: 'oauth' });
	}

	createSession(user, { ip, userAgent, provider }) {
		const sessionId = crypto.randomUUID();
		const unusualLogin = !user.knownIps.has(ip);
		user.knownIps.add(ip);
		this.sessions.set(sessionId, {
			id: sessionId,
			userId: user.id,
			email: user.email,
			role: user.role,
			createdAt: new Date().toISOString(),
			ip,
			userAgent,
			provider,
			unusualLogin,
			permissionOverrides: user.permissionOverrides,
		});
		return { ok: true, sessionId, unusualLogin };
	}

	getSession(sessionId) {
		return this.sessions.get(sessionId) ?? null;
	}
}
