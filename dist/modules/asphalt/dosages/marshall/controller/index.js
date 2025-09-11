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
            this.logger.log(`get all dosages by user id > [id]: ${userId}`);
            return this.marshallService.getAllDosages(userId);
        });
    }
    verifyInitMarshall(response, body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('verify init Marshall > [body]');
            const status = yield this.marshallService.verifyInitMarshall(body, userId);
            return response.status(200).json(status);
        });
    }
    getMaterialsByUserId(response, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`get all materials, by user id, with the necessary dosage essays > [id]: ${userId}`);
            const status = yield this.marshallService.getUserMaterials(userId);
            return response.status(200).json(status);
        });
    }
    getDosageById(response, dosageId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`get all materials, by user id, with the necessary dosage essays > [id]: ${dosageId}`);
            const status = yield this.marshallService.getDosageById(dosageId);
            return response.status(200).json(status);
        });
    }
    saveMaterialSelectionStep(response, body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`save materials selection step in user marshall dosage > [body]: ${body}`);
            const status = yield this.marshallService.saveMaterialSelectionStep(body, userId);
            return response.status(200).json(status);
        });
    }
    getStep3Data(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`get step 3 data > [body]: ${body}`);
            const status = yield this.marshallService.getStep3Data(body);
            return response.status(200).json(status);
        });
    }
    calculateGranulometry(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`calculate granulometry data > [body]: ${body}`);
            const status = yield this.marshallService.calculateGranulometry(body);
            return response.status(200).json(status);
        });
    }
    saveGranulometryCompositionStep(response, userId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`save step 3 data > [body]: ${body}`);
            const status = yield this.marshallService.saveStep3Data(body, userId);
            return response.status(200).json(status);
        });
    }
    calculateStep4Data(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`calculate step 4 data > [body]: ${body}`);
            const status = yield this.marshallService.calculateStep4Data(body);
            return response.status(200).json(status);
        });
    }
    saveBinderTrialStep(response, userId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`save step 4 data > [body]: ${body}`);
            const status = yield this.marshallService.saveStep4Data(body, userId);
            return response.status(200).json(status);
        });
    }
    getIndexesOfMissesSpecificGravity(response, aggregates) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`get specific mass indexes - step 5 > [body]: ${aggregates}`);
            const status = yield this.marshallService.getIndexesOfMissesSpecificGravity(aggregates);
            return response.status(200).json(status);
        });
    }
    calculateDmtData(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`calculate step 5 dmt data > [body]: ${body}`);
            const status = yield this.marshallService.calculateDmtData(body);
            return response.status(200).json(status);
        });
    }
    calculateGmmData(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`calculate step 5 gmm data > [body]: ${body}`);
            const status = yield this.marshallService.calculateGmmData(body);
            return response.status(200).json(status);
        });
    }
    calculateRiceTest(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`calculate maximum mixture density step rice test > [body]: ${body}`);
            const status = yield this.marshallService.calculateRiceTest(body.riceTest);
            return response.status(200).json(status);
        });
    }
    saveMaximumMixtureDensityData(response, userId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`save maximum mixture density data > [body]: ${body}`);
            const status = yield this.marshallService.saveMistureMaximumDensityData(body, userId);
            return response.status(200).json(status);
        });
    }
    setVolumetricParameters(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`set step 6 volumetric parameters > [body]: ${body}`);
            const status = yield this.marshallService.setVolumetricParameters(body);
            return response.status(200).json(status);
        });
    }
    saveVolumetricParametersData(response, userId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`save volumetric parameters data > [body]: ${body}`);
            const status = yield this.marshallService.saveVolumetricParametersData(body, userId);
            return response.status(200).json(status);
        });
    }
    setOptimumBinderContentData(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`set step 7 optimum binder content > [body]: ${body}`);
            const status = yield this.marshallService.setOptimumBinderContentData(body);
            return response.status(200).json(status);
        });
    }
    setOptimumBinderContentDosageGraph(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`set step 7 optimum binder content > [body]: ${body}`);
            const status = yield this.marshallService.setOptimumBinderContentDosageGraph(body);
            return response.status(200).json(status);
        });
    }
    getOptimumBinderExpectedParameters(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`set step 7 optimum binder expected parameters > [body]: ${body}`);
            const status = yield this.marshallService.getOptimumBinderExpectedParameters(body);
            return response.status(200).json(status);
        });
    }
    saveOptimumBinderContentData(response, userId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`save step 7 data > [body]: ${body}`);
            const status = yield this.marshallService.saveStep7Data(body, userId);
            return response.status(200).json(status);
        });
    }
    confirmSpecificGravity(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`confirm step 8 specific gravity > [body]: ${body}`);
            const status = yield this.marshallService.confirmSpecificGravity(body);
            return response.status(200).json(status);
        });
    }
    confirmVolumetricParameters(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`confirm step 8volumetric parameters > [body]: ${body}`);
            const status = yield this.marshallService.confirmVolumetricParameters(body);
            return response.status(200).json(status);
        });
    }
    saveConfirmationCompressionData(response, userId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`save step 7 data > [body]: ${body}`);
            const status = yield this.marshallService.saveStep8Data(body, userId);
            return response.status(200).json(status);
        });
    }
    saveMarshallDosage(response, userId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`save marshall dosage > [body]: ${body}`);
            const status = yield this.marshallService.saveMarshallDosage(body, userId);
            return response.status(200).json(status);
        });
    }
    deleteMarshallDosage(response, id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`delete marshall dosage > [body]: ${id}`);
            const status = yield this.marshallService.deleteMarshallDosage(id);
            return response.status(200).json(status);
        });
    }
};
__decorate([
    (0, common_1.Get)('all/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Retorna todas as dosagens Marshall do banco de dados de um usuário.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Dosagens encontradas com sucesso!' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Usuário não encontrado!' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "getAllByUserId", null);
__decorate([
    (0, common_1.Post)('verify-init/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Verifica se é possível criar uma dosagem Marshall com os dados enviados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'É possível criar uma dosagem Marshall com os dados enviados.',
        content: { 'application/json': { schema: { example: { success: true } } } },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Não é possível criar uma Marshall com os dados enviados.',
        content: {
            'application/json': {
                schema: { example: { success: false, error: { message: 'Internal error.', status: 400, name: 'Error' } } },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao verificar se é possível criar uma Marshall com os dados enviados.' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, marshall_init_dto_1.MarshallInitDto, String]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "verifyInitMarshall", null);
__decorate([
    (0, common_1.Get)('material-selection/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Retorna todos os materiais do banco de dados de um usuário, que possuam os ensaios para a dosagem.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Materiais encontrados com sucesso!' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Usuário não encontrado!' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "getMaterialsByUserId", null);
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
    (0, common_1.Post)('save-material-selection-step/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "saveMaterialSelectionStep", null);
__decorate([
    (0, common_1.Post)('step-3-data'),
    (0, swagger_1.ApiOperation)({ summary: 'Retorna os dados iniciais necessários para a terceira tela (composição granulométrica) da dosagem' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Dados carregados com sucesso!',
        content: { 'application/json': { schema: { example: { data: {}, success: true } } } },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Dados não encontrados!' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "getStep3Data", null);
__decorate([
    (0, common_1.Post)('calculate-granulometry'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "calculateGranulometry", null);
__decorate([
    (0, common_1.Post)('save-granulometry-composition-step/:userId'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "saveGranulometryCompositionStep", null);
__decorate([
    (0, common_1.Post)('calculate-step-4-data'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "calculateStep4Data", null);
__decorate([
    (0, common_1.Post)('save-binder-trial-step/:userId'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "saveBinderTrialStep", null);
__decorate([
    (0, common_1.Post)('get-specific-mass-indexes'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "getIndexesOfMissesSpecificGravity", null);
__decorate([
    (0, common_1.Post)('calculate-step-5-dmt-data'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "calculateDmtData", null);
__decorate([
    (0, common_1.Post)('calculate-step-5-gmm-data'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "calculateGmmData", null);
__decorate([
    (0, common_1.Post)('calculate-step-5-rice-test'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "calculateRiceTest", null);
__decorate([
    (0, common_1.Post)('save-maximum-mixture-density-step/:userId'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "saveMaximumMixtureDensityData", null);
__decorate([
    (0, common_1.Post)('set-step-6-volumetric-parameters'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "setVolumetricParameters", null);
__decorate([
    (0, common_1.Post)('save-volumetric-parameters-step/:userId'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "saveVolumetricParametersData", null);
__decorate([
    (0, common_1.Post)('set-step-7-optimum-binder'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "setOptimumBinderContentData", null);
__decorate([
    (0, common_1.Post)('step-7-plot-dosage-graph'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "setOptimumBinderContentDosageGraph", null);
__decorate([
    (0, common_1.Post)('step-7-get-expected-parameters'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "getOptimumBinderExpectedParameters", null);
__decorate([
    (0, common_1.Post)('save-optimum-binder-content-step/:userId'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "saveOptimumBinderContentData", null);
__decorate([
    (0, common_1.Post)('confirm-specific-gravity'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "confirmSpecificGravity", null);
__decorate([
    (0, common_1.Post)('confirm-volumetric-parameters'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "confirmVolumetricParameters", null);
__decorate([
    (0, common_1.Post)('save-confirmation-compression-data-step/:userId'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "saveConfirmationCompressionData", null);
__decorate([
    (0, common_1.Post)('save-marshall-dosage/:userId'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "saveMarshallDosage", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], MarshallController.prototype, "deleteMarshallDosage", null);
MarshallController = MarshallController_1 = __decorate([
    (0, swagger_1.ApiTags)('marshall'),
    (0, common_1.Controller)('asphalt/dosages/marshall'),
    __metadata("design:paramtypes", [service_1.MarshallService])
], MarshallController);
exports.MarshallController = MarshallController;
//# sourceMappingURL=index.js.map