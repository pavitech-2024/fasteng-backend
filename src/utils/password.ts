import { createHash, randomBytes, timingSafeEqual } from 'crypto';

const HASH_PREFIX = 'sha256';

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const hash = createHash('sha256').update(salt + password).digest('hex');
  return `${HASH_PREFIX}$${salt}$${hash}`;
}

export function verifyPassword(password: string, storedPassword: string): boolean {
  if (!storedPassword) return false;

  if (!storedPassword.startsWith(`${HASH_PREFIX}$`)) {
    return false;
  }

  const [, salt, hash] = storedPassword.split('$');
  if (!salt || !hash) return false;

  const computed = createHash('sha256').update(salt + password).digest('hex');
  const computedBuffer = new Uint8Array(Buffer.from(computed, 'hex'));
  const hashBuffer = new Uint8Array(Buffer.from(hash, 'hex'));
  
  return timingSafeEqual(computedBuffer, hashBuffer);
}