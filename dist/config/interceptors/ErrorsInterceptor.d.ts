import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class ErrorsInterceptor implements NestInterceptor {
    private logger;
    intercept(_: ExecutionContext, next: CallHandler): Observable<any>;
}
