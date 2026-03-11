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
var SucsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SucsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const index_1 = require("../service/index");
const sucs_init_dto_1 = require("../dto/sucs-init.dto");
const calc_sucs_dto_1 = require("../dto/calc.sucs.dto");
let SucsController = SucsController_1 = class SucsController {
    constructor(sucsService) {
        this.sucsService = sucsService;
        this.logger = new common_1.Logger(SucsController_1.name);
    }
    verifyInitSucs(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('verify init sucs > [body]');
            const status = yield this.sucsService.verifyInitSucs(body);
            return response.status(200).json(status);
        });
    }
    calculateSucs(body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('calculate sucs > [body]');
            const sucs = yield this.sucsService.calculateSucs(body);
            if (sucs.success)
                this.logger.log('calculate sucs > [success]');
            else
                this.logger.error('calculate sucs > [error]');
            return sucs;
        });
    }
    saveEssay(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('save essay > [body]');
            const sucs = yield this.sucsService.saveEssay(body);
            if (sucs.success)
                this.logger.log('save sucs essay > [success]');
            else
                this.logger.error('save sucs essay > [error]');
            return response.status(200).json(sucs);
        });
    }
};
exports.SucsController = SucsController;
__decorate([
    (0, common_1.Post)('verify-init'),
    (0, swagger_1.ApiOperation)({ summary: 'Verifica se é possível criar uma SUCS com os dados enviados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'É possível criar uma SUCS com os dados enviados.',
        content: { 'application/json': { schema: { example: { success: true } } } },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Não é possível criar uma SUCS com os dados enviados.',
        content: {
            'application/json': {
                schema: { example: { success: false, error: { message: 'Sample Not Found.', status: 400, name: 'NotFound' } } },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao verificar se é possível criar uma SUCS com os dados enviados.' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, sucs_init_dto_1.SucsInitDto]),
    __metadata("design:returntype", Promise)
], SucsController.prototype, "verifyInitSucs", null);
__decorate([
    (0, common_1.Post)('calculate-results'),
    (0, swagger_1.ApiOperation)({ summary: 'Calcula os resultados da SUCS com os dados enviados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Resultados da SUCS calculados com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao calcular os resultados da SUCS com os dados enviados.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [calc_sucs_dto_1.Calc_SUCS_Dto]),
    __metadata("design:returntype", Promise)
], SucsController.prototype, "calculateSucs", null);
__decorate([
    (0, common_1.Post)('save-essay'),
    (0, swagger_1.ApiOperation)({ summary: 'Se possível, salva os dados da SUCS no banco de dados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Dados da SUCS salvos com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Não foi possível salvar os dados da SUCS no banco de dados.',
        content: {
            'application/json': {
                schema: {
                    example: {
                        success: false,
                        error: { message: 'SUCS with name "SUCS 1" from user "user 1"', status: 400, name: 'AlreadyExists' },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao salvar os dados da SUCS no banco de dados.' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SucsController.prototype, "saveEssay", null);
exports.SucsController = SucsController = SucsController_1 = __decorate([
    (0, swagger_1.ApiTags)('sucs'),
    (0, common_1.Controller)('soils/essays/sucs'),
    __metadata("design:paramtypes", [index_1.SucsService])
], SucsController);
//# sourceMappingURL=index.js.map