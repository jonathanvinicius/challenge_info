/**
 * User data authentication
 *
 * Token data
 */
export interface IJWTPayload {
  iat: number;
  sub: string;
  user_id: string;
}
