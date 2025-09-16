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
var SandIncreaseController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SandIncreaseController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const service_1 = require("../service");
const calc_sand_increase_dto_1 = require("../dto/calc.sand-increase.dto");
const sand_increase_init_dto_1 = require("../dto/sand-increase-init.dto");
let SandIncreaseController = SandIncreaseController_1 = class SandIncreaseController {
    constructor(sandIncreaseService) {
        this.sandIncreaseService = sandIncreaseService;
        this.logger = new common_1.Logger(SandIncreaseController_1.name);
    }
    verifyInitSandIncrease(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('verify init sand increase > [body]');
            const status = yield this.sandIncreaseService.verifyInitSandIncrease(body);
            return response.status(200).json(status);
        });
    }
    calculateUnitMass(body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`'calculate sand-increase unit mass > [body]' ${body}`);
            const sandIncrease = yield this.sandIncreaseService.calculateUnitMass(body);
            if (sandIncrease.success)
                this.logger.log('calculate sand-increase unit mass > [success]');
            else
                this.logger.error('calculate sand-increase unit mass > [error]');
            return sandIncrease;
        });
    }
    calculateMoistureContent(body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`'calculate sand-increase moisture content > [body]' ${body}`);
            const sandIncrease = yield this.sandIncreaseService.calculateMoistureContent(body);
            if (sandIncrease.success)
                this.logger.log('calculate sand-increase moisture content > [success]');
            else
                this.logger.error('calculate sand-increase moisture content > [error]');
            return sandIncrease;
        });
    }
    calculateSandIncrease(body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`'calculate sand-increase > [body]' ${body}`);
            const sandIncrease = yield this.sandIncreaseService.calculateSandIncrease(body);
            if (sandIncrease.success)
                this.logger.log('calculate sand-increase > [success]');
            else
                this.logger.error('calculate sand-increase > [error]');
            return sandIncrease;
        });
    }
    saveEssay(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('save essay > [body]');
            const sandIncrease = yield this.sandIncreaseService.saveEssay(body);
            if (sandIncrease.success)
                this.logger.log('save sandIncrease essay > [success]');
            else
                this.logger.error('save sandIncrease essay > [error]');
            return response.status(200).json(sandIncrease);
        });
    }
};
__decorate([
    (0, common_1.Post)('verify-init'),
    (0, swagger_1.ApiOperation)({ summary: 'Verifica se é possível criar um ensaio de Inchamento de Areia com os dados enviados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'É possível criar um ensaio de Inchamento de Areia com os dados enviados.',
        content: { 'application/json': { schema: { example: { success: true } } } },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Não é possível criar um ensaio de Inchamento de Areia com os dados enviados.',
        content: {
            'application/json': {
                schema: { example: { success: false, error: { message: 'Material Not Found.', status: 400, name: 'NotFound' } } },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao verificar se é possível criar um ensaio de Inchamento de Areia com os dados enviados.' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, sand_increase_init_dto_1.SandIncreaseInitDto]),
    __metadata("design:returntype", Promise)
], SandIncreaseController.prototype, "verifyInitSandIncrease", null);
__decorate([
    (0, common_1.Post)('calculate-unit-mass'),
    (0, swagger_1.ApiOperation)({ summary: 'Calcula a massa unitária do ensaio de Inchamento de Areia com os dados enviados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Massa unitária do ensaio de Inchamento de Areia calculada com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao calcular a massa unitária do ensaio de Inchamento de Areia com os dados enviados.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [calc_sand_increase_dto_1.Calc_UnitMassDto]),
    __metadata("design:returntype", Promise)
], SandIncreaseController.prototype, "calculateUnitMass", null);
__decorate([
    (0, common_1.Post)('calculate-moisture-content'),
    (0, swagger_1.ApiOperation)({ summary: 'Calcula o teor de umidade do ensaio de Inchamento de Areia com os dados enviados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Teor de umidade do ensaio de Inchamento de Areia calculada com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao calcular o teor de umidade do ensaio de Inchamento de Areia com os dados enviados.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [calc_sand_increase_dto_1.Calc_MoistureContentDto]),
    __metadata("design:returntype", Promise)
], SandIncreaseController.prototype, "calculateMoistureContent", null);
__decorate([
    (0, common_1.Post)('calculate-results'),
    (0, swagger_1.ApiOperation)({ summary: 'Calcula os resultados do ensaio de Inchamento de Areia com os dados enviados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Resultados do ensaio de Inchamento de Areia calculados com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao calcular os resultados do ensaio de Inchamento de Areia com os dados enviados.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [calc_sand_increase_dto_1.Calc_SandIncrease_Dto]),
    __metadata("design:returntype", Promise)
], SandIncreaseController.prototype, "calculateSandIncrease", null);
__decorate([
    (0, common_1.Post)('save-essay'),
    (0, swagger_1.ApiOperation)({ summary: 'Se possível, salva os dados do ensaio de incgamento de areia no banco de dados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Dados do ensaio de inchamento de areia salvos com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Não foi possível salvar os dados do ensaio de inchamento de areia no banco de dados.',
        content: {
            'application/json': {
                schema: {
                    example: {
                        success: false,
                        error: {
                            message: 'Sand increase essay with name "Sand increase 1" from user "user 1"',
                            status: 400,
                            name: 'AlreadyExists',
                        },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao salvar os dados do ensaio de inchamento de areia no banco de dados.' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, calc_sand_increase_dto_1.Save_SandIncreaseDto]),
    __metadata("design:returntype", Promise)
], SandIncreaseController.prototype, "saveEssay", null);
SandIncreaseController = SandIncreaseController_1 = __decorate([
    (0, swagger_1.ApiTags)('sandIncrease'),
    (0, common_1.Controller)('concrete/essays/sand-increase'),
    __metadata("design:paramtypes", [service_1.SandIncreaseService])
], SandIncreaseController);
exports.SandIncreaseController = SandIncreaseController;
//# sourceMappingURL=index.js.map