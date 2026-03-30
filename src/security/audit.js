import fs from 'node:fs';
import path from 'node:path';

export class AuditLogger {
	constructor(filePath = path.join(process.cwd(), 'audit.log')) {
		this.filePath = filePath;
	}

	log(event) {
		const entry = {
			timestamp: new Date().toISOString(),
			...event,
		};
		fs.appendFileSync(this.filePath, `${JSON.stringify(entry)}\n`, { encoding: 'utf8' });
	}

	middleware() {
		return (req, _res, next) => {
			req.audit = (action, details = {}) => {
				this.log({
					action,
					actorId: req.user?.id ?? 'anonymous',
					method: req.method,
					path: req.path,
					ip: req.ip,
					details,
				});
			};
			next();
		};
	}
}
