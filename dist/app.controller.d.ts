import { AppService } from 'app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    heathCheck(): Promise<{
        status: string;
        message: string;
        timestamp: string;
    }>;
}
