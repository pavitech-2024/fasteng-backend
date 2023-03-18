import { sign } from 'jsonwebtoken';

export const tokenSecret = '590217ff68b0a589e3ecec6b78f9601a';

/**
 * @author Pedro Foltram (FastEng Migration) (2023-03)
 *
 *  @description Classe responsável por gerar o token do usuário
 *
 * @param tokenData                 Objeto com dados do usuário
 *  @param tokenData.planName        Nome do plano do usuário
 *  @param tokenData.email           Email do usuário
 *  @param tokenData.name            Nome do usuário
 *  @param tokenData.userId          Id do usuário
 *  @param tokenData.lastLogin       Data do último login do usuário
 *
 * @returns {Token}                 Objeto com o token gerado
 *  @returns {Token.value}          Token gerado com os dados do usuário
 *
 */

type tokenData = {
  planName: string;
  email: string;
  name: string;
  userId: string;
  lastLogin: Date;
};

export class Token {
  value: string;

  constructor(tokenData: tokenData, expiresIn: string) {
    this.value = this.createToken(tokenData, expiresIn);
  }

  private createToken(tokenData: tokenData, expiresIn: string): string {
    return sign(
      {
        planName: tokenData.planName,
        email: tokenData.email,
        name: tokenData.name,
        userId: tokenData.userId,
        lastLogin: tokenData.lastLogin,
      },
      tokenSecret,
      {
        expiresIn,
      },
    );
  }
}
