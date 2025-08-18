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
var SamplesController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SamplesController = void 0;
const common_1 = require("@nestjs/common");
const service_1 = require("../service");
const swagger_1 = require("@nestjs/swagger");
const schemas_1 = require("../schemas");
const user_decorator_1 = require("../../../../config/decorators/user.decorator");
const create_sample_dto_1 = require("../dto/create-sample.dto");
let SamplesController = SamplesController_1 = class SamplesController {
    constructor(samplesService) {
        this.samplesService = samplesService;
        this.logger = new common_1.Logger(SamplesController_1.name);
    }
    createSample(sample, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('create sample > [body]');
            const createdSample = yield this.samplesService.createSample(sample, userId);
            if (createdSample)
                this.logger.log(`sample created > [id]: ${createdSample._id}`);
            return createdSample;
        });
    }
    getAllByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`get all samples by user id > [id]: ${userId}`);
            return this.samplesService.getAllSamples(userId).then(samples => ([{
                    materials: samples,
                }]));
        });
    }
    getSampleById(sampleId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`get sample by id > [id]: ${sampleId}`);
            return this.samplesService.getSample(sampleId);
        });
    }
    updateSampleById(sampleId, sample) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`update sample by id > [id]: ${sampleId}`);
            return this.samplesService.updateSample(sample);
        });
    }
    deleteSampleById(sampleId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`delete sample by id > [id]: ${sampleId}`);
            return this.samplesService.deleteSample(sampleId);
        });
    }
};
exports.SamplesController = SamplesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Cria uma amostra no banco de dados.' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Amostra criada com sucesso!' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao criar amostra!' }),
    (0, swagger_1.ApiBody)({ type: create_sample_dto_1.CreateSampleDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sample_dto_1.CreateSampleDto, String]),
    __metadata("design:returntype", Promise)
], SamplesController.prototype, "createSample", null);
__decorate([
    (0, common_1.Get)('all/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Retorna todas as amostras do banco de dados de um usuário.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Amostras encontradas com sucesso!' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Usuário não encontrado!' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SamplesController.prototype, "getAllByUserId", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Retorna uma amostra do banco de dados.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Amostra encontrada com sucesso!' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Amostra não encontrada!' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SamplesController.prototype, "getSampleById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualiza uma amostra do banco de dados.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Amostra atualizada com sucesso!' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Amostra não encontrada!' }),
    (0, swagger_1.ApiBody)({ type: create_sample_dto_1.CreateSampleDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, schemas_1.Sample]),
    __metadata("design:returntype", Promise)
], SamplesController.prototype, "updateSampleById", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Deleta uma amostra do banco de dados.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Amostra deletada com sucesso!' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Amostra não encontrada!' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SamplesController.prototype, "deleteSampleById", null);
exports.SamplesController = SamplesController = SamplesController_1 = __decorate([
    (0, swagger_1.ApiTags)('samples'),
    (0, common_1.Controller)('soils/samples'),
    __metadata("design:paramtypes", [service_1.SamplesService])
], SamplesController);
//# sourceMappingURL=index.js.map