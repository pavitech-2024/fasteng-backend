"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const error_handler_1 = require("../../utils/error-handler");
let AllExceptionsFilter = class AllExceptionsFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let errorResponse = {
            statusCode: status,
            message: 'Internal server error',
            name: 'InternalServerError',
        };
        if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse();
            if (typeof exceptionResponse === 'string') {
                errorResponse = {
                    statusCode: status,
                    message: exceptionResponse,
                    name: exception.name,
                };
            }
            else {
                const _a = exceptionResponse, { message, error } = _a, rest = __rest(_a, ["message", "error"]);
                errorResponse = Object.assign({ statusCode: status, message: message || error || 'Erro', name: exception.name }, rest);
            }
        }
        else if (exception instanceof Error) {
            errorResponse = {
                statusCode: status,
                message: exception.message || 'Erro inesperado',
                name: exception.name || 'Error',
            };
        }
        (0, error_handler_1.handleError)(exception, 'GlobalExceptionFilter');
        response.status(status).json({
            success: false,
            error: Object.assign(Object.assign({ status: errorResponse.statusCode, message: errorResponse.message, name: errorResponse.name }, (errorResponse.code && { code: errorResponse.code })), (errorResponse.errorDetails && { errorDetails: errorResponse.errorDetails })),
        });
    }
};
exports.AllExceptionsFilter = AllExceptionsFilter;
exports.AllExceptionsFilter = AllExceptionsFilter = __decorate([
    (0, common_1.Catch)()
], AllExceptionsFilter);
//# sourceMappingURL=http-exception.filter.js.map