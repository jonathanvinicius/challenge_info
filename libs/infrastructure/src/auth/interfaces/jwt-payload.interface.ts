export interface IJWTPayload {
  sub: string;
  iss: string;
  client_id: string;
  origin_jti: string;
  event_id: string;
  token_use: string;
  scope: string;
  auth_time: Date;
  exp: Date;
  iat: Date;
  jti: string;
  username: string;
}
