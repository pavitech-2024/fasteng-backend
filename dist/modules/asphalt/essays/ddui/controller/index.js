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
var DduiController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DduiController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const init_ddui_dto_1 = require("../dto/init-ddui.dto");
const service_1 = require("../service");
let DduiController = DduiController_1 = class DduiController {
    constructor(dduiService) {
        this.dduiService = dduiService;
        this.logger = new common_1.Logger(DduiController_1.name);
    }
    verifyInitDdui(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('verify init ddui > [body]');
            const status = yield this.dduiService.verifyInitDdui(body);
            return response.status(200).json(status);
        });
    }
    calculateDdui(body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('calculate ddui > [body]');
            const ddui = yield this.dduiService.calculateDdui(body);
            if (ddui.success)
                this.logger.log('calculate ddui > [success]');
            else
                this.logger.error('calculate ddui > [error]');
            return ddui;
        });
    }
    saveEssay(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('save ddui > [body]');
            const ddui = yield this.dduiService.saveEssay(body);
            if (ddui.success)
                this.logger.log('save ddui > [success]');
            else
                this.logger.error('save ddui > [error]');
            return response.status(200).json(ddui);
        });
    }
};
exports.DduiController = DduiController;
__decorate([
    (0, common_1.Post)('verify-init'),
    (0, swagger_1.ApiOperation)({ summary: 'Verifica se é possível criar um ensaio ddui com os dados enviados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'É possível criar um ensaio ddui com os dados enviados.',
        content: { 'application/json': { schema: { example: { success: true } } } },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Não é possível criar um ensaio ddui com os dados enviados.',
        content: {
            'application/json': {
                schema: { example: { success: false, error: { message: 'Material Not Found.', status: 400, name: 'NotFound' } } },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao verificar se é possível criar um ensaio ddui com os dados enviados.' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, init_ddui_dto_1.DduiInitDto]),
    __metadata("design:returntype", Promise)
], DduiController.prototype, "verifyInitDdui", null);
__decorate([
    (0, common_1.Post)('calculate-results'),
    (0, swagger_1.ApiOperation)({ summary: 'Calcula os resultados do ensaio ddui com os dados enviados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Resultados do ensaio ddui calculados com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao calcular os resultados do ensaio ddui com os dados enviados.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DduiController.prototype, "calculateDdui", null);
__decorate([
    (0, common_1.Post)('save-essay'),
    (0, swagger_1.ApiOperation)({ summary: 'Se possível, salva os dados do ensaio ddui no banco de dados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Dados do ensaio ddui salvos com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao salvar os dados do ensaio ddui no banco de dados.' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DduiController.prototype, "saveEssay", null);
exports.DduiController = DduiController = DduiController_1 = __decorate([
    (0, swagger_1.ApiTags)('ddui'),
    (0, common_1.Controller)('asphalt/essays/ddui'),
    __metadata("design:paramtypes", [service_1.DduiService])
], DduiController);
//# sourceMappingURL=index.js.map