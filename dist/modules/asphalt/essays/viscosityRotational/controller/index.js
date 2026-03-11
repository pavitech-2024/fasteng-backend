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
var ViscosityRotationalController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViscosityRotationalController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const calc_viscosityRotational_dto_1 = require("../dto/calc-viscosityRotational.dto");
const init_viscosityRotational_dto_1 = require("../dto/init-viscosityRotational.dto");
const viscosityRotational_service_1 = require("../service/viscosityRotational.service");
let ViscosityRotationalController = ViscosityRotationalController_1 = class ViscosityRotationalController {
    constructor(viscosityRotationalService) {
        this.viscosityRotationalService = viscosityRotationalService;
        this.logger = new common_1.Logger(ViscosityRotationalController_1.name);
    }
    verifyInitViscosityRotational(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('verify init viscosityRotational > [body]');
            const status = yield this.viscosityRotationalService.verifyInitViscosityRotational(body);
            return response.status(200).json(status);
        });
    }
    calculateViscosityRotational(body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('calculate viscosityRotational > [body]');
            const viscosityRotational = yield this.viscosityRotationalService.calculateViscosityRotational(body);
            if (viscosityRotational.success)
                this.logger.log('calculate viscosityRotational > [success]');
            else
                this.logger.error('calculate viscosityRotational > [error]');
            return viscosityRotational;
        });
    }
    saveEssay(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('save viscosityRotational > [body]');
            const viscosityRotational = yield this.viscosityRotationalService.saveEssay(body);
            if (viscosityRotational.success)
                this.logger.log('save viscosityRotational > [success]');
            else
                this.logger.error('save viscosityRotational > [error]');
            return response.status(200).json(viscosityRotational);
        });
    }
};
exports.ViscosityRotationalController = ViscosityRotationalController;
__decorate([
    (0, common_1.Post)('verify-init'),
    (0, swagger_1.ApiOperation)({ summary: 'Verifica se é possível criar um ensaio de viscosidade rotacional com os dados enviados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'É possível criar um ensaio de viscosidade rotacional com os dados enviados.',
        content: { 'application/json': { schema: { example: { success: true } } } },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Não é possível criar um ensaio de viscosidade rotacional com os dados enviados.',
        content: {
            'application/json': {
                schema: {
                    example: { success: false, error: { message: 'Material Not Found.', status: 400, name: 'NotFound' } },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Erro ao verificar se é possível criar um ensaio de viscosidade Saybolt-Furol com os dados enviados.',
    }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, init_viscosityRotational_dto_1.ViscosityRotationalInitDto]),
    __metadata("design:returntype", Promise)
], ViscosityRotationalController.prototype, "verifyInitViscosityRotational", null);
__decorate([
    (0, common_1.Post)('calculate-results'),
    (0, swagger_1.ApiOperation)({ summary: 'Calcula os resultados do ensaio de viscosidade rotacional com os dados enviados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Resultados d ensaio de viscosidade rotacional calculados com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Erro ao calcular os resultados do ensaio de viscosidade rotacional com os dados enviados.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [calc_viscosityRotational_dto_1.Calc_ViscosityRotational_Dto]),
    __metadata("design:returntype", Promise)
], ViscosityRotationalController.prototype, "calculateViscosityRotational", null);
__decorate([
    (0, common_1.Post)('save-essay'),
    (0, swagger_1.ApiOperation)({ summary: 'Se possível, salva os dados do ensaio de viscosidade rotacional no banco de dados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Dados do ensaio de viscosidade rotacional salvos com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Erro ao salvar os dados do ensaio de viscosidade rotacional no banco de dados.',
    }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ViscosityRotationalController.prototype, "saveEssay", null);
exports.ViscosityRotationalController = ViscosityRotationalController = ViscosityRotationalController_1 = __decorate([
    (0, swagger_1.ApiTags)('viscosityRotational'),
    (0, common_1.Controller)('asphalt/essays/viscosityRotational'),
    __metadata("design:paramtypes", [viscosityRotational_service_1.ViscosityRotationalService])
], ViscosityRotationalController);
//# sourceMappingURL=index.js.map