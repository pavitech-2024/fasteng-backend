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
var BinderAsphaltConcreteSamplesController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinderAsphaltConcreteSamplesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const schemas_1 = require("../schemas");
const binder_asphalt_concrete_samples_service_1 = require("../service/binder-asphalt-concrete-samples.service");
const create_binder_asphalt_concrete_samples_dto_1 = require("../dto/create-binder-asphalt-concrete-samples.dto");
const queryFilter_1 = require("../../../../../utils/queryFilter");
let BinderAsphaltConcreteSamplesController = BinderAsphaltConcreteSamplesController_1 = class BinderAsphaltConcreteSamplesController {
    constructor(binderAsphaltConcreteSamplesService) {
        this.binderAsphaltConcreteSamplesService = binderAsphaltConcreteSamplesService;
        this.logger = new common_1.Logger(BinderAsphaltConcreteSamplesController_1.name);
    }
    createSample(sample) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('create binder/concrete sample > [body]');
            try {
                const createdSample = yield this.binderAsphaltConcreteSamplesService.createSample(sample);
                if (createdSample) {
                    this.logger.log(`Binder/concrete sample created > [id]: ${createdSample._id}`);
                    return createdSample;
                }
            }
            catch (error) {
                if (error instanceof common_1.HttpException) {
                    const response = error.getResponse();
                    return { success: false, error: { name: 'SampleCreationError', message: response['error'] } };
                }
                this.logger.error(`Error on create sample > [error]: ${error}`);
                throw error;
            }
        });
    }
    getSamplesByFilter(queryFilter) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`get samples by filter > [filter]: ${queryFilter}`);
            return this.binderAsphaltConcreteSamplesService.getSamplesByFilter(queryFilter);
        });
    }
    getAllSamples(page = 1, limit = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`get all samples`);
            return this.binderAsphaltConcreteSamplesService.getAllSamples({ page, limit });
        });
    }
    getSampleById(sampleId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`get sample by id > [id]: ${sampleId}`);
            return this.binderAsphaltConcreteSamplesService.getSample(sampleId);
        });
    }
    updateSampleById(sampleId, sample) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`update sample by id > [id]: ${sampleId}`);
            return this.binderAsphaltConcreteSamplesService.updateSample(sample);
        });
    }
    deleteSampleById(sampleId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`delete sample by id > [id]: ${sampleId}`);
            return this.binderAsphaltConcreteSamplesService.deleteSample(sampleId);
        });
    }
};
__decorate([
    (0, common_1.Post)('save'),
    (0, swagger_1.ApiOperation)({ summary: 'Cria uma amostra de ligante asfáltico/concreto no banco de dados.' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Amostra de ligante asfáltico/concreto criada com sucesso!' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao criar amostra de ligante asfáltico/concreto!' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_binder_asphalt_concrete_samples_dto_1.CreateBinderAsphaltConcreteSampleDto]),
    __metadata("design:returntype", Promise)
], BinderAsphaltConcreteSamplesController.prototype, "createSample", null);
__decorate([
    (0, common_1.Get)('/filter'),
    (0, swagger_1.ApiOperation)({ summary: 'Retorna amostras filtradas de ligantes asfálticos/concreto do banco de dados.' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Amostras filtradas de ligantes asfálticos/concreto criadas com sucesso!' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao criar amostra de ligantes asfálticos/concreto!' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [queryFilter_1.CommonQueryFilter]),
    __metadata("design:returntype", Promise)
], BinderAsphaltConcreteSamplesController.prototype, "getSamplesByFilter", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, swagger_1.ApiOperation)({ summary: 'Retorna todas as amostras de ligante asfáltico/concreto do banco de dados.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Amostras de ligante asfáltico/concreto encontradas com sucesso!' }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], BinderAsphaltConcreteSamplesController.prototype, "getAllSamples", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Retorna uma amostra de ligante asfáltico/concreto do banco de dados.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Amostra de ligante asfáltico/concreto encontrada com sucesso!' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Amostra de ligante asfáltico/concreto não encontrada!' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BinderAsphaltConcreteSamplesController.prototype, "getSampleById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualiza uma amostra de ligante asfáltico/concreto do banco de dados.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Amostra de ligante asfáltico/concreto atualizada com sucesso!' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Amostra de ligante asfáltico/concreto não encontrada!' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, schemas_1.BinderAsphaltConcrete_Sample]),
    __metadata("design:returntype", Promise)
], BinderAsphaltConcreteSamplesController.prototype, "updateSampleById", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Deleta uma amostra de ligante asfáltico/concreto do banco de dados.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Amostra de ligante asfáltico/concreto deletada com sucesso!' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Amostra de ligante asfáltico/concreto não encontrada!' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BinderAsphaltConcreteSamplesController.prototype, "deleteSampleById", null);
BinderAsphaltConcreteSamplesController = BinderAsphaltConcreteSamplesController_1 = __decorate([
    (0, swagger_1.ApiTags)('samples'),
    (0, common_1.Controller)('promedina/binder-asphalt-concrete/binder-asphalt-concrete-samples'),
    __metadata("design:paramtypes", [binder_asphalt_concrete_samples_service_1.BinderAsphaltConcreteSamplesService])
], BinderAsphaltConcreteSamplesController);
exports.BinderAsphaltConcreteSamplesController = BinderAsphaltConcreteSamplesController;
//# sourceMappingURL=index.js.map