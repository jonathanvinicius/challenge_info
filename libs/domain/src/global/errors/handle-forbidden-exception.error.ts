import { ForbiddenException } from '@nestjs/common';

/**
 * Handle error 403 business rule
 */
export function forbiddenException(message?: string) {
  throw new ForbiddenException([message ?? 'Forbidden']);
}
