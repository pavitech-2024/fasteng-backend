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
var HrbController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HrbController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const service_1 = require("../service");
const hrb_init_dto_1 = require("../dto/hrb-init.dto");
const calc_hrb_dto_1 = require("../dto/calc.hrb.dto");
let HrbController = HrbController_1 = class HrbController {
    constructor(hrbService) {
        this.hrbService = hrbService;
        this.logger = new common_1.Logger(HrbController_1.name);
    }
    verifyInitCbr(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('verify init cbr > [body]');
            const status = yield this.hrbService.verifyInitHrb(body);
            return response.status(200).json(status);
        });
    }
    calculateHrb(body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('calculate hrb > [body]');
            const hrb = yield this.hrbService.calculateHrb(body);
            if (hrb.success)
                this.logger.log('calculate hrb > [success]');
            else
                this.logger.error('calculate hrb > [error]');
            return hrb;
        });
    }
    saveEssay(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('save hrb > [body]');
            const hrb = yield this.hrbService.saveEssay(body);
            if (hrb.success)
                this.logger.log('save hrb > [success]');
            else
                this.logger.error('save hrb > [error]');
            return response.status(200).json(hrb);
        });
    }
};
__decorate([
    (0, common_1.Post)('verify-init'),
    (0, swagger_1.ApiOperation)({ summary: 'Verifica se é possível criar uma HRB com os dados enviados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'É possível criar uma HRB com os dados enviados.',
        content: { 'application/json': { schema: { example: { success: true } } } },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Não é possível criar uma HRB com os dados enviados.',
        content: {
            'application/json': {
                schema: { example: { success: false, error: { message: 'Sample Not Found.', status: 400, name: 'NotFound' } } },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao verificar se é possível criar uma HRB com os dados enviados.' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, hrb_init_dto_1.HrbInitDto]),
    __metadata("design:returntype", Promise)
], HrbController.prototype, "verifyInitCbr", null);
__decorate([
    (0, common_1.Post)('calculate-results'),
    (0, swagger_1.ApiOperation)({ summary: 'Calcula os resultados da HRB com os dados enviados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Resultados da HRB calculados com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao calcular os resultados da HRB com os dados enviados.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [calc_hrb_dto_1.Calc_HRB_Dto]),
    __metadata("design:returntype", Promise)
], HrbController.prototype, "calculateHrb", null);
__decorate([
    (0, common_1.Post)('save-essay'),
    (0, swagger_1.ApiOperation)({ summary: 'Se possível, salva os dados da HRB no banco de dados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Dados da HRB salvos com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Não foi possível salvar os dados da HRB no banco de dados.',
        content: {
            'application/json': {
                schema: {
                    example: {
                        success: false,
                        error: { message: 'HRB with name "HRB 1" from user "user 1"', status: 400, name: 'AlreadyExists' },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao salvar os dados da HRB no banco de dados.' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], HrbController.prototype, "saveEssay", null);
HrbController = HrbController_1 = __decorate([
    (0, swagger_1.ApiTags)('hrb'),
    (0, common_1.Controller)('soils/essays/hrb'),
    __metadata("design:paramtypes", [service_1.HrbService])
], HrbController);
exports.HrbController = HrbController;
//# sourceMappingURL=index.js.map