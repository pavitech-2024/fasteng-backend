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
var FwdController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FwdController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const services_1 = require("../services");
const init_fwd_dto_1 = require("../dto/init-fwd.dto");
const calc_fwd_dto_1 = require("../dto/calc-fwd.dto");
let FwdController = FwdController_1 = class FwdController {
    constructor(fwdService) {
        this.fwdService = fwdService;
        this.logger = new common_1.Logger(FwdController_1.name);
    }
    verifyInitFwd(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('verify init fwd > [body]');
            const status = yield this.fwdService.verifyInitFwd(body);
            return response.status(200).json(status);
        });
    }
    calculateFwd(body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('calculate fwd > [body]');
            const fwd = yield this.fwdService.calculateFwd(body);
            if (fwd.success)
                this.logger.log('calculate fwd > [success]');
            else
                this.logger.error('calculate fwd > [error]');
            return fwd;
        });
    }
    saveEssay(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('save fwd > [body]');
            const fwd = yield this.fwdService.saveEssay(body);
            if (fwd.success)
                this.logger.log('save fwd > [success]');
            else
                this.logger.error('save fwd > [error]');
            return response.status(200).json(fwd);
        });
    }
    deleteEssay(response, id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('delete fwd > [body]');
            const fwd = yield this.fwdService.deleteEssay(id);
            if (fwd.success)
                this.logger.log('delete fwd > [success]');
            else
                this.logger.error('delete fwd > [error]');
            return response.status(200).json(fwd);
        });
    }
};
exports.FwdController = FwdController;
__decorate([
    (0, common_1.Post)('verify-init'),
    (0, swagger_1.ApiOperation)({ summary: 'Verifica se é possível criar um ensaio fwd com os dados enviados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'É possível criar um ensaio fwd com os dados enviados.',
        content: { 'application/json': { schema: { example: { success: true } } } },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Erro ao verificar se é possível criar um ensaio fwd com os dados enviados.',
    }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, init_fwd_dto_1.FwdInitDto]),
    __metadata("design:returntype", Promise)
], FwdController.prototype, "verifyInitFwd", null);
__decorate([
    (0, common_1.Post)('calculate-results'),
    (0, swagger_1.ApiOperation)({ summary: 'Calcula os resultados do ensaio fwd com os dados enviados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Resultados do ensaio fwd calculados com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao calcular os resultados do ensaio fwd com os dados enviados.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [calc_fwd_dto_1.Calc_Fwd_Dto]),
    __metadata("design:returntype", Promise)
], FwdController.prototype, "calculateFwd", null);
__decorate([
    (0, common_1.Post)('save-essay'),
    (0, swagger_1.ApiOperation)({ summary: 'Se possível, salva os dados do ensaio fwd no banco de dados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Dados do ensaio fwd salvos com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao salvar os dados do ensaio fwd no banco de dados.' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FwdController.prototype, "saveEssay", null);
__decorate([
    (0, common_1.Delete)('delete-essay/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Se possível, deleta os dados do ensaio fwd no banco de dados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Ensaio de fwd deletado com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao deletar o ensaio fwd no banco de dados.' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FwdController.prototype, "deleteEssay", null);
exports.FwdController = FwdController = FwdController_1 = __decorate([
    (0, swagger_1.ApiTags)('fwd'),
    (0, common_1.Controller)('asphalt/essays/fwd'),
    __metadata("design:paramtypes", [services_1.FwdService])
], FwdController);
//# sourceMappingURL=index.js.map