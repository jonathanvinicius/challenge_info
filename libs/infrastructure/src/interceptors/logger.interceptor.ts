import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger = new Logger(LoggingInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    //To handle request/response
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    // const response = ctx.getResponse() as Response;

    this.logger.log(`Request URL ${request.method}: ${request.originalUrl}`);
    if (request.body) {
      this.logger.log(`Body: ${JSON.stringify(request.body)}`);
    }
    this.logger.log(` Headers: ${JSON.stringify(request.headers)}`);

    return next.handle().pipe(
      tap((data: any) => {
        if (data) {
          this.logger.log(`Response: ${JSON.stringify(data)}`);
        }
      }),
    );
  }
}
