"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.verifyPassword = verifyPassword;
const crypto_1 = require("crypto");
const HASH_PREFIX = 'sha256';
function hashPassword(password) {
    const salt = (0, crypto_1.randomBytes)(16).toString('hex');
    const hash = (0, crypto_1.createHash)('sha256').update(salt + password).digest('hex');
    return `${HASH_PREFIX}$${salt}$${hash}`;
}
function verifyPassword(password, storedPassword) {
    if (!storedPassword)
        return false;
    if (!storedPassword.startsWith(`${HASH_PREFIX}$`)) {
        return false;
    }
    const [, salt, hash] = storedPassword.split('$');
    if (!salt || !hash)
        return false;
    const computed = (0, crypto_1.createHash)('sha256').update(salt + password).digest('hex');
    const computedBuffer = new Uint8Array(Buffer.from(computed, 'hex'));
    const hashBuffer = new Uint8Array(Buffer.from(hash, 'hex'));
    return (0, crypto_1.timingSafeEqual)(computedBuffer, hashBuffer);
}
//# sourceMappingURL=password.js.map