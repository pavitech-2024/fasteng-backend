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
var ConcreteGranulometryController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcreteGranulometryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const service_1 = require("../service");
const concretegranulometry_init_dto_1 = require("../dto/concretegranulometry-init.dto");
const calc_granulometry_dto_1 = require("../dto/calc.granulometry.dto");
let ConcreteGranulometryController = ConcreteGranulometryController_1 = class ConcreteGranulometryController {
    constructor(concretegranulometryService) {
        this.concretegranulometryService = concretegranulometryService;
        this.logger = new common_1.Logger(ConcreteGranulometryController_1.name);
    }
    verifyInitConcreteGranulometry(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('verify init concrete granulometry > [body]');
            const status = yield this.concretegranulometryService.verifyInitGranulometry(body);
            return response.status(200).json(status);
        });
    }
    calculateConcreteGranulometry(body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('calculate concrete granulometry > [body]');
            const granulometry = yield this.concretegranulometryService.calculateGranulometry(body);
            if (granulometry.success)
                this.logger.log('calculate concrete granulometry > [success]');
            else
                this.logger.error('calculate concrete granulometry > [error]');
            return granulometry;
        });
    }
    saveConcreteEssay(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('save concrete essay > [body]');
            const granulometry = yield this.concretegranulometryService.saveEssay(body);
            if (granulometry.success)
                this.logger.log('save concrete granulometry essay > [success]');
            else
                this.logger.error('save concrete granulometry essay > [error]');
            return response.status(200).json(granulometry);
        });
    }
};
__decorate([
    (0, common_1.Post)('verify-init'),
    (0, swagger_1.ApiOperation)({ summary: 'Verifica se é possível criar uma granulometria de ensaio de concreto com os dados enviados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'É possível criar uma granulometria de ensaio de concreto com os dados enviados.',
        content: { 'application/json': { schema: { example: { success: true } } } },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Não é possível criar uma granulometria de ensaio de concreto com os dados enviados.',
        content: {
            'application/json': {
                schema: { example: { success: false, error: { message: 'Sample Not Found.', status: 400, name: 'NotFound' } } },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao verificar se é possível criar uma granulometria de ensaio de concreto com os dados enviados.' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, concretegranulometry_init_dto_1.ConcreteGranulometryInitDto]),
    __metadata("design:returntype", Promise)
], ConcreteGranulometryController.prototype, "verifyInitConcreteGranulometry", null);
__decorate([
    (0, common_1.Post)('calculate-results'),
    (0, swagger_1.ApiOperation)({ summary: 'Calcula os resultados da granulometria de ensaio de concreto com os dados enviados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Resultados da granulometria de ensaio de concreto calculados com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao calcular os resultados da granulometria de ensaio de concreto com os dados enviados.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [calc_granulometry_dto_1.Calc_CONCRETEGRANULOMETRY_Dto]),
    __metadata("design:returntype", Promise)
], ConcreteGranulometryController.prototype, "calculateConcreteGranulometry", null);
__decorate([
    (0, common_1.Post)('save-essay'),
    (0, swagger_1.ApiOperation)({ summary: 'Se possível, salva os dados da granulometria de ensaio de concreto no banco de dados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Dados da granulometria de ensaio de concreto salvos com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Não foi possível salvar os dados da granulometria de ensaio de concreto no banco de dados.',
        content: {
            'application/json': {
                schema: {
                    example: {
                        success: false,
                        error: { message: 'Granulometry with name "Granulometry 1" from user "User 1"', status: 400, name: 'AlreadyExists' },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao salvar os dados da granulometria de ensaio de concreto no banco de dados.' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ConcreteGranulometryController.prototype, "saveConcreteEssay", null);
ConcreteGranulometryController = ConcreteGranulometryController_1 = __decorate([
    (0, swagger_1.ApiTags)('concrete-granulometry'),
    (0, common_1.Controller)('concrete/essays/granulometry'),
    __metadata("design:paramtypes", [service_1.ConcreteGranulometryService])
], ConcreteGranulometryController);
exports.ConcreteGranulometryController = ConcreteGranulometryController;
//# sourceMappingURL=index.js.map