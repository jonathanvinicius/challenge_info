import { HttpStatus } from '@nestjs/common';

/**
 * Módulos/Serviços
 **/
export enum LogEnum {
  /**
   * INFO
   **/
  INFO,
}
/**
 * Módulos/Serviços
 **/
export type LogType = 'INFO';
/**
 * Types
 */
export type LogCodeType = 'S' | 'E' | 'I';
/**
 * Status codes (type)
 */
export type LogStatusCodeType = HttpStatus;
// | HttpStatus.CONTINUE //100
// | HttpStatus.OK //200
// | HttpStatus.AMBIGUOUS //300
// | HttpStatus.BAD_REQUEST //400
// | HttpStatus.INTERNAL_SERVER_ERROR; //500;
