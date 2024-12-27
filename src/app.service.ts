import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async healthCheck() {
    try {
      const result = await axios.get('https://minhaconta.fastengapp.com.br/api/status');
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
}
