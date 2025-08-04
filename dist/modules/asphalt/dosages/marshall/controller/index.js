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
var MarshallController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarshallController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const service_1 = require("../service");
const marshall_init_dto_1 = require("../dto/marshall-init.dto");
let MarshallController = MarshallController_1 = class MarshallController {
    constructor(marshallService) {
        this.marshallService = marshallService;
        this.logger = new common_1.Logger(MarshallController_1.name);
    }
    getAllByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`Buscando todas dosagens para usuário id: ${userId}`);
            try {
                const dosages = yield this.marshallService.getAllDosages(userId);
                if (!dosages || dosages.length === 0) {
                    throw new common_1.NotFoundException('Nenhuma dosagem encontrada para este usuário.');
                }
                return dosages;
            }
            catch (error) {
                this.logger.error(`Erro ao buscar dosagens do usuário ${userId}`, error.stack);
                throw new common_1.NotFoundException('Usuário não encontrado.');
            }
        });
    }
    verifyInitMarshall(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`Verificando criação de dosagem Marshall para usuário id: ${userId}`);
            try {
                return yield this.marshallService.verifyInitMarshall(body, userId);
            }
            catch (error) {
                this.logger.error('Erro ao verificar criação de dosagem Marshall', error.stack);
                throw new common_1.InternalServerErrorException('Erro interno ao verificar dosagem.');
            }
        });
    }
    getMaterialsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`Buscando materiais para usuário id: ${userId}`);
            try {
                const materials = yield this.marshallService.getUserMaterials(userId);
                if (!materials) {
                    throw new common_1.NotFoundException('Materiais não encontrados para este usuário.');
                }
                return materials;
            }
            catch (error) {
                this.logger.error(`Erro ao buscar materiais do usuário ${userId}`, error.stack);
                throw new common_1.NotFoundException('Usuário não encontrado.');
            }
        });
    }
    getDosageById(dosageId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`Buscando dosagem por id: ${dosageId}`);
            try {
                const dosage = yield this.marshallService.getDosageById(dosageId);
                if (!dosage) {
                    throw new common_1.NotFoundException('Dosagem não encontrada.');
                }
                return dosage;
            }
            catch (error) {
                this.logger.error(`Erro ao buscar dosagem id ${dosageId}`, error.stack);
                throw new common_1.NotFoundException('Dosagem não encontrada.');
            }
        });
    }
    saveMaterialSelectionStep(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`Salvando etapa seleção materiais para usuário id: ${userId}`);
            return this.marshallService.saveMaterialSelectionStep(body, userId);
        });
    }
    getStep3Data(body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`Carregando dados da etapa 3`);
            return this.marshallService.getStep3Data(body);
        });
    }
    calculateStep3Data(body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`Calculando dados da etapa 3`);
            return this.marshallService.calculateStep3Data(body);
        });
    }
    saveGranulometryCompositionStep(userId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`Salvando dados da composição granulométrica para usuário id: ${userId}`);
            return this.marshallService.saveStep3Data(body, userId);
        });
    }
    calculateStep4Data(body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`Calculando dados da etapa 4`);
            return this.marshallService.calculateStep4Data(body);
        });
    }
    saveBinderTrialStep(userId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`Salvando dados da etapa 4 para usuário id: ${userId}`);
            return this.marshallService.saveStep4Data(body, userId);
        });
    }
    getIndexesOfMissesSpecificGravity(aggregates) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`Buscando índices de massa específica - etapa 5`);
            return this.marshallService.getIndexesOfMissesSpecificGravity(aggregates);
        });
    }
    calculateDmtData(body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`Calculando dados DMT - etapa 5`);
            return this.marshallService.calculateDmtData(body);
        });
    }
    calculateGmmData(body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`Calculando dados GMM - etapa 5`);
            return this.marshallService.calculateGmmData(body);
        });
    }
    calculateRiceTest(body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`Calculando teste Rice - etapa 5`);
            return this.marshallService.calculateRiceTest(body.riceTest);
        });
    }
    saveMaximumMixtureDensityData(userId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`Salvando dados máxima densidade da mistura para usuário id: ${userId}`);
            return this.marshallService.saveStep5Data(body, userId);
        });
    }
    setVolumetricParameters(body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`Definindo parâmetros volumétricos - etapa 6`);
            return this.marshallService.setVolumetricParameters(body);
        });
    }
    saveVolumetricParametersData(userId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`Salvando parâmetros volumétricos para usuário id: ${userId}`);
            return this.marshallService.saveStep6Data(body, userId);
        });
    }
    setOptimumBinderContentData(body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`Definindo conteúdo ótimo do ligante - etapa 7`);
            return this.marshallService.setOptimumBinderContentData(body);
        });
    }
    setOptimumBinderContentDosageGraph(body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`Gerando gráfico da dosagem do ligante - etapa 7`);
            return this.marshallService.setOptimumBinderContentDosageGraph(body);
        });
    }
    getOptimumBinderExpectedParameters(body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`Buscando parâmetros esperados do ligante - etapa 7`);
            return this.marshallService.getOptimumBinderExpectedParameters(body);
        });
    }
    saveOptimumBinderContentData(userId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`Salvando dados do ligante ótimo para usuário id: ${userId}`);
            return this.marshallService.saveStep7Data(body, userId);
        });
    }
    confirmSpecificGravity(body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`Confirmando gravidade específica - etapa 8`);
            return this.marshallService.confirmSpecificGravity(body);
        });
    }
    confirmVolumetricParameters(body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`Confirmando parâmetros volumétricos - etapa 8`);
            return this.marshallService.confirmVolumetricParameters(body);
        });
    }
    saveConfirmationCompressionData(userId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`Salvando dados de compressão confirmada para usuário id: ${userId}`);
            return this.marshallService.saveStep8Data(body, userId);
        });
    }
    saveMarshallDosage(userId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`Salvando dosagem Marshall para usuário id: ${userId}`);
            return this.marshallService.saveMarshallDosage(body, userId);
        });
    }
    deleteMarshallDosage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`Deletando dosagem Marshall id: ${id}`);
            return this.marshallService.deleteMarshallDosage(id);
        });
    }
};
__decorate([
    (0, common_1.Get)('all/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Retorna todas as dosagens Marshall do banco de dados de um usuário.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Dosagens encontradas com sucesso!' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Usuário não encontrado!' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "getAllByUserId", null);
__decorate([
    (0, common_1.Post)('verify-init/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Verifica se é possível criar uma dosagem Marshall com os dados enviados.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Resultado da verificação da criação da dosagem.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro na verificação.' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [marshall_init_dto_1.MarshallInitDto, String]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "verifyInitMarshall", null);
__decorate([
    (0, common_1.Get)('material-selection/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Retorna todos os materiais do banco de dados de um usuário, que possuam os ensaios para a dosagem.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Materiais encontrados com sucesso!' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Usuário não encontrado!' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "getMaterialsByUserId", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Retorna uma dosagem do banco de dados com o id informado.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Dosagem encontrada com sucesso!' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Dosagem não encontrada!' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "getDosageById", null);
__decorate([
    (0, common_1.Post)('save-material-selection-step/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "saveMaterialSelectionStep", null);
__decorate([
    (0, common_1.Post)('step-3-data'),
    (0, swagger_1.ApiOperation)({ summary: 'Retorna os dados iniciais necessários para a terceira tela (composição granulométrica) da dosagem' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "getStep3Data", null);
__decorate([
    (0, common_1.Post)('calculate-step-3-data'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "calculateStep3Data", null);
__decorate([
    (0, common_1.Post)('save-granulometry-composition-step/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "saveGranulometryCompositionStep", null);
__decorate([
    (0, common_1.Post)('calculate-step-4-data'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "calculateStep4Data", null);
__decorate([
    (0, common_1.Post)('save-binder-trial-step/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "saveBinderTrialStep", null);
__decorate([
    (0, common_1.Post)('get-specific-mass-indexes'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "getIndexesOfMissesSpecificGravity", null);
__decorate([
    (0, common_1.Post)('calculate-step-5-dmt-data'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "calculateDmtData", null);
__decorate([
    (0, common_1.Post)('calculate-step-5-gmm-data'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "calculateGmmData", null);
__decorate([
    (0, common_1.Post)('calculate-step-5-rice-test'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "calculateRiceTest", null);
__decorate([
    (0, common_1.Post)('save-maximum-mixture-density-step/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "saveMaximumMixtureDensityData", null);
__decorate([
    (0, common_1.Post)('set-step-6-volumetric-parameters'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "setVolumetricParameters", null);
__decorate([
    (0, common_1.Post)('save-volumetric-parameters-step/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "saveVolumetricParametersData", null);
__decorate([
    (0, common_1.Post)('set-step-7-optimum-binder'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "setOptimumBinderContentData", null);
__decorate([
    (0, common_1.Post)('step-7-plot-dosage-graph'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "setOptimumBinderContentDosageGraph", null);
__decorate([
    (0, common_1.Post)('step-7-get-expected-parameters'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "getOptimumBinderExpectedParameters", null);
__decorate([
    (0, common_1.Post)('save-optimum-binder-content-step/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "saveOptimumBinderContentData", null);
__decorate([
    (0, common_1.Post)('confirm-specific-gravity'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "confirmSpecificGravity", null);
__decorate([
    (0, common_1.Post)('confirm-volumetric-parameters'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "confirmVolumetricParameters", null);
__decorate([
    (0, common_1.Post)('save-confirmation-compression-data-step/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "saveConfirmationCompressionData", null);
__decorate([
    (0, common_1.Post)('save-marshall-dosage/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "saveMarshallDosage", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "deleteMarshallDosage", null);
MarshallController = MarshallController_1 = __decorate([
    (0, swagger_1.ApiTags)('marshall'),
    (0, common_1.Controller)('asphalt/dosages/marshall'),
    __metadata("design:paramtypes", [service_1.MarshallService])
], MarshallController);
exports.MarshallController = MarshallController;
//# sourceMappingURL=index.js.map