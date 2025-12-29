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
var GranulometryController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GranulometryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const service_1 = require("../service");
const granulometry_init_dto_1 = require("../dto/granulometry-init.dto");
const calc_granulometry_dto_1 = require("../dto/calc.granulometry.dto");
let GranulometryController = GranulometryController_1 = class GranulometryController {
    constructor(granulometryService) {
        this.granulometryService = granulometryService;
        this.logger = new common_1.Logger(GranulometryController_1.name);
    }
    verifyInitGranulometry(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('verify init granulometry > [body]');
            const status = yield this.granulometryService.verifyInitGranulometry(body);
            return response.status(200).json(status);
        });
    }
    calculateGranulometry(body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('calculate granulometry > [body]');
            const granulometry = yield this.granulometryService.calculateGranulometry(body);
            if (granulometry.success)
                this.logger.log('calculate granulometry > [success]');
            else
                this.logger.error('calculate granulometry > [error]');
            return granulometry;
        });
    }
    saveEssay(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('save essay > [body]');
            const granulometry = yield this.granulometryService.saveEssay(body);
            if (granulometry.success)
                this.logger.log('save granulometry essay > [success]');
            else
                this.logger.error('save granulometry essay > [error]');
            return response.status(200).json(granulometry);
        });
    }
    getGranulometryBySampleId(response, sample_id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`get granulometry by sample id > [sample_id]: ${sample_id}`);
            const granulometry = yield this.granulometryService.getGranulometryBySampleId(sample_id);
            return response.status(200).json(granulometry);
        });
    }
};
__decorate([
    (0, common_1.Post)('verify-init'),
    (0, swagger_1.ApiOperation)({ summary: 'Verifica se é possível criar uma GRANULOMETRY com os dados enviados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'É possível criar uma GRANULOMETRY com os dados enviados.',
        content: { 'application/json': { schema: { example: { success: true } } } },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Não é possível criar uma GRANULOMETRY com os dados enviados.',
        content: {
            'application/json': {
                schema: { example: { success: false, error: { message: 'Sample Not Found.', status: 400, name: 'NotFound' } } },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao verificar se é possível criar uma GRANULOMETRY com os dados enviados.' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, granulometry_init_dto_1.GranulometryInitDto]),
    __metadata("design:returntype", Promise)
], GranulometryController.prototype, "verifyInitGranulometry", null);
__decorate([
    (0, common_1.Post)('calculate-results'),
    (0, swagger_1.ApiOperation)({ summary: 'Calcula os resultados da GRANULOMETRY com os dados enviados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Resultados da GRANULOMETRY calculados com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao calcular os resultados da GRANULOMETRY com os dados enviados.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [calc_granulometry_dto_1.Calc_GRANULOMETRY_Dto]),
    __metadata("design:returntype", Promise)
], GranulometryController.prototype, "calculateGranulometry", null);
__decorate([
    (0, common_1.Post)('save-essay'),
    (0, swagger_1.ApiOperation)({ summary: 'Se possível, salva os dados da GRANULOMETRY no banco de dados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Dados da GRANULOMETRY salvos com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Não foi possível salvar os dados da GRANULOMETRY no banco de dados.',
        content: {
            'application/json': {
                schema: {
                    example: {
                        success: false,
                        error: { message: 'GRANULOMETRY with name "GRANULOMETRY 1" from user "user 1"', status: 400, name: 'AlreadyExists' },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao salvar os dados da GRANULOMETRY no banco de dados.' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GranulometryController.prototype, "saveEssay", null);
__decorate([
    (0, common_1.Get)('get/:sample_id'),
    (0, swagger_1.ApiOperation)({ summary: 'Retorna um ensaio de Granulometria do banco de dados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Granulometria encontrada com sucesso!'
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Granulometria não encontrada!' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('sample_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], GranulometryController.prototype, "getGranulometryBySampleId", null);
GranulometryController = GranulometryController_1 = __decorate([
    (0, swagger_1.ApiTags)('granulometry'),
    (0, common_1.Controller)('soils/essays/granulometry'),
    __metadata("design:paramtypes", [service_1.GranulometryService])
], GranulometryController);
exports.GranulometryController = GranulometryController;
//# sourceMappingURL=index.js.map