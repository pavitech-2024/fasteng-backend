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
const marshal_general_data_dto_1 = require("../dto/marshal-general-data.dto");
const binder_trial_data_dto_1 = require("../dto/binder-trial-data.dto");
const calculate_dmt_data_dto_1 = require("../dto/calculate-dmt-data.dto");
const calculate_gmm_data_dto_1 = require("../dto/calculate-gmm-data.dto");
const get_indexes_of_misses_specific_gravity_dto_1 = require("../dto/get-indexes-of-misses-specific-gravity.dto");
const calculate_rice_test_dto_1 = require("../dto/calculate-rice-test.dto");
const save_maximum_mixture_density_data_dto_1 = require("../dto/save-maximum-mixture-density-data.dto");
let MarshallController = MarshallController_1 = class MarshallController {
    constructor(marshallService) {
        this.marshallService = marshallService;
        this.logger = new common_1.Logger(MarshallController_1.name);
    }
    getAllByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`get all dosages by user id > [id]: ${userId}`);
            return this.marshallService.getAllDosages(userId);
        });
    }
    getDosageById(response, dosageId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`get dosage by id > [id]: ${dosageId}`);
            const status = yield this.marshallService.getDosageById(dosageId);
            return response.status(200).json(status);
        });
    }
    verifyInitMarshall(response, body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('verify init Marshall > [body]');
            const status = yield this.marshallService.verifyInitMarshall(body, userId);
            return response.status(200).json(status);
        });
    }
    getIndexesOfMissesSpecificGravity(response, aggregates) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`get specific mass indexes > [body]: ${JSON.stringify(aggregates)}`);
            const status = yield this.marshallService.getIndexesOfMissesSpecificGravity(aggregates);
            return response.status(200).json(status);
        });
    }
    calculateDmtData(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`calculate step 5 dmt data > [body]: ${JSON.stringify(body)}`);
            const status = yield this.marshallService.calculateDmtData(body);
            return response.status(200).json(status);
        });
    }
    calculateGmmData(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`calculate step 5 gmm data > [body]: ${JSON.stringify(body)}`);
            const status = yield this.marshallService.calculateGmmData(body);
            return response.status(200).json(status);
        });
    }
    calculateRiceTest(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`calculate maximum mixture density rice test > [body]: ${JSON.stringify(body)}`);
            const status = yield this.marshallService.calculateRiceTest(body);
            return response.status(200).json(status);
        });
    }
    saveMarshallDosage(response, userId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`save marshall dosage > [body]: ${JSON.stringify(body)}`);
            const status = yield this.marshallService.saveMarshallDosage(body, userId);
            return response.status(200).json(status);
        });
    }
    deleteMarshallDosage(response, id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`delete marshall dosage > [id]: ${id}`);
            const status = yield this.marshallService.deleteMarshallDosage(id);
            return response.status(200).json(status);
        });
    }
    getStep3Data(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`get step 3 data > [body]: ${JSON.stringify(body)}`);
            const status = yield this.marshallService.getStep3Data(body);
            return response.status(200).json(status);
        });
    }
    calculateStep3Data(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`calculate step 3 data > [body]: ${JSON.stringify(body)}`);
            const status = yield this.marshallService.calculateStep3Data(body);
            return response.status(200).json(status);
        });
    }
    saveGranulometryCompositionStep(response, userId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`save step 3 data > [body]: ${JSON.stringify(body)}`);
            const status = yield this.marshallService.saveStep3Data(body, userId);
            return response.status(200).json(status);
        });
    }
    calculateStep4Data(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`calculate step 4 data > [body]: ${JSON.stringify(body)}`);
            const status = yield this.marshallService.calculateStep4Data(body);
            return response.status(200).json(status);
        });
    }
    saveBinderTrialStep(response, userId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`save step 4 data > [body]: ${JSON.stringify(body)}`);
            const status = yield this.marshallService.saveStep4Data(body, userId);
            return response.status(200).json(status);
        });
    }
    saveMaximumMixtureDensityData(response, userId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`save maximum mixture density data > [body]: ${JSON.stringify(body)}`);
            const status = yield this.marshallService.saveMistureMaximumDensityData(body, userId);
            return response.status(200).json(status);
        });
    }
    setVolumetricParameters(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`set step 6 volumetric parameters > [body]: ${JSON.stringify(body)}`);
            const status = yield this.marshallService.setVolumetricParameters(body);
            return response.status(200).json(status);
        });
    }
    saveVolumetricParametersData(response, userId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`save volumetric parameters data > [body]: ${JSON.stringify(body)}`);
            const status = yield this.marshallService.saveVolumetricParametersData(body, userId);
            return response.status(200).json(status);
        });
    }
    setOptimumBinderContentData(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`set step 7 optimum binder content > [body]: ${JSON.stringify(body)}`);
            const status = yield this.marshallService.setOptimumBinderContentData(body);
            return response.status(200).json(status);
        });
    }
    setOptimumBinderContentDosageGraph(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`step 7 dosage graph > [body]: ${JSON.stringify(body)}`);
            const status = yield this.marshallService.setOptimumBinderContentDosageGraph(body);
            return response.status(200).json(status);
        });
    }
    getOptimumBinderExpectedParameters(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`get step 7 optimum binder expected parameters > [body]: ${JSON.stringify(body)}`);
            const status = yield this.marshallService.getOptimumBinderExpectedParameters(body);
            return response.status(200).json(status);
        });
    }
    saveOptimumBinderContentData(response, userId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`save step 7 data > [body]: ${JSON.stringify(body)}`);
            const status = yield this.marshallService.saveStep7Data(body, userId);
            return response.status(200).json(status);
        });
    }
    confirmSpecificGravity(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`confirm step 8 specific gravity > [body]: ${JSON.stringify(body)}`);
            const status = yield this.marshallService.confirmSpecificGravity(body);
            return response.status(200).json(status);
        });
    }
    confirmVolumetricParameters(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`confirm step 8 volumetric parameters > [body]: ${JSON.stringify(body)}`);
            const status = yield this.marshallService.confirmVolumetricParameters(body);
            return response.status(200).json(status);
        });
    }
    saveConfirmationCompressionData(response, userId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`save step 8 data > [body]: ${JSON.stringify(body)}`);
            const status = yield this.marshallService.saveStep8Data(body, userId);
            return response.status(200).json(status);
        });
    }
};
exports.MarshallController = MarshallController;
__decorate([
    (0, common_1.Get)('all/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Retorna todas as dosagens Marshall de um usuário.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Dosagens encontradas com sucesso!' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "getAllByUserId", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Retorna uma dosagem do banco de dados com o id informado.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Dosagem encontrada com sucesso!' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Dosagem não encontrada!' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "getDosageById", null);
__decorate([
    (0, common_1.Post)('verify-init/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Verifica se é possível criar uma dosagem Marshall.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Status da verificação.',
        content: { 'application/json': { schema: { example: { success: true } } } },
    }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, marshal_general_data_dto_1.MarshallGeneralDataDTO, String]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "verifyInitMarshall", null);
__decorate([
    (0, common_1.Post)('get-specific-mass-indexes'),
    (0, swagger_1.ApiOperation)({ summary: 'Retorna índices de massa específica faltante (DMT).' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Índices calculados com sucesso.' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, get_indexes_of_misses_specific_gravity_dto_1.GetIndexesOfMissesSpecificGravityDTO]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "getIndexesOfMissesSpecificGravity", null);
__decorate([
    (0, common_1.Post)('calculate-step-5-dmt-data'),
    (0, swagger_1.ApiOperation)({ summary: 'Calcula dados DMT da dosagem.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Dados DMT calculados com sucesso.' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, calculate_dmt_data_dto_1.CalculateDmtDataDTO]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "calculateDmtData", null);
__decorate([
    (0, common_1.Post)('calculate-step-5-gmm-data'),
    (0, swagger_1.ApiOperation)({ summary: 'Calcula dados GMM da dosagem.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Dados GMM calculados com sucesso.' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, calculate_gmm_data_dto_1.CalculateGmmDataDTO]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "calculateGmmData", null);
__decorate([
    (0, common_1.Post)('calculate-step-5-rice-test'),
    (0, swagger_1.ApiOperation)({ summary: 'Calcula Rice Test da dosagem.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Rice Test calculado com sucesso.' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, calculate_rice_test_dto_1.CalculateRiceTestDTO]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "calculateRiceTest", null);
__decorate([
    (0, common_1.Post)('save-marshall-dosage/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Salva dosagem Marshall.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Dosagem salva com sucesso.' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, binder_trial_data_dto_1.SaveMarshallDosageDTO]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "saveMarshallDosage", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Deleta dosagem Marshall pelo ID.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Dosagem deletada com sucesso.' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "deleteMarshallDosage", null);
__decorate([
    (0, common_1.Post)('step-3-data'),
    (0, swagger_1.ApiOperation)({ summary: 'Retorna os dados iniciais da terceira tela (composição granulométrica).' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Dados carregados com sucesso.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Dados não encontrados.' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "getStep3Data", null);
__decorate([
    (0, common_1.Post)('calculate-step-3-data'),
    (0, swagger_1.ApiOperation)({ summary: 'Calcula dados da terceira tela (composição granulométrica).' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "calculateStep3Data", null);
__decorate([
    (0, common_1.Post)('save-granulometry-composition-step/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Salva dados da composição granulométrica (step 3).' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "saveGranulometryCompositionStep", null);
__decorate([
    (0, common_1.Post)('calculate-step-4-data'),
    (0, swagger_1.ApiOperation)({ summary: 'Calcula dados do step 4 (binder trial).' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "calculateStep4Data", null);
__decorate([
    (0, common_1.Post)('save-binder-trial-step/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Salva dados do binder trial (step 4).' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "saveBinderTrialStep", null);
__decorate([
    (0, common_1.Post)('save-maximum-mixture-density-step/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Salva dados do máximo de densidade da mistura (step 5).' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Dados salvos com sucesso.' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, save_maximum_mixture_density_data_dto_1.SaveMaximumMixtureDensityDataDTO]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "saveMaximumMixtureDensityData", null);
__decorate([
    (0, common_1.Post)('set-step-6-volumetric-parameters'),
    (0, swagger_1.ApiOperation)({ summary: 'Define parâmetros volumétricos (step 6).' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "setVolumetricParameters", null);
__decorate([
    (0, common_1.Post)('save-volumetric-parameters-step/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Salva parâmetros volumétricos (step 6).' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "saveVolumetricParametersData", null);
__decorate([
    (0, common_1.Post)('set-step-7-optimum-binder'),
    (0, swagger_1.ApiOperation)({ summary: 'Define conteúdo ótimo de ligante (step 7).' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "setOptimumBinderContentData", null);
__decorate([
    (0, common_1.Post)('step-7-plot-dosage-graph'),
    (0, swagger_1.ApiOperation)({ summary: 'Gera gráfico da dosagem do ligante ótimo (step 7).' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "setOptimumBinderContentDosageGraph", null);
__decorate([
    (0, common_1.Post)('step-7-get-expected-parameters'),
    (0, swagger_1.ApiOperation)({ summary: 'Retorna parâmetros esperados do ligante ótimo (step 7).' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "getOptimumBinderExpectedParameters", null);
__decorate([
    (0, common_1.Post)('save-optimum-binder-content-step/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Salva conteúdo ótimo de ligante (step 7).' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "saveOptimumBinderContentData", null);
__decorate([
    (0, common_1.Post)('confirm-specific-gravity'),
    (0, swagger_1.ApiOperation)({ summary: 'Confirma gravidade específica (step 8).' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "confirmSpecificGravity", null);
__decorate([
    (0, common_1.Post)('confirm-volumetric-parameters'),
    (0, swagger_1.ApiOperation)({ summary: 'Confirma parâmetros volumétricos (step 8).' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "confirmVolumetricParameters", null);
__decorate([
    (0, common_1.Post)('save-confirmation-compression-data-step/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Salva dados de compressão confirmada (step 8).' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "saveConfirmationCompressionData", null);
exports.MarshallController = MarshallController = MarshallController_1 = __decorate([
    (0, swagger_1.ApiTags)('marshall'),
    (0, common_1.Controller)('asphalt/dosages/marshall'),
    __metadata("design:paramtypes", [service_1.MarshallService])
], MarshallController);
//# sourceMappingURL=index.js.map