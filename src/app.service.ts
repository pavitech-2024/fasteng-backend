import { Injectable } from '@nestjs/common';
import axios from 'axios';
@Injectable()
export class AppService {
  healthCheck() {
    return {
      status: 'ok',
      message: `Rodando`,
      timestamp: new Date().toISOString(),
    };
  }
}