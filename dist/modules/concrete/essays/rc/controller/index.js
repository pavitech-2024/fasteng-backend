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
var ConcreteRcController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcreteRcController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const calc_rc_dto_1 = require("../dto/calc.rc.dto");
const concretert_init_dto_1 = require("../dto/concretert-init.dto");
const service_1 = require("../service");
let ConcreteRcController = ConcreteRcController_1 = class ConcreteRcController {
    constructor(concretercService) {
        this.concretercService = concretercService;
        this.logger = new common_1.Logger(ConcreteRcController_1.name);
    }
    verifyInitConcreteRc(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('verify init concrete rc > [body]');
            const status = yield this.concretercService.verifyInitRc(body);
            return response.status(200).json(status);
        });
    }
    calculateConcreteRc(body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('calculate concrete rc > [body]');
            const rc = yield this.concretercService.calculateRc(body);
            if (rc.success)
                this.logger.log('calculate concrete rc > [success]');
            else
                this.logger.error('calculate concrete rc > [error]');
            return rc;
        });
    }
    saveConcreteEssay(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('save concrete essay > [body]');
            const rc = yield this.concretercService.saveEssay(body);
            if (rc.success)
                this.logger.log('save concrete rc essay > [success]');
            else
                this.logger.error('save concrete rc essay > [error]');
            return response.status(200).json(rc);
        });
    }
};
__decorate([
    (0, common_1.Post)('verify-init'),
    (0, swagger_1.ApiOperation)({
        summary: 'Verifica se é possível criar umensaio de resistência à compressão em concreto com os dados enviados.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'É possível criar umensaio de resistência à compressão em concreto com os dados enviados.',
        content: { 'application/json': { schema: { example: { success: true } } } },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Não é possível criar umensaio de resistência à compressão em concreto com os dados enviados.',
        content: {
            'application/json': {
                schema: { example: { success: false, error: { message: 'Sample Not Found.', status: 400, name: 'NotFound' } } },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Erro ao verificar se é possível criar umensaio de resistência à compressão em concreto com os dados enviados.',
    }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, concretert_init_dto_1.ConcreteRcInitDto]),
    __metadata("design:returntype", Promise)
], ConcreteRcController.prototype, "verifyInitConcreteRc", null);
__decorate([
    (0, common_1.Post)('calculate-results'),
    (0, swagger_1.ApiOperation)({ summary: 'Calcula os resultados da granulometria de ensaio de concreto com os dados enviados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Resultados da granulometria de ensaio de concreto calculados com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Erro ao calcular os resultados da granulometria de ensaio de concreto com os dados enviados.',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [calc_rc_dto_1.Calc_CONCRETERC_Dto]),
    __metadata("design:returntype", Promise)
], ConcreteRcController.prototype, "calculateConcreteRc", null);
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
                        error: { message: 'Rc with name "Rc 1" from user "User 1"', status: 400, name: 'AlreadyExists' },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Erro ao salvar os dados da granulometria de ensaio de concreto no banco de dados.',
    }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ConcreteRcController.prototype, "saveConcreteEssay", null);
ConcreteRcController = ConcreteRcController_1 = __decorate([
    (0, swagger_1.ApiTags)('concreteRc'),
    (0, common_1.Controller)('concrete/essays/concreteRc'),
    __metadata("design:paramtypes", [service_1.ConcreteRcService])
], ConcreteRcController);
exports.ConcreteRcController = ConcreteRcController;
//# sourceMappingURL=index.js.map