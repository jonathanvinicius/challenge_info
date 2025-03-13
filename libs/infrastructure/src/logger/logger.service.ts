import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';
import { LogCodeType, LogStatusCodeType, LogType } from './logger.type';
/**
 * Levels ignored
 */
const NestLogLevelContext = [
  'NestFactory',
  'NestApplication',
  'InstanceLoader',
  'RoutesResolver',
  'RouterExplorer',
];
@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends ConsoleLogger {
  private logType: LogType;
  static count: number = 0;

  static builder(logType: LogType) {
    const logger = new LoggerService(logType);
    logger.logType = logType;
    return logger;
  }
  /**
   * Build custom message for logs
   */
  static buildMessage(
    logType: LogCodeType,
    code: LogStatusCodeType,
    message: string,
  ) {
    return `${logType}${code} - ${message}`;
  }
  override log(message: any, ...optionalParams: any[]) {
    if (NestLogLevelContext.includes(optionalParams[0])) {
      return;
    }
    const ctx =
      optionalParams instanceof Array
        ? optionalParams.toString()
        : typeof optionalParams === 'object'
          ? JSON.stringify(optionalParams)
          : optionalParams;
    super.log(`${this.logType}-${message}`, ctx);
  }
  override error(message: any, ...optionalParams: any[]) {
    let ctx = '';
    let m = '';
    if (optionalParams.length > 1) {
      m = optionalParams[0] ?? '';
      ctx = optionalParams[1]; //context
    }
    super.error(`${this.logType}-${message} ${m}`, ctx);
  }
}
