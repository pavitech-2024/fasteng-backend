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
var StabilizedLayersSamplesController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StabilizedLayersSamplesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const schemas_1 = require("../schemas");
const stabilized_layers_samples_service_1 = require("../service/stabilized-layers-samples.service");
const create_stabilized_layers_sample_dto_1 = require("../dto/create-stabilized-layers-sample.dto");
const queryFilter_1 = require("../../../../../utils/queryFilter");
let StabilizedLayersSamplesController = StabilizedLayersSamplesController_1 = class StabilizedLayersSamplesController {
    constructor(stabilizedLayersSamplesService) {
        this.stabilizedLayersSamplesService = stabilizedLayersSamplesService;
        this.logger = new common_1.Logger(StabilizedLayersSamplesController_1.name);
    }
    createSample(sample) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('create stabilized layers sample > [body]');
            try {
                const createdSample = yield this.stabilizedLayersSamplesService.createSample(sample);
                if (createdSample) {
                    this.logger.log(`granular layer sample created > [id]: ${createdSample._id}`);
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
    getAllSamples() {
        return __awaiter(this, arguments, void 0, function* (page = 1, limit = 10) {
            this.logger.log(`get all samples`);
            return this.stabilizedLayersSamplesService.getAllSamples({ page, limit });
        });
    }
    getSamplesByFilter(queryFilter) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`get samples by filter > [filter]: ${queryFilter}`);
            return this.stabilizedLayersSamplesService.getSamplesByFilter(queryFilter);
        });
    }
    getSampleById(sampleId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`get sample by id > [id]: ${sampleId}`);
            return this.stabilizedLayersSamplesService.getSample(sampleId);
        });
    }
    updateSampleById(sampleId, sample) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`update sample by id > [id]: ${sampleId}`);
            return this.stabilizedLayersSamplesService.updateSample(sample);
        });
    }
    deleteSampleById(sampleId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`delete sample by id > [id]: ${sampleId}`);
            return this.stabilizedLayersSamplesService.deleteSample(sampleId);
        });
    }
};
exports.StabilizedLayersSamplesController = StabilizedLayersSamplesController;
__decorate([
    (0, common_1.Post)('save'),
    (0, swagger_1.ApiOperation)({ summary: 'Cria uma amostra de camadas estabilizadas no banco de dados.' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Amostra de camadas estabilizadas criada com sucesso!' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao criar amostra de camadas estabilizadas!' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_stabilized_layers_sample_dto_1.CreateStabilizedLayersSampleDto]),
    __metadata("design:returntype", Promise)
], StabilizedLayersSamplesController.prototype, "createSample", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, swagger_1.ApiOperation)({ summary: 'Retorna todas as amostras de camadas stabilizadas do banco de dados.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Amostras de camadas stabilizadas encontradas com sucesso!' }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], StabilizedLayersSamplesController.prototype, "getAllSamples", null);
__decorate([
    (0, common_1.Get)('/filter'),
    (0, swagger_1.ApiOperation)({ summary: 'Retorna as amostras filtradas de camadas estabilizadas do banco de dados.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Amostras filtradas de camadas estabilizadas encontradas com sucesso!' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Amostras filtradas não encontradas!' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [queryFilter_1.CommonQueryFilter]),
    __metadata("design:returntype", Promise)
], StabilizedLayersSamplesController.prototype, "getSamplesByFilter", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Retorna uma amostra de camadas estabilizadas do banco de dados.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Amostra de camadas estabilizadas encontrada com sucesso!' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Amostra de camadas estabilizadas não encontrada!' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StabilizedLayersSamplesController.prototype, "getSampleById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualiza uma amostra de camadas estabilizadas do banco de dados.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Amostra de camadas estabilizadas atualizada com sucesso!' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Amostra de camadas estabilizadas não encontrada!' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, schemas_1.StabilizedLayers_Sample]),
    __metadata("design:returntype", Promise)
], StabilizedLayersSamplesController.prototype, "updateSampleById", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Deleta uma amostra de camadas estabilizadas do banco de dados.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Amostra de camadas estabilizadas deletada com sucesso!' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Amostra de camadas estabilizadas não encontrada!' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StabilizedLayersSamplesController.prototype, "deleteSampleById", null);
exports.StabilizedLayersSamplesController = StabilizedLayersSamplesController = StabilizedLayersSamplesController_1 = __decorate([
    (0, swagger_1.ApiTags)('samples'),
    (0, common_1.Controller)('promedina/stabilized-layers/stabilized-layers-samples'),
    __metadata("design:paramtypes", [stabilized_layers_samples_service_1.StabilizedLayersSamplesService])
], StabilizedLayersSamplesController);
//# sourceMappingURL=index.js.map