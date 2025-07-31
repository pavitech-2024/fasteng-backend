import { ReportErrorService } from './report-error.service';
import { ReportErrorDto } from './dto/report-error.dto';
export declare class ReportErrorController {
    private readonly reportErrorService;
    private logger;
    constructor(reportErrorService: ReportErrorService);
    sendEmail(reportErrorDto: ReportErrorDto): Promise<void>;
}
