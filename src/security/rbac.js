export const Roles = Object.freeze({
	OWNER: 'owner',
	ADMIN: 'admin',
	MEMBER: 'member',
	VIEWER: 'viewer',
});

export const Permissions = Object.freeze({
	WORKFLOW_READ: 'workflow:read',
	WORKFLOW_WRITE: 'workflow:write',
	WORKFLOW_EXECUTE: 'workflow:execute',
	SECRETS_READ: 'secrets:read',
	SECRETS_WRITE: 'secrets:write',
	BILLING_READ: 'billing:read',
	BILLING_WRITE: 'billing:write',
	ADMIN_CONFIG: 'admin:config',
	ADMIN_USERS: 'admin:users',
});

const rolePermissions = {
	[Roles.OWNER]: new Set(Object.values(Permissions)),
	[Roles.ADMIN]: new Set([
		Permissions.WORKFLOW_READ,
		Permissions.WORKFLOW_WRITE,
		Permissions.WORKFLOW_EXECUTE,
		Permissions.SECRETS_READ,
		Permissions.SECRETS_WRITE,
		Permissions.BILLING_READ,
		Permissions.ADMIN_CONFIG,
		Permissions.ADMIN_USERS,
	]),
	[Roles.MEMBER]: new Set([
		Permissions.WORKFLOW_READ,
		Permissions.WORKFLOW_WRITE,
		Permissions.WORKFLOW_EXECUTE,
		Permissions.SECRETS_READ,
	]),
	[Roles.VIEWER]: new Set([Permissions.WORKFLOW_READ, Permissions.BILLING_READ]),
};

export function hasPermission(role, permission, overrides = new Set()) {
	if (!rolePermissions[role]) return false;
	return rolePermissions[role].has(permission) || overrides.has(permission);
}

export function requirePermission(permission) {
	return (req, res, next) => {
		const role = req.user?.role;
		const overrides = new Set(req.user?.permissionOverrides ?? []);
		if (!role || !hasPermission(role, permission, overrides)) {
			return res.status(403).json({ error: 'Forbidden' });
		}
		next();
	};
}
