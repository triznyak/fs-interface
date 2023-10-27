import * as crypto from 'crypto';

/**
 * Computes the MD5 hash of the provided content.
 * 
 * @param content - The content to hash.
 * @returns The MD5 hash of the content.
 */
export function computeMD5Hash(content: string): string {
    const hash = crypto.createHash('md5');
    hash.update(content);
    return hash.digest('hex');
}
