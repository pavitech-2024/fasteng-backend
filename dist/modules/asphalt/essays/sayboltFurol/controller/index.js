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
var SayboltFurolController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SayboltFurolController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const calc_sayboltFurol_dto_1 = require("../dto/calc-sayboltFurol.dto");
const init_sayboltFurol_dto_1 = require("../dto/init-sayboltFurol.dto");
const service_1 = require("../service");
let SayboltFurolController = SayboltFurolController_1 = class SayboltFurolController {
    constructor(sayboltFurolService) {
        this.sayboltFurolService = sayboltFurolService;
        this.logger = new common_1.Logger(SayboltFurolController_1.name);
    }
    verifyInitSayboltFurol(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('verify init sayboltFurol > [body]');
            const status = yield this.sayboltFurolService.verifyInitSayboltFurol(body);
            return response.status(200).json(status);
        });
    }
    calculateSayboltFurol(body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('calculate sayboltFurol > [body]');
            const sayboltFurol = yield this.sayboltFurolService.calculateSayboltFurol(body);
            if (sayboltFurol.success)
                this.logger.log('calculate sayboltFurol > [success]');
            else
                this.logger.error('calculate sayboltFurol > [error]');
            return sayboltFurol;
        });
    }
    saveEssay(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('save sayboltFurol > [body]');
            const sayboltFurol = yield this.sayboltFurolService.saveEssay(body);
            if (sayboltFurol.success)
                this.logger.log('save sayboltFurol > [success]');
            else
                this.logger.error('save sayboltFurol > [error]');
            return response.status(200).json(sayboltFurol);
        });
    }
};
__decorate([
    (0, common_1.Post)('verify-init'),
    (0, swagger_1.ApiOperation)({ summary: 'Verifica se é possível criar um ensaio de viscosidade Saybolt-Furol com os dados enviados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'É possível criar um ensaio de viscosidadeSaybolt-Furol com os dados enviados.',
        content: { 'application/json': { schema: { example: { success: true } } } },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Não é possível criar um ensaio de viscosidade Saybolt-Furol com os dados enviados.',
        content: {
            'application/json': {
                schema: { example: { success: false, error: { message: 'Material Not Found.', status: 400, name: 'NotFound' } } },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao verificar se é possível criar um ensaio de viscosidade Saybolt-Furol com os dados enviados.' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, init_sayboltFurol_dto_1.SayboltFurolInitDto]),
    __metadata("design:returntype", Promise)
], SayboltFurolController.prototype, "verifyInitSayboltFurol", null);
__decorate([
    (0, common_1.Post)('calculate-results'),
    (0, swagger_1.ApiOperation)({ summary: 'Calcula os resultados do ensaio de viscosidadeSaybolt-Furol com os dados enviados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Resultados d ensaio de viscosidadeSaybolt-Furol calculados com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao calcular os resultados do ensaio de viscosidadeSaybolt-Furol com os dados enviados.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [calc_sayboltFurol_dto_1.Calc_SayboltFurol_Dto]),
    __metadata("design:returntype", Promise)
], SayboltFurolController.prototype, "calculateSayboltFurol", null);
__decorate([
    (0, common_1.Post)('save-essay'),
    (0, swagger_1.ApiOperation)({ summary: 'Se possível, salva os dados do ensaio de viscosidade Saybolt-Furol no banco de dados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Dados do ensaio de viscosidadeSaybolt-Furol salvos com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao salvar os dados do ensaio de viscosidade Saybolt-Furol no banco de dados.' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SayboltFurolController.prototype, "saveEssay", null);
SayboltFurolController = SayboltFurolController_1 = __decorate([
    (0, swagger_1.ApiTags)('sayboltFurol'),
    (0, common_1.Controller)('asphalt/essays/sayboltFurol'),
    __metadata("design:paramtypes", [service_1.SayboltFurolService])
], SayboltFurolController);
exports.SayboltFurolController = SayboltFurolController;
//# sourceMappingURL=index.js.map