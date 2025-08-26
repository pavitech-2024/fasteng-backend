// src/common/filters/http-exception.filter.ts

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { handleError } from 'utils/error-handler';  //Handler Error pra melhorar na captura de errors, tanto logs quanto de http

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorResponse: any = {
      statusCode: status,
      message: 'Internal server error',
      name: 'InternalServerError',
    };

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      // Se a resposta for string, padroniza
      if (typeof exceptionResponse === 'string') {
        errorResponse = {
          statusCode: status,
          message: exceptionResponse,
          name: exception.name,
        };
      } else {
        // Se for objeto, extrai as propriedades
        const { message, error, ...rest } = exceptionResponse as any;

        errorResponse = {
          statusCode: status,
          message: message || error || 'Erro',
          name: exception.name,
          ...rest,
        };
      }
    } else if (exception instanceof Error) {
      // Outros erros que não são HttpException, mas têm message, name, stack etc.
      errorResponse = {
        statusCode: status,
        message: exception.message || 'Erro inesperado',
        name: exception.name || 'Error',
      };
    }

    // Loga o erro com contexto "GlobalExceptionFilter"
    handleError(exception, 'GlobalExceptionFilter');

    // Retorna resposta padronizada
    response.status(status).json({
      success: false,
      error: {
        status: errorResponse.statusCode,
        message: errorResponse.message,
        name: errorResponse.name,
        ...(errorResponse.code && { code: errorResponse.code }),
        ...(errorResponse.errorDetails && { errorDetails: errorResponse.errorDetails }),
      },
    });
  }
}
