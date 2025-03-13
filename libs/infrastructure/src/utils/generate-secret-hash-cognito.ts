import * as crypto from 'crypto';

export function generateSecretHashCognito(
  clientId: string,
  clientSecret: string,
  username: string,
): string {
  return crypto
    .createHmac('sha256', clientSecret)
    .update(username + clientId)
    .digest('base64');
}
