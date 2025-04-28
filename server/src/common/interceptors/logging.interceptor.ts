import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';

import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name, {
    timestamp: true,
  });

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const startTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        const resTime = Date.now() - startTime;
        const res = context.switchToHttp().getResponse();

        this.logger.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${resTime}ms`);
      }),
      catchError((err: HttpException) => {
        const resTime = Date.now() - startTime;

        this.logger.error(`${req.method} ${req.originalUrl} ${err.getStatus()} ${resTime}ms`);

        return throwError(() => err);
      })
    );
  }
}
