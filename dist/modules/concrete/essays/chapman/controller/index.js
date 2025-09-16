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
var ChapmanController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChapmanController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const chapman_init_dto_1 = require("../dto/chapman-init.dto");
const champan_service_1 = require("../service/champan.service");
const calc_chapman_dto_1 = require("../dto/calc.chapman.dto");
let ChapmanController = ChapmanController_1 = class ChapmanController {
    constructor(chapmanService) {
        this.chapmanService = chapmanService;
        this.logger = new common_1.Logger(ChapmanController_1.name);
    }
    verifyInitChapman(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('verify init chapman > [body]');
            const status = yield this.chapmanService.verifyInitChapman(body);
            return response.status(200).json(status);
        });
    }
    calculateChapman(body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('calculate chapman > [body]');
            const chapman = yield this.chapmanService.calculateChapman(body);
            if (chapman.success)
                this.logger.log('calculate chapman > [success]');
            else
                this.logger.error('calculate chapman > [error]');
            return chapman;
        });
    }
    saveEssay(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('save chapman > [body]');
            const chapman = yield this.chapmanService.saveEssay(body);
            if (chapman.success)
                this.logger.log('save chapman > [success]');
            else
                this.logger.error('save chapman > [error]');
            return response.status(200).json(chapman);
        });
    }
};
__decorate([
    (0, common_1.Post)('verify-init'),
    (0, swagger_1.ApiOperation)({ summary: 'Verifica se é possível criar uma Chapman com os dados enviados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'É possível criar uma Chapman com os dados enviados.',
        content: { 'application/json': { schema: { example: { success: true } } } },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Não é possível criar uma Chapman com os dados enviados.',
        content: {
            'application/json': {
                schema: { example: { success: false, error: { message: 'Sample Not Found.', status: 400, name: 'NotFound' } } },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao verificar se é possível criar uma Chapman com os dados enviados.' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, chapman_init_dto_1.ChapmanInitDto]),
    __metadata("design:returntype", Promise)
], ChapmanController.prototype, "verifyInitChapman", null);
__decorate([
    (0, common_1.Post)('calculate-results'),
    (0, swagger_1.ApiOperation)({ summary: 'Calcula os resultados da Chapman com os dados enviados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Resultados da Chapman calculados com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao calcular os resultados da Chapman com os dados enviados.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [calc_chapman_dto_1.Calc_CHAPMAN_dto]),
    __metadata("design:returntype", Promise)
], ChapmanController.prototype, "calculateChapman", null);
__decorate([
    (0, common_1.Post)('save-essay'),
    (0, swagger_1.ApiOperation)({ summary: 'Se possível, salva os dados da Chapman no banco de dados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Dados da Chapman salvos com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao salvar os dados da Chapman no banco de dados.' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChapmanController.prototype, "saveEssay", null);
ChapmanController = ChapmanController_1 = __decorate([
    (0, swagger_1.ApiTags)('chapman'),
    (0, common_1.Controller)('concrete/essays/chapman'),
    __metadata("design:paramtypes", [champan_service_1.ChapmanService])
], ChapmanController);
exports.ChapmanController = ChapmanController;
//# sourceMappingURL=index.js.map