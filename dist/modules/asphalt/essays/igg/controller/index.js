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
var IggController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IggController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const services_1 = require("../services");
const init_igg_dto_1 = require("../dto/init-igg.dto");
const calc_igg_dto_1 = require("../dto/calc-igg.dto");
let IggController = IggController_1 = class IggController {
    constructor(iggService) {
        this.iggService = iggService;
        this.logger = new common_1.Logger(IggController_1.name);
    }
    verifyInitIgg(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('verify init igg > [body]');
            const status = yield this.iggService.verifyInitIgg(body);
            return response.status(200).json(status);
        });
    }
    calculateIgg(body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('calculate igg > [body]');
            const igg = yield this.iggService.calculateIgg(body);
            if (igg.success)
                this.logger.log('calculate igg > [success]');
            else
                this.logger.error('calculate igg > [error]');
            return igg;
        });
    }
    saveEssay(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('save igg > [body]');
            const igg = yield this.iggService.saveEssay(body);
            if (igg.success)
                this.logger.log('save igg > [success]');
            else
                this.logger.error('save igg > [error]');
            return response.status(200).json(igg);
        });
    }
};
__decorate([
    (0, common_1.Post)('verify-init'),
    (0, swagger_1.ApiOperation)({ summary: 'Verifica se é possível criar um ensaio igg com os dados enviados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'É possível criar um ensaio igg com os dados enviados.',
        content: { 'application/json': { schema: { example: { success: true } } } },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Erro ao verificar se é possível criar um ensaio igg com os dados enviados.',
    }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, init_igg_dto_1.IggInitDto]),
    __metadata("design:returntype", Promise)
], IggController.prototype, "verifyInitIgg", null);
__decorate([
    (0, common_1.Post)('calculate-results'),
    (0, swagger_1.ApiOperation)({ summary: 'Calcula os resultados do ensaio igg com os dados enviados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Resultados do ensaio igg calculados com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao calcular os resultados do ensaio igg com os dados enviados.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [calc_igg_dto_1.Calc_Igg_Dto]),
    __metadata("design:returntype", Promise)
], IggController.prototype, "calculateIgg", null);
__decorate([
    (0, common_1.Post)('save-essay'),
    (0, swagger_1.ApiOperation)({ summary: 'Se possível, salva os dados do ensaio igg no banco de dados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Dados do ensaio igg salvos com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao salvar os dados do ensaio igg no banco de dados.' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IggController.prototype, "saveEssay", null);
IggController = IggController_1 = __decorate([
    (0, swagger_1.ApiTags)('igg'),
    (0, common_1.Controller)('asphalt/essays/igg'),
    __metadata("design:paramtypes", [services_1.IggService])
], IggController);
exports.IggController = IggController;
//# sourceMappingURL=index.js.map