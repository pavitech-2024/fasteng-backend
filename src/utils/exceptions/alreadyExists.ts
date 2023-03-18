import { HttpException, HttpStatus } from '@nestjs/common';

export class AlreadyExists extends HttpException {
  constructor(value: string) {
    super(`${value} already exists!`, HttpStatus.BAD_REQUEST);
  }
}
