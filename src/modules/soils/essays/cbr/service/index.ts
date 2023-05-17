import { Injectable } from '@nestjs/common';
import { GeneralData_CBR_Service } from './general-data.cbr.service';
import { CbrInitDto } from '../dto/cbr-init.dto';

@Injectable()
export class CbrService {
  constructor(private readonly generalData_Service: GeneralData_CBR_Service) {}

  async verifyInitCbr(body: CbrInitDto) {
    try {
      const success = await this.generalData_Service.verifyInitCbr(body);

      return { success };
    } catch (error) {
      const { status, name, message } = error;
      return { success: false, error: { status, message, name } };
    }
  }
}
