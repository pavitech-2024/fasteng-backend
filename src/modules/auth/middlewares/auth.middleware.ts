import { NestMiddleware, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Response, Request } from 'express';
import { verify } from 'jsonwebtoken';
import { UsersService } from '../../../modules/users/service';

@Injectable() // Para que o NestJS possa injetar o middleware em outros lugares
export class AuthMiddleware implements NestMiddleware {
  private logger = new Logger(AuthMiddleware.name);
  private config = new ConfigService();

  constructor(private readonly usersService: UsersService) {}

  use(req: Request, res: Response, next: NextFunction) {
    // Obtém o token do header da requisiçãoturn res.status(500)
    const token = req.headers.authorization;

    // Se não houver token, retorna erro
    if (!token) {
      // informa erro no log e retorna 500 para cliente
      this.logger.error(`error on auth middleware > [error]: Token not found.`);
      return res.status(500).json({ statusCode: 500, message: 'Internal Server Error' });
    }

    // Obtém o hash do token
    const hash = token.split(' ')[1];

    // Se o token não for composto por duas partes (Bearer e Hash), retorna erro
    if (!(token.split(' ').length === 2)) {
      // informa erro no log e retorna 500 para cliente
      this.logger.error(`error on auth middleware > [error]: Invalid token.`);
      return res.status(500).json({ statusCode: 500, message: 'Internal Server Error' });
    }

    // Verifica o token
    verify(hash, this.config.get('TOKEN_SECRET'), async (error, decoded) => {
      // Se o token for inválido, retorna erro
      if (error) {
        // informa erro no log e retorna 500 para cliente
        this.logger.error(`error on auth middleware > [error]: ${error}`);
        return res.status(500).json({ statusCode: 500, message: 'Internal Server Error' });
      }

      const { lastLoginList } = await this.usersService.getUser(decoded.userId);

      if (
        !lastLoginList.reduce(
          (acc, list_date) =>
            Math.abs(new Date(list_date).getTime() - new Date(decoded.lastLogin).getTime()) === 0 ? (acc = true) : acc,
          false,
        )
      ) {
        // informa erro no log e retorna 500 para cliente
        this.logger.error(`error on auth middleware > [error]: Invalid token.`);
        return res.status(500).json({ statusCode: 500, message: 'Internal Server Error' });
      }

      // Se o token for válido, adiciona o usuário à requisição
      req.user = decoded;

      return next();
    });
  }
}
