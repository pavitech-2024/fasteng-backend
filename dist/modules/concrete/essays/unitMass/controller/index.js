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
var UnitMassController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitMassController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const unitMass_init_dto_1 = require("../dto/unitMass-init.dto");
const service_1 = require("../service");
const unitMass_step2_dto_1 = require("../dto/unitMass-step2.dto");
const unitMass_result_dto_1 = require("../dto/unitMass-result.dto");
let UnitMassController = UnitMassController_1 = class UnitMassController {
    constructor(UnitMassService) {
        this.UnitMassService = UnitMassService;
        this.logger = new common_1.Logger(UnitMassController_1.name);
    }
    verifyInitUnitMass(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('verify init unitMass > [body]');
            const status = yield this.UnitMassService.verifyInitUnitMass(body);
            return response.status(200).json(status);
        });
    }
    verifyStep2DataUnitMass(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('verify init unitMass > [body]');
            const status = yield this.UnitMassService.verifyStep2DataUnitMass(body);
            return response.status(200).json(status);
        });
    }
    calculateUnitMass(body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('calculate chapman > [body]');
            const unitMass = yield this.UnitMassService.resultUnitMass(body);
            if (unitMass.success)
                this.logger.log('calculate unitMass > [success]');
            else
                this.logger.error('calculate unitMass > [error]');
            return unitMass;
        });
    }
    saveEssay(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('save unitMass > [body]');
            const unitMass = yield this.UnitMassService.saveEssay(body);
            if (unitMass.success)
                this.logger.log('save unitMass > [success]');
            else
                this.logger.error('save unitMass > [error]');
            return response.status(200).json(unitMass);
        });
    }
};
__decorate([
    (0, common_1.Post)('verify-init'),
    (0, swagger_1.ApiOperation)({ summary: 'Verifica se é possível criar uma massa unitária com os dados enviados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'É possível criar uma massa unitária com os dados enviados.',
        content: { 'application/json': { schema: { example: { success: true } } } },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Não é possível criar uma massa unitária com os dados enviados.',
        content: {
            'application/json': {
                schema: { example: { success: false, error: { message: 'Sample Not Found.', status: 400, name: 'NotFound' } } },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Erro ao verificar se é possível criar uma massa unitária com os dados enviados.',
    }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, unitMass_init_dto_1.UnitMass_Init_Dto]),
    __metadata("design:returntype", Promise)
], UnitMassController.prototype, "verifyInitUnitMass", null);
__decorate([
    (0, common_1.Post)('step2-unitMass-data'),
    (0, swagger_1.ApiOperation)({ summary: 'Verifica se é possível criar uma massa unitária com os dados enviados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'É possível criar uma massa unitária com os dados enviados.',
        content: { 'application/json': { schema: { example: { success: true } } } },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Não é possível criar uma massa unitária com os dados enviados.',
        content: {
            'application/json': {
                schema: { example: { success: false, error: { message: 'Sample Not Found.', status: 400, name: 'NotFound' } } },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Erro ao verificar se é possível criar uma massa unitária com os dados enviados.',
    }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, unitMass_step2_dto_1.UnitMass_Step2_Dto]),
    __metadata("design:returntype", Promise)
], UnitMassController.prototype, "verifyStep2DataUnitMass", null);
__decorate([
    (0, common_1.Post)('calculate-results'),
    (0, swagger_1.ApiOperation)({ summary: 'Calcula os resultados da massa unitária com os dados enviados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Resultados da massa unitária calculados com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao calcular os resultados da massa unitária com os dados enviados.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [unitMass_result_dto_1.Result_UnitMass_Dto]),
    __metadata("design:returntype", Promise)
], UnitMassController.prototype, "calculateUnitMass", null);
__decorate([
    (0, common_1.Post)('save-essay'),
    (0, swagger_1.ApiOperation)({ summary: 'Se possível, salva os dados da massa unitária no banco de dados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Dados da massa unitária salvos com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao salvar os dados da massa unitária no banco de dados.' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UnitMassController.prototype, "saveEssay", null);
UnitMassController = UnitMassController_1 = __decorate([
    (0, swagger_1.ApiTags)('unitMass'),
    (0, common_1.Controller)('concrete/essays/unitMass'),
    __metadata("design:paramtypes", [service_1.UnitMassService])
], UnitMassController);
exports.UnitMassController = UnitMassController;
//# sourceMappingURL=index.js.map