import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFound extends HttpException {
  constructor(value: string) {
    super(`${value} not found!`, HttpStatus.BAD_REQUEST);
  }
}
