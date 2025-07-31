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
var PenetrationController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PenetrationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const calc_penetration_dto_1 = require("../dto/calc.penetration.dto");
const penetration_init_dto_1 = require("../dto/penetration-init.dto");
const service_1 = require("../service");
let PenetrationController = PenetrationController_1 = class PenetrationController {
    constructor(penetrationService) {
        this.penetrationService = penetrationService;
        this.logger = new common_1.Logger(PenetrationController_1.name);
    }
    verifyInitPenetration(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('verify init penetration > [body]');
            const status = yield this.penetrationService.verifyInitPenetration(body);
            return response.status(200).json(status);
        });
    }
    calculatePenetration(body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('calculate penetration > [body]');
            const penetration = yield this.penetrationService.calculatePenetration(body);
            if (penetration.success)
                this.logger.log('calculate penetration > [success]');
            else
                this.logger.error('calculate penetration > [error]');
            return penetration;
        });
    }
    saveEssay(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('save essay > [body]');
            const penetration = yield this.penetrationService.saveEssay(body);
            if (penetration.success)
                this.logger.log('save penetration essay > [success]');
            else
                this.logger.error('save penetration essay > [error]');
            return response.status(200).json(penetration);
        });
    }
};
exports.PenetrationController = PenetrationController;
__decorate([
    (0, common_1.Post)('verify-init'),
    (0, swagger_1.ApiOperation)({ summary: 'Verifica se é possível criar um ensaio de penetração com os dados enviados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'É possível criar um ensaio de penetração com os dados enviados.',
        content: { 'application/json': { schema: { example: { success: true } } } },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Não é possível criar um ensaio de penetração com os dados enviados.',
        content: {
            'application/json': {
                schema: { example: { success: false, error: { message: 'Sample Not Found.', status: 400, name: 'NotFound' } } },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao verificar se é possível criar um ensaio de penetração com os dados enviados.' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, penetration_init_dto_1.PenetrationInitDto]),
    __metadata("design:returntype", Promise)
], PenetrationController.prototype, "verifyInitPenetration", null);
__decorate([
    (0, common_1.Post)('calculate-results'),
    (0, swagger_1.ApiOperation)({ summary: 'Calcula os resultados do ensaio de penetração com os dados enviados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Resultados do ensaio de penetração calculados com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao calcular os resultados do ensaio de penetração com os dados enviados.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [calc_penetration_dto_1.Calc_Penetration_Dto]),
    __metadata("design:returntype", Promise)
], PenetrationController.prototype, "calculatePenetration", null);
__decorate([
    (0, common_1.Post)('save-essay'),
    (0, swagger_1.ApiOperation)({ summary: 'Se possível, salva os dados do ensaio de penetração no banco de dados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Dados do ensaio de penetração salvos com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Não foi possível salvar os dados do ensaio de penetração no banco de dados.',
        content: {
            'application/json': {
                schema: {
                    example: {
                        success: false,
                        error: { message: 'Penetration with name "Penetration 1" from user "user 1"', status: 400, name: 'AlreadyExists' },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao salvar os dados do ensaio de penetração no banco de dados.' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PenetrationController.prototype, "saveEssay", null);
exports.PenetrationController = PenetrationController = PenetrationController_1 = __decorate([
    (0, swagger_1.ApiTags)('penetration'),
    (0, common_1.Controller)('asphalt/essays/penetration'),
    __metadata("design:paramtypes", [service_1.PenetrationService])
], PenetrationController);
//# sourceMappingURL=index.js.map