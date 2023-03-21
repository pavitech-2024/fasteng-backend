import { sign, verify } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

type tokenData = {
  planName: string;
  email: string;
  name: string;
  userId: string;
  lastLogin: Date;
};
export class Token {
  private config = new ConfigService();
  private logger = new Logger();

  value: string;

  createToken(data: tokenData, expiresIn): string {
    try {
      this.logger.log(`create token with [data], to expires in ${expiresIn}`);

      this.value = sign(data, this.config.get('TOKEN_SECRET'), { expiresIn: expiresIn });

      return this.value;
    } catch (error) {
      this.logger.error(`error on createToken: ${error}`);
      throw error;
    }
  }

  verifyToken(token: string): boolean {
    try {
      this.logger.log(`verify token with [token]`);

      return verify(token, this.config.get('TOKEN_SECRET'));
    } catch (error) {
      this.logger.error(`error on verifyToken: ${error}`);
      throw error;
    }
  }
}

/* 


export class Token {
  value: string;
  private config = new ConfigService();

  constructor(tokenData: tokenData, expiresIn: string) {
    this.value = this.createToken(tokenData, expiresIn);
  }

*/
