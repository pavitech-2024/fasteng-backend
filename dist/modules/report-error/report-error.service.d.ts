import { ReportErrorDto } from './dto/report-error.dto';
export declare class ReportErrorService {
    private readonly logger;
    sendEmail(reportErrorDto: ReportErrorDto): Promise<void>;
}
