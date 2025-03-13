import { UnauthorizedException } from '@nestjs/common';

/**
 * Handle error 401 unauthorized
 */
export function unauthorizedException(message?: string) {
  throw new UnauthorizedException([message ?? 'Unauthorized']);
}
