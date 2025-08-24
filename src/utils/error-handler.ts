import { Logger } from '@nestjs/common';
const logger = new Logger('ErrorHandler');
import { ErrorResponse } from './interfaces/errorHandler.interface';



export function handleError(error: any, context: string = 'Unknown'): ErrorResponse {
  const message = error?.message || 'Erro inesperado';
  const name = error?.name || 'Error';

  logger.error(`[${context}] ${name}: ${message}`, error?.stack);

  return {
    success: false,
    message: `[${context}] ${message}`,
    details: {
      name,
      ...(error?.code && { code: error.code }), // inclui se tiver
      ...(error?.details && { errorDetails: error.details }), // inclui detalhes extras
    },
    stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined,
  };
}
