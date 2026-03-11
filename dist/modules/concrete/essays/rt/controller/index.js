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
var ConcreteRtController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcreteRtController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("@nestjs/swagger/dist/decorators");
const concretert_init_dto_1 = require("../dto/concretert-init.dto");
const service_1 = require("../service");
const calc_rt_dto_1 = require("../dto/calc.rt.dto");
let ConcreteRtController = ConcreteRtController_1 = class ConcreteRtController {
    constructor(concreteRtService) {
        this.concreteRtService = concreteRtService;
        this.logger = new common_1.Logger(ConcreteRtController_1.name);
    }
    verifyInitConcreteRt(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('verify init concrete rt > [body]');
            const status = yield this.concreteRtService.verifyInitRt(body);
            return response.status(200).json(status);
        });
    }
    calculateConcreteRt(body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('calculate concrete rt > [body]');
            const rt = yield this.concreteRtService.calculateRt(body);
            if (rt.success)
                this.logger.log('calculate concrete rt > [success]');
            else
                this.logger.error('calculate concrete rt > [error]');
            return rt;
        });
    }
    saveConcreteEssay(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('save concrete essay > [body]');
            const rt = yield this.concreteRtService.saveEssay(body);
            if (rt.success)
                this.logger.log('save concrete rt essay > [success]');
            else
                this.logger.error('save concrete rt essay > [error]');
            return response.status(200).json(rt);
        });
    }
};
exports.ConcreteRtController = ConcreteRtController;
__decorate([
    (0, common_1.Post)('verify-init'),
    (0, decorators_1.ApiOperation)({ summary: 'Verifica se é possível criar umensaio de compressão de corpos de prova cilíndricos de concreto com os dados enviados.' }),
    (0, decorators_1.ApiResponse)({
        status: 200,
        description: 'É possível criar umensaio de compressão de corpos de prova cilíndricos de concreto com os dados enviados.',
        content: { 'application/json': { schema: { example: { success: true } } } },
    }),
    (0, decorators_1.ApiResponse)({
        status: 200,
        description: 'Não é possível criar umensaio de compressão de corpos de prova cilíndricos de concreto com os dados enviados.',
        content: {
            'application/json': {
                schema: { example: { success: false, error: { message: 'Sample Not Found.', status: 400, name: 'NotFound' } } },
            },
        },
    }),
    (0, decorators_1.ApiResponse)({
        status: 400,
        description: 'Erro ao verificar se é possível criar umensaio de compressão de corpos de prova cilíndricos de concreto com os dados enviados.',
    }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, concretert_init_dto_1.ConcreteRtInitDto]),
    __metadata("design:returntype", Promise)
], ConcreteRtController.prototype, "verifyInitConcreteRt", null);
__decorate([
    (0, common_1.Post)('calculate-results'),
    (0, decorators_1.ApiOperation)({ summary: 'Calcula os resultados da resistência à tração de concreto com os dados enviados.' }),
    (0, decorators_1.ApiResponse)({
        status: 200,
        description: 'Resultados da resistência à tração de concreto calculados com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    }),
    (0, decorators_1.ApiResponse)({
        status: 400,
        description: 'Erro ao calcular os resultados da resistência à tração de concreto com os dados enviados.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [calc_rt_dto_1.Calc_Concrete_RT_Dto]),
    __metadata("design:returntype", Promise)
], ConcreteRtController.prototype, "calculateConcreteRt", null);
__decorate([
    (0, common_1.Post)('save-essay'),
    (0, decorators_1.ApiOperation)({ summary: 'Se possível, salva os dados da resistência à tração de concreto no banco de dados.' }),
    (0, decorators_1.ApiResponse)({
        status: 200,
        description: 'Dados da resistência à tração de concreto salvos com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    }),
    (0, decorators_1.ApiResponse)({
        status: 200,
        description: 'Não foi possível salvar os dados da resistência à tração de concreto no banco de dados.',
        content: {
            'application/json': {
                schema: {
                    example: {
                        success: false,
                        error: { message: 'Rt with name "Rt 1" from user "User 1"', status: 400, name: 'AlreadyExists' },
                    },
                },
            },
        },
    }),
    (0, decorators_1.ApiResponse)({
        status: 400,
        description: 'Erro ao salvar os dados da resistência à tração de concreto no banco de dados.',
    }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ConcreteRtController.prototype, "saveConcreteEssay", null);
exports.ConcreteRtController = ConcreteRtController = ConcreteRtController_1 = __decorate([
    (0, decorators_1.ApiTags)('concreteRt'),
    (0, common_1.Controller)('concrete/essays/concreteRt'),
    __metadata("design:paramtypes", [service_1.ConcreteRtService])
], ConcreteRtController);
//# sourceMappingURL=index.js.map