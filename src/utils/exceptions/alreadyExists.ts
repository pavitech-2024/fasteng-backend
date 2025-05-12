import { HttpException, HttpStatus } from '@nestjs/common';

// export class AlreadyExists extends HttpException {
//   constructor(value: string) {
//     super(`${value}-already-exists`, HttpStatus.BAD_REQUEST);
//   }
// }

export class AlreadyExists extends HttpException {
  constructor(value: string) {
    super(
      {
        statusCode: HttpStatus.CONFLICT,
        message: `${value} already exists`,
        error: 'Conflict',
      },
      HttpStatus.CONFLICT,
    );
  }
}