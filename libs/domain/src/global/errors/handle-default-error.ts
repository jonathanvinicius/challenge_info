import { ERROR_DEFAULT } from '@app/domain/shared/constants';

/**
 * Handle internal error
 *
 * Filter exception handle status code 500
 */
export function handleDefaultError(result: any, message?: string) {
  if (!result) {
    throw new Error(message ?? ERROR_DEFAULT);
  }
}
/**
 * Handle internal error
 *
 * Filter exception handle status code 500
 */
export function throwDefaultError(message?: string) {
  throw new Error(message ?? ERROR_DEFAULT);
}
