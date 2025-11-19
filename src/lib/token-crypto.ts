import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';

// Get encryption key from environment or generate a temporary one for development
function getEncryptionKey(): Buffer {
  const key = process.env.TOKEN_ENCRYPTION_KEY;
  
  if (!key) {
    console.warn('TOKEN_ENCRYPTION_KEY not set, using temporary key (NOT FOR PRODUCTION)');
    // Generate a temporary key for development only
    return crypto.randomBytes(32);
  }
  
  return Buffer.from(key, 'hex');
}

export function encryptToken(token: string): string {
  const key = getEncryptionKey();
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  let encrypted = cipher.update(token, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag();
  return `${iv.toString('hex')}:${encrypted}:${authTag.toString('hex')}`;
}

export function decryptToken(encryptedData: string): string {
  const key = getEncryptionKey();
  const [ivHex, encryptedHex, authTagHex] = encryptedData.split(':');
  
  if (!ivHex || !encryptedHex || !authTagHex) {
    throw new Error('Invalid encrypted token format');
  }
  
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    key,
    Buffer.from(ivHex, 'hex')
  );
  
  decipher.setAuthTag(Buffer.from(authTagHex, 'hex'));
  
  let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}
