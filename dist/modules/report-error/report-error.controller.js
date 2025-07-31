"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var ReportErrorController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportErrorController = void 0;
const common_1 = require("@nestjs/common");
const report_error_service_1 = require("./report-error.service");
const report_error_dto_1 = require("./dto/report-error.dto");
const swagger_1 = require("@nestjs/swagger");
let ReportErrorController = ReportErrorController_1 = class ReportErrorController {
    constructor(reportErrorService) {
        this.reportErrorService = reportErrorService;
        this.logger = new common_1.Logger(ReportErrorController_1.name);
    }
    sendEmail(reportErrorDto) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log({}, 'start sendEmail');
            yield this.reportErrorService.sendEmail(reportErrorDto);
        });
    }
};
exports.ReportErrorController = ReportErrorController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'E-mail enviado com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao enviar o e-mail' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_error_dto_1.ReportErrorDto]),
    __metadata("design:returntype", Promise)
], ReportErrorController.prototype, "sendEmail", null);
exports.ReportErrorController = ReportErrorController = ReportErrorController_1 = __decorate([
    (0, common_1.Controller)('report-error'),
    __metadata("design:paramtypes", [report_error_service_1.ReportErrorService])
], ReportErrorController);
//# sourceMappingURL=report-error.controller.js.map