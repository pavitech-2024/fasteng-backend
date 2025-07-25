"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorsInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let ErrorsInterceptor = class ErrorsInterceptor {
    constructor() {
        this.logger = new common_1.Logger();
    }
    intercept(_, next) {
        return next.handle().pipe((0, rxjs_1.catchError)((error) => {
            this.logger.error(`interceptor > exception > [error]: ${error instanceof Error ? error.message : JSON.stringify(error)}`);
            if (error instanceof common_1.UnauthorizedException) {
                return (0, rxjs_1.throwError)(() => new common_1.ForbiddenException());
            }
            if (error instanceof common_1.HttpException) {
                return (0, rxjs_1.throwError)(() => error);
            }
            return (0, rxjs_1.throwError)(() => new common_1.InternalServerErrorException());
        }));
    }
};
exports.ErrorsInterceptor = ErrorsInterceptor;
exports.ErrorsInterceptor = ErrorsInterceptor = __decorate([
    (0, common_1.Injectable)()
], ErrorsInterceptor);
//# sourceMappingURL=ErrorsInterceptor.js.map