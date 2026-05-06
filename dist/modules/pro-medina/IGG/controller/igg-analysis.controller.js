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
var IggAnalysisController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IggAnalysisController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const igg_analysis_service_1 = require("../service/igg-analysis.service");
const create_igg_analysis_dto_1 = require("../dto/create-igg-analysis.dto");
const update_igg_analysis_dto_1 = require("../dto/update-igg-analysis.dto");
let IggAnalysisController = IggAnalysisController_1 = class IggAnalysisController {
    constructor(iggAnalysisService) {
        this.iggAnalysisService = iggAnalysisService;
        this.logger = new common_1.Logger(IggAnalysisController_1.name);
    }
    create(createIggAnalysisDto) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('create igg analysis > [body]');
            return this.iggAnalysisService.create(createIggAnalysisDto);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.iggAnalysisService.findAll();
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.iggAnalysisService.findOne(id);
        });
    }
    update(id, updateIggAnalysisDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.iggAnalysisService.update(id, updateIggAnalysisDto);
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.iggAnalysisService.remove(id);
        });
    }
    processAnalysis(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.iggAnalysisService.processAnalysis(id);
        });
    }
};
exports.IggAnalysisController = IggAnalysisController;
__decorate([
    (0, common_1.Post)('save'),
    (0, swagger_1.ApiOperation)({ summary: 'Cria uma análise IGG' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Análise IGG criada com sucesso!' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao criar análise IGG!' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_igg_analysis_dto_1.CreateIggAnalysisDto]),
    __metadata("design:returntype", Promise)
], IggAnalysisController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, swagger_1.ApiOperation)({ summary: 'Retorna todas as análises IGG' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Análises IGG encontradas!' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], IggAnalysisController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Retorna uma análise IGG por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Análise IGG encontrada!' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Análise IGG não encontrada!' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IggAnalysisController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualiza uma análise IGG' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Análise IGG atualizada!' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_igg_analysis_dto_1.UpdateIggAnalysisDto]),
    __metadata("design:returntype", Promise)
], IggAnalysisController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Deleta uma análise IGG' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Análise IGG deletada!' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IggAnalysisController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/process'),
    (0, swagger_1.ApiOperation)({ summary: 'Processa uma análise IGG' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], IggAnalysisController.prototype, "processAnalysis", null);
exports.IggAnalysisController = IggAnalysisController = IggAnalysisController_1 = __decorate([
    (0, swagger_1.ApiTags)('IGG Analysis'),
    (0, common_1.Controller)('promedina/igg/igg-analysis'),
    __metadata("design:paramtypes", [igg_analysis_service_1.IggAnalysisService])
], IggAnalysisController);
//# sourceMappingURL=igg-analysis.controller.js.map