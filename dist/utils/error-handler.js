"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = handleError;
const common_1 = require("@nestjs/common");
const logger = new common_1.Logger('ErrorHandler');
function handleError(error, context = 'Unknown') {
    const message = (error === null || error === void 0 ? void 0 : error.message) || 'Erro inesperado';
    const name = (error === null || error === void 0 ? void 0 : error.name) || 'Error';
    logger.error(`[${context}] ${name}: ${message}`, error === null || error === void 0 ? void 0 : error.stack);
    return {
        success: false,
        message: `[${context}] ${message}`,
        details: Object.assign(Object.assign({ name }, ((error === null || error === void 0 ? void 0 : error.code) && { code: error.code })), ((error === null || error === void 0 ? void 0 : error.details) && { errorDetails: error.details })),
        stack: process.env.NODE_ENV === 'development' ? error === null || error === void 0 ? void 0 : error.stack : undefined,
    };
}
//# sourceMappingURL=error-handler.js.map