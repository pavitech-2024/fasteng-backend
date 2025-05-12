import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
  UnauthorizedException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

/**@classDescription Class responsável por tratar erros de forma segura para o frontend */
@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  private logger = new Logger();

  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error: unknown) => {
        this.logger.error(`interceptor > exception > [error]: ${error instanceof Error ? error.message : JSON.stringify(error)}`);

        if (error instanceof UnauthorizedException) {
          // Exceção de login: transforma Unauthorized (401) em Forbidden (403)
          return throwError(() => new ForbiddenException());
        }

        if (error instanceof HttpException) {
          // Se for uma HttpException customizada (BadRequest, AlreadyExists, etc), relança como está!
          return throwError(() => error);
        }

        // Se for um erro desconhecido, vira 500
        return throwError(() => new InternalServerErrorException());
      }),
    );
  }
}
