// Importamos o logger do NestJS para poder registrar mensagens de erro no console
import { Logger } from '@nestjs/common';

// Criamos um "logger" com um nome específico, para sabermos de onde vêm as mensagens
const logger = new Logger('ErrorHandler');

/*
  Aqui embaixo definimos duas "sobrecargas" (overloads) da função handleError.
  Isso é útil para o TypeScript entender os diferentes jeitos que podemos chamar essa função.
  
  ➤ Primeiro caso: se passarmos returnOnlyBoolean como true, a função vai retornar apenas "false".
  ➤ Segundo caso: se não passarmos returnOnlyBoolean (ou for false), ela retorna um objeto com os detalhes do erro.
*/

// Sobrecarga 1: se for usado returnOnlyBoolean: true, a função retorna apenas "false"
export function handleError(error: any, context: string, returnOnlyBoolean: true): false;

// Sobrecarga 2: se returnOnlyBoolean for falso ou não for passado, retorna um objeto com mais informações
export function handleError(error: any, context?: string, returnOnlyBoolean?: false): {
  success: false;
  error: {
    status: any;
    message: any;
    name: any;
    code?: any;
    errorDetails?: any;
  };
};

// Aqui está a função de verdade, com a implementação
export function handleError(
  error: any,
  context = 'Unknown',               // Se não informarem o contexto, usamos "Unknown" como padrão
  returnOnlyBoolean = false          // Se não informarem se querem só booleano, assumimos que não, então é flag
): false | {
  success: false;
  error: {
    status: any;
    message: any;
    name: any;
    code?: any;
    errorDetails?: any;
  };
} {
  // Pegamos a mensagem do erro, se tiver. Se não tiver, usamos "Erro inesperado".
  const message = error?.message || 'Erro inesperado';

  // Pegamos o nome do erro. Se não tiver, usamos "Error".
  const name = error?.name || 'Error';

  // Pegamos o status do erro. Se não tiver, colocamos 500 (erro genérico do servidor).
  const status = error?.status || 500;

  // Aqui registramos o erro no log. Vai mostrar o contexto, nome, mensagem e a stack (onde ocorreu).
  logger.error(`[${context}] ${name}: ${message}`, error?.stack);

  // Se a função foi chamada com returnOnlyBoolean = true, só retornamos "false"
  if (returnOnlyBoolean) {
    return false;
  }

  // Senão, montamos um objeto com as informações detalhadas do erro
  return {
    success: false,
    error: {
      status,        // Código de status (ex: 400, 404, 500...)
      message,       // Mensagem explicando o erro
      name,          // Nome do erro (ex: ValidationError)
      ...(error?.code && { code: error.code }), // Se o erro tiver um "code", adicionamos
      ...(error?.details && { errorDetails: error.details }), // Se tiver detalhes extras, adicionamos
    },
  };
}
