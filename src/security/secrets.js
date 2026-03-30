import crypto from 'node:crypto';

export class SecretStore {
	constructor({ provider = 'kms', masterKey }) {
		this.provider = provider;
		this.masterKey = masterKey ?? crypto.randomBytes(32);
		this.keyVersion = 1;
		this.storage = new Map();
	}

	encrypt(plaintext) {
		const iv = crypto.randomBytes(12);
		const cipher = crypto.createCipheriv('aes-256-gcm', this.masterKey, iv);
		const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
		const tag = cipher.getAuthTag();
		return {
			provider: this.provider,
			keyVersion: this.keyVersion,
			iv: iv.toString('hex'),
			tag: tag.toString('hex'),
			value: encrypted.toString('hex'),
		};
	}

	decrypt(payload) {
		if (payload.keyVersion !== this.keyVersion) {
			throw new Error('Secret key version mismatch - rotate/re-encrypt required');
		}
		const decipher = crypto.createDecipheriv(
			'aes-256-gcm',
			this.masterKey,
			Buffer.from(payload.iv, 'hex'),
		);
		decipher.setAuthTag(Buffer.from(payload.tag, 'hex'));
		return Buffer.concat([
			decipher.update(Buffer.from(payload.value, 'hex')),
			decipher.final(),
		]).toString('utf8');
	}

	setSecret(name, value) {
		this.storage.set(name, this.encrypt(value));
	}

	getSecret(name) {
		const payload = this.storage.get(name);
		if (!payload) return null;
		return this.decrypt(payload);
	}

	rotateKey(nextKey = crypto.randomBytes(32)) {
		const current = [...this.storage.entries()].map(([name, payload]) => [name, this.decrypt(payload)]);
		this.masterKey = nextKey;
		this.keyVersion += 1;
		for (const [name, plaintext] of current) {
			this.storage.set(name, this.encrypt(plaintext));
		}
		return this.keyVersion;
	}
}
