import { BadRequestException } from '@nestjs/common';

/**
 * Handle error 400 invalid request
 */
export function handleBadRequest(result: any, message?: string) {
  if (!result) {
    throw new BadRequestException([message ?? 'Bad Request']);
  }
}

/**
 * Handle error 400 invalid request
 */
export function throwBadRequest(message?: string) {
  throw new BadRequestException([message ?? 'Bad Request']);
}
