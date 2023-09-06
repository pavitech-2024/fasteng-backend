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
import { catchError, Observable } from 'rxjs';

/**@classDescription Class responsável por retornar 500 em todos os erros para o front; motivo de segurança */
@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  private logger = new Logger();

  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error: HttpException) => {
        this.logger.error(`interceptor > exception > internal server > [error] > ${error.message}`);

        //Exceção de login
        if (error instanceof UnauthorizedException) throw new ForbiddenException();

        throw new InternalServerErrorException();
      }),
    );
  }
}
