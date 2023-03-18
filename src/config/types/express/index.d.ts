// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as express from 'express';

/**@author Pedro Foltram (FastEng Migration) (2023-03) */

declare global {
  namespace Express {
    interface Request {
      user?: Record<string, any>;
    }
  }
}
