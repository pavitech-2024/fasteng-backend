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
var SuperpaveController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuperpaveController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const service_1 = require("../service");
const superpave_init_dto_1 = require("../dto/superpave-init.dto");
let SuperpaveController = SuperpaveController_1 = class SuperpaveController {
    constructor(superpaveService) {
        this.superpaveService = superpaveService;
        this.logger = new common_1.Logger(SuperpaveController_1.name);
    }
    getAllByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`get all dosages by user id > [id]: ${userId}`);
            return this.superpaveService.getAllDosages(userId);
        });
    }
    verifyInitSuperpave(response, body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('verify init Superpave > [body]');
            const status = yield this.superpaveService.verifyInitSuperpave(body, userId);
            return response.status(200).json(status);
        });
    }
    calculateGranulometryEssaysData(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`calculate granulometry essays of granulometry essay data step > [body]: ${body}`);
            const status = yield this.superpaveService.calculateGranulometryEssayData(body);
            return response.status(200).json(status);
        });
    }
    saveGranulometryEssayStep(response, body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`save granulometry essay data step in user superpave dosage > [body]: ${body}`);
            const status = yield this.superpaveService.saveGranulometryEssayStep(body, userId);
            return response.status(200).json(status);
        });
    }
    getMaterialsByUserId(response, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`get all materials, by user id, with the necessary dosage essays > [id]: ${userId}`);
            const status = yield this.superpaveService.getUserMaterials(userId);
            return response.status(200).json(status);
        });
    }
    getDosageById(response, dosageId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`get all materials, by user id, with the necessary dosage essays > [id]: ${dosageId}`);
            this.logger.log(`get a dosage by dosage id > [id]: ${dosageId}`);
            const status = yield this.superpaveService.getDosageById(dosageId);
            return response.status(200).json(status);
        });
    }
    saveMaterialSelectionStep(response, body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`save materials selection step in user superpave dosage > [body]: ${body}`);
            const status = yield this.superpaveService.saveMaterialSelectionStep(body, userId);
            return response.status(200).json(status);
        });
    }
    getStep3Data(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`get granulometric composition data > [body]: ${body}`);
            const status = yield this.superpaveService.getGranulometricCompositionData(body);
            return response.status(200).json(status);
        });
    }
    calculateStep3Data(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`calculate granulometric composition data > [body]: ${body}`);
            const status = yield this.superpaveService.calculateGranulometricCompositionData(body);
            return response.status(200).json(status);
        });
    }
    saveGranulometryCompositionStep(response, userId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`save step 4 data > [body]: ${body}`);
            const status = yield this.superpaveService.saveStep4Data(body, userId);
            return response.status(200).json(status);
        });
    }
    getStep5SpecificMasses(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`get first compression specific masses data > [body]: ${body}`);
            const status = yield this.superpaveService.getFirstCompressionSpecificMasses(body);
            return response.status(200).json(status);
        });
    }
    calculateStep5Data(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`calculate step 5 data > [body]: ${body}`);
            const status = yield this.superpaveService.calculateStep5Data(body);
            return response.status(200).json(status);
        });
    }
    saveInitialBinderStep(response, userId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`save step 5 data > [body]: ${body}`);
            const status = yield this.superpaveService.saveInitialBinderStep(body, userId);
            return response.status(200).json(status);
        });
    }
    calculateRiceTest(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`calculate rice test data > [body]: ${body}`);
            const status = yield this.superpaveService.calculateGmm(body);
            return response.status(200).json(status);
        });
    }
    saveFirstCompressionData(response, userId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`save first compression data > [body]: ${body}`);
            const status = yield this.superpaveService.saveFirstCompressionData(body, userId);
            return response.status(200).json(status);
        });
    }
    getFirstCompressionParametersData(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`get first compression parameters data > [body]: ${body}`);
            const status = yield this.superpaveService.getFirstCompressionParametersData(body);
            return response.status(200).json(status);
        });
    }
    saveStep6Data(response, userId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`save percents of chosen curve data > [body]: ${body}`);
            const status = yield this.superpaveService.savePercentsOfChosenCurveData(body, userId);
            return response.status(200).json(status);
        });
    }
    getStep7Parameters(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`get step 7 data > [body]: ${body}`);
            const status = yield this.superpaveService.getStep7Parameters(body);
            return response.status(200).json(status);
        });
    }
    saveStep7Data(response, userId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`save step 7 data > [body]: ${body}`);
            const status = yield this.superpaveService.saveStep7Data(body, userId);
            return response.status(200).json(status);
        });
    }
    calculateStep7RiceTest(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`calculate step 5 rice test data > [body]: ${body}`);
            const status = yield this.superpaveService.calculateStep7RiceTest(body);
            return response.status(200).json(status);
        });
    }
    calculateStep7Gmm(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`calculate step 5 gmm data > [body]: ${body}`);
            const status = yield this.superpaveService.calculateStep7Gmm(body);
            return response.status(200).json(status);
        });
    }
    calculateSecondCompressionData(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`calculate second compression data > [body]: ${body}`);
            const status = yield this.superpaveService.calculateSecondCompressionData(body);
            return response.status(200).json(status);
        });
    }
    saveStep8Data(response, userId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`save step 8 data > [body]: ${body}`);
            return response.status(200).json(status);
        });
    }
    getSecondCompressionPercentageData(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`get second compression percentage data > [body]: ${body}`);
            const status = yield this.superpaveService.getSecondCompressionPercentageData(body);
            return response.status(200).json(status);
        });
    }
    saveStep9Data(response, userId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`save step 9 data > [body]: ${body}`);
            const status = yield this.superpaveService.saveStep9Data(body, userId);
            return response.status(200).json(status);
        });
    }
    calculateStep9RiceTest(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`calculate dosage equation > [body]: ${body}`);
            const status = yield this.superpaveService.calculateStep9RiceTest(body);
            return response.status(200).json(status);
        });
    }
    calculateVolumetricParametersOfConfirmGranulometryComposition(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`calculate dosage equation > [body]: ${body}`);
            const status = yield this.superpaveService.calculateVolumetricParametersOfConfirmGranulometryComposition(body);
            return response.status(200).json(status);
        });
    }
    saveStep10Data(response, userId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`save step 10 data > [body]: ${body}`);
            const status = yield this.superpaveService.saveStep10Data(body, userId);
            return response.status(200).json(status);
        });
    }
    saveSuperpaveDosage(response, userId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`save superpave dosage > [body]: ${body}`);
            const status = yield this.superpaveService.saveSuperpaveDosage(body, userId);
            return response.status(200).json(status);
        });
    }
    deleteMarshallDosage(response, id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`delete superpave dosage > [body]: ${id}`);
            const status = yield this.superpaveService.deleteSuperpaveDosage(id);
            return response.status(200).json(status);
        });
    }
};
exports.SuperpaveController = SuperpaveController;
__decorate([
    (0, common_1.Get)('all/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Retorna todas as dosagens do banco de dados de um usuário.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Dosagens encontrados com sucesso!' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Usuário não encontrado!' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SuperpaveController.prototype, "getAllByUserId", null);
__decorate([
    (0, common_1.Post)('verify-init/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Verifica se é possível criar uma Superpave com os dados enviados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'É possível criar uma Superpave com os dados enviados.',
        content: { 'application/json': { schema: { example: { success: true } } } },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Não é possível criar uma Superpave com os dados enviados.',
        content: {
            'application/json': {
                schema: { example: { success: false, error: { message: 'Internal error.', status: 400, name: 'Error' } } },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Erro ao verificar se é possível criar uma Superpave com os dados enviados.',
    }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, superpave_init_dto_1.SuperpaveInitDto, String]),
    __metadata("design:returntype", Promise)
], SuperpaveController.prototype, "verifyInitSuperpave", null);
__decorate([
    (0, common_1.Post)('calculate-granulometry-essay-data'),
    (0, swagger_1.ApiOperation)({ summary: 'Calcula os ensaios de granulometria.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Ensaios de granulometria calculados com sucesso!',
        content: { 'application/json': { schema: { example: { success: true } } } },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Erro ao calcular os ensaios de granulometria.',
        content: {
            'application/json': {
                schema: { example: { success: false, error: { message: 'Internal error.', status: 400, name: 'Error' } } },
            },
        },
    }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SuperpaveController.prototype, "calculateGranulometryEssaysData", null);
__decorate([
    (0, common_1.Post)('save-granulometry-essay-step/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], SuperpaveController.prototype, "saveGranulometryEssayStep", null);
__decorate([
    (0, common_1.Get)('material-selection/:id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Retorna todos os materiais do banco de dados de um usuário, que possuam os ensaios para a dosagem.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Materiais encontrados com sucesso!' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Usuário não encontrado!' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SuperpaveController.prototype, "getMaterialsByUserId", null);
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
], SuperpaveController.prototype, "getDosageById", null);
__decorate([
    (0, common_1.Post)('save-material-selection-step/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], SuperpaveController.prototype, "saveMaterialSelectionStep", null);
__decorate([
    (0, common_1.Post)('get-granulometric-composition-data'),
    (0, swagger_1.ApiOperation)({
        summary: 'Retorna os dados iniciais necessários para a etapa de composição granulometrica da dosagem',
    }),
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
], SuperpaveController.prototype, "getStep3Data", null);
__decorate([
    (0, common_1.Post)('calculate-granulometric-composition-data'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SuperpaveController.prototype, "calculateStep3Data", null);
__decorate([
    (0, common_1.Post)('save-granulometry-composition-step/:userId'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], SuperpaveController.prototype, "saveGranulometryCompositionStep", null);
__decorate([
    (0, common_1.Post)('get-first-compression-specific-masses'),
    (0, swagger_1.ApiOperation)({
        summary: 'Retorna os dados iniciais necessários para a tela de Primeira Compactação da dosagem',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Dados carregados com sucesso!',
        content: { 'application/json': { schema: { example: { data: {}, success: true } } } },
    }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SuperpaveController.prototype, "getStep5SpecificMasses", null);
__decorate([
    (0, common_1.Post)('calculate-step-5-data'),
    (0, swagger_1.ApiOperation)({ summary: 'Calcula os dados inseridos para a quarta tela (teor de ligante inicial) da dosagem' }),
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
], SuperpaveController.prototype, "calculateStep5Data", null);
__decorate([
    (0, common_1.Post)('save-initial-binder-step/:userId'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], SuperpaveController.prototype, "saveInitialBinderStep", null);
__decorate([
    (0, common_1.Post)('calculate-gmm'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SuperpaveController.prototype, "calculateRiceTest", null);
__decorate([
    (0, common_1.Post)('save-first-compression-step/:userId'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], SuperpaveController.prototype, "saveFirstCompressionData", null);
__decorate([
    (0, common_1.Post)('get-first-compression-parameters'),
    (0, swagger_1.ApiOperation)({
        summary: 'Retorna os dados iniciais necessários para a tela de parâmetros da primiera compactaão da dosagem',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Dados carregados com sucesso!',
        content: { 'application/json': { schema: { example: { data: {}, success: true } } } },
    }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SuperpaveController.prototype, "getFirstCompressionParametersData", null);
__decorate([
    (0, common_1.Post)('save-percents-of-chosen-curve-step/:userId'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], SuperpaveController.prototype, "saveStep6Data", null);
__decorate([
    (0, common_1.Post)('calculate-chosen-curve-percentages'),
    (0, swagger_1.ApiOperation)({
        summary: 'Calcula os dados da sétima tela (porcentagens da curva escolhida) da dosagem',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Dados carregados com sucesso!',
        content: { 'application/json': { schema: { example: { data: {}, success: true } } } },
    }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SuperpaveController.prototype, "getStep7Parameters", null);
__decorate([
    (0, common_1.Post)('save-chosen-curve-percentage-step/:userId'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], SuperpaveController.prototype, "saveStep7Data", null);
__decorate([
    (0, common_1.Post)('calculate-step-7-rice-test'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SuperpaveController.prototype, "calculateStep7RiceTest", null);
__decorate([
    (0, common_1.Post)('calculate-step-7-gmm'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SuperpaveController.prototype, "calculateStep7Gmm", null);
__decorate([
    (0, common_1.Post)('confirm-second-compression-data'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SuperpaveController.prototype, "calculateSecondCompressionData", null);
__decorate([
    (0, common_1.Post)('save-second-compression-data-step/:userId'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], SuperpaveController.prototype, "saveStep8Data", null);
__decorate([
    (0, common_1.Post)('get-second-compression-percentage-data'),
    (0, swagger_1.ApiOperation)({
        summary: 'Retorna os dados iniciais necessários para a tela de porcentagens da segunda compactação da dosagem',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Dados carregados com sucesso!',
        content: { 'application/json': { schema: { example: { data: {}, success: true } } } },
    }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SuperpaveController.prototype, "getSecondCompressionPercentageData", null);
__decorate([
    (0, common_1.Post)('save-second-compression-params-step/:userId'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], SuperpaveController.prototype, "saveStep9Data", null);
__decorate([
    (0, common_1.Post)('calculate-step-9-rice-test'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SuperpaveController.prototype, "calculateStep9RiceTest", null);
__decorate([
    (0, common_1.Post)('calculate-dosage-equation'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SuperpaveController.prototype, "calculateVolumetricParametersOfConfirmGranulometryComposition", null);
__decorate([
    (0, common_1.Post)('save-confirmattion-compression-step/:userId'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], SuperpaveController.prototype, "saveStep10Data", null);
__decorate([
    (0, common_1.Post)('save-superpave-dosage/:userId'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], SuperpaveController.prototype, "saveSuperpaveDosage", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SuperpaveController.prototype, "deleteMarshallDosage", null);
exports.SuperpaveController = SuperpaveController = SuperpaveController_1 = __decorate([
    (0, swagger_1.ApiTags)('superpave'),
    (0, common_1.Controller)('asphalt/dosages/superpave'),
    __metadata("design:paramtypes", [service_1.SuperpaveService])
], SuperpaveController);
//# sourceMappingURL=index.js.map