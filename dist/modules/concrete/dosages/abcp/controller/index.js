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
var ABCPController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ABCPController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const service_1 = require("../service");
const abcp_init_dto_1 = require("../dto/abcp-init.dto");
const save_material_selection_dto_1 = require("../dto/save-material-selection.dto");
let ABCPController = ABCPController_1 = class ABCPController {
    constructor(abcpService) {
        this.abcpService = abcpService;
        this.logger = new common_1.Logger(ABCPController_1.name);
    }
    verifyInitABCP(response, body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('verify init abcp > [body]');
            const status = yield this.abcpService.verifyInitABCP(body, userId);
            return response.status(200).json(status);
        });
    }
    getMaterialsByUserId(response, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`get all materials by user id with the abcp essays > [id]: ${userId}`);
            const status = yield this.abcpService.getUserMaterials(userId);
            return response.status(200).json(status);
        });
    }
    saveMaterialSelectionStep(response, body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`save materials selection step in user abcp dosage > [body]: ${body}`);
            const status = yield this.abcpService.saveMaterialSelectionStep(body, userId);
            return response.status(200).json(status);
        });
    }
    getEssaysByUserId(response, data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`get all abcp dosages by user id`);
            const status = yield this.abcpService.getEssaysByMaterials(data);
            return response.status(200).json(status);
        });
    }
    saveEssaySelectionStep(response, body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`save essay selection step in user abcp dosage > [body]: ${body}`);
            const status = yield this.abcpService.saveEssaySelectionStep(body, userId);
            return response.status(200).json(status);
        });
    }
    saveInsertParamsStep(response, body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`save insert params step in user abcp dosage > [body]: ${body}`);
            const status = yield this.abcpService.saveInsertParamsStep(body, userId);
            return response.status(200).json(status);
        });
    }
    getAllByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`get all dosages by user id > [id]: ${userId}`);
            return this.abcpService.getAllDosages(userId);
        });
    }
    getDosageById(dosageId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`get a dosage by dosage id > [id]: ${dosageId}`);
            return this.abcpService.getDosageById(dosageId);
        });
    }
    calculateAbcpDosage(response, data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`get the results of abcp dosage`);
            const status = yield this.abcpService.calculateAbcpDosage(data);
            return response.status(200).json(status);
        });
    }
    saveConcreteEssay(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('save abcp dosage > [body]');
            const abcp = yield this.abcpService.saveDosage(body);
            if (abcp.success)
                this.logger.log('save concrete abcp dosage > [success]');
            else
                this.logger.error('save concrete abcp dosage > [error]');
            return response.status(200).json(abcp);
        });
    }
    deleteDosage(response, dosage_id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('delete abcp dosage > [body]');
            const abcp = yield this.abcpService.deleteDosage(dosage_id);
            return response.status(200).json(abcp);
        });
    }
};
__decorate([
    (0, common_1.Post)('verify-init/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Verifica se é possível criar uma ABCP com os dados enviados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'É possível criar uma ABCP com os dados enviados.',
        content: { 'application/json': { schema: { example: { success: true } } } },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Não é possível criar uma ABCP com os dados enviados.',
        content: {
            'application/json': {
                schema: { example: { success: false, error: { message: 'Internal error.', status: 400, name: 'Error' } } },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao verificar se é possível criar uma ABCP com os dados enviados.' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, abcp_init_dto_1.ABCPInitDto, String]),
    __metadata("design:returntype", Promise)
], ABCPController.prototype, "verifyInitABCP", null);
__decorate([
    (0, common_1.Get)('material-selection/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Retorna todas as dosagens do banco de dados de um usuário, que possuam os ensaios para a dosagem.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Materiais encontrados com sucesso!' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Usuário não encontrado!' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ABCPController.prototype, "getMaterialsByUserId", null);
__decorate([
    (0, common_1.Post)('save-material-selection-step/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, save_material_selection_dto_1.MaterialSelectionDataDto, String]),
    __metadata("design:returntype", Promise)
], ABCPController.prototype, "saveMaterialSelectionStep", null);
__decorate([
    (0, common_1.Post)('essay-selection'),
    (0, swagger_1.ApiOperation)({ summary: 'Retorna todas as dosagens do banco de dados de um usuário, que possuam os ensaios para a dosagem.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Dosagens encontrados com sucesso!' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Usuário não encontrado!' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ABCPController.prototype, "getEssaysByUserId", null);
__decorate([
    (0, common_1.Post)('save-essay-selection-step/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], ABCPController.prototype, "saveEssaySelectionStep", null);
__decorate([
    (0, common_1.Post)('save-insert-params-step/:id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], ABCPController.prototype, "saveInsertParamsStep", null);
__decorate([
    (0, common_1.Get)('all/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Retorna todas as dosagens do banco de dados de um usuário.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Dosagens encontrados com sucesso!' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Usuário não encontrado!' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ABCPController.prototype, "getAllByUserId", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Retorna a dosagem com o id especificado.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Dosagem encontrada com sucesso!' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ABCPController.prototype, "getDosageById", null);
__decorate([
    (0, common_1.Post)('calculate-results'),
    (0, swagger_1.ApiOperation)({ summary: 'Retorna os resultados dos calculos para a dosagem.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Resultados entregues com sucesso!' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ABCPController.prototype, "calculateAbcpDosage", null);
__decorate([
    (0, common_1.Post)('save-dosage'),
    (0, swagger_1.ApiOperation)({ summary: 'Se possível, salva os dados da dosagem abcp de concreto no banco de dados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Dados da dosagem abcp de concreto salvos com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'dosage data' } } } },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Não foi possível salvar os dados da dosagem abcp de concreto no banco de dados.',
        content: {
            'application/json': {
                schema: {
                    example: {
                        success: false,
                        error: { message: 'ABCP dosage with name "ABCP 1" from user "User 1"', status: 400, name: 'AlreadyExists' },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao salvar os dados da dosagem abcp de concreto no banco de dados.' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ABCPController.prototype, "saveConcreteEssay", null);
__decorate([
    (0, common_1.Delete)('/:dosage_id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('dosage_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ABCPController.prototype, "deleteDosage", null);
ABCPController = ABCPController_1 = __decorate([
    (0, swagger_1.ApiTags)('abcp'),
    (0, common_1.Controller)('concrete/dosages/abcp'),
    __metadata("design:paramtypes", [service_1.ABCPService])
], ABCPController);
exports.ABCPController = ABCPController;
//# sourceMappingURL=index.js.map