"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = handleError;
const common_1 = require("@nestjs/common");
const logger = new common_1.Logger('ErrorHandler');
function handleError(error, context = 'Unknown', returnOnlyBoolean = false) {
    const message = (error === null || error === void 0 ? void 0 : error.message) || 'Erro inesperado';
    const name = (error === null || error === void 0 ? void 0 : error.name) || 'Error';
    const status = (error === null || error === void 0 ? void 0 : error.status) || 500;
    logger.error(`[${context}] ${name}: ${message}`, error === null || error === void 0 ? void 0 : error.stack);
    if (returnOnlyBoolean) {
        return false;
    }
    return {
        success: false,
        error: Object.assign(Object.assign({ status,
            message,
            name }, ((error === null || error === void 0 ? void 0 : error.code) && { code: error.code })), ((error === null || error === void 0 ? void 0 : error.details) && { errorDetails: error.details })),
    };
}
//# sourceMappingURL=error-handler.js.map