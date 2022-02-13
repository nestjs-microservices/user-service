import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Observable, tap } from 'rxjs';
import { LoggerService } from '../../domain/services/logger.service';
import { formatCommand, getCommand } from '../helpers/execution-context.helper';

@Injectable()
export class TransportInterceptor implements NestInterceptor {
  constructor(private readonly loggerService: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        tap(() =>
          this.loggerService.log(
            formatCommand(getCommand(context)),
            'TransportInterceptor',
          ),
        ),
      );
  }
}
