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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IggAnalysisService = void 0;
const common_1 = require("@nestjs/common");
const igg_analysis_repository_1 = require("../repository/igg-analysis.repository");
let IggAnalysisService = class IggAnalysisService {
    constructor(iggAnalysisRepository) {
        this.iggAnalysisRepository = iggAnalysisRepository;
    }
    create(createIggAnalysisDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Dados recebidos para criação IGG:', JSON.stringify(createIggAnalysisDto, null, 2));
                return yield this.iggAnalysisRepository.create(createIggAnalysisDto);
            }
            catch (error) {
                console.error('Erro detalhado ao criar análise IGG:', error);
                if (error instanceof Error) {
                    throw new Error(`Falha ao criar análise IGG: ${error.message}`);
                }
                throw error;
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.iggAnalysisRepository.findAll();
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const analysis = yield this.iggAnalysisRepository.findById(id);
            if (!analysis) {
                throw new common_1.NotFoundException(`Análise IGG com ID ${id} não encontrada`);
            }
            return analysis;
        });
    }
    update(id, updateIggAnalysisDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const analysis = yield this.findOne(id);
            return this.iggAnalysisRepository.update(id, updateIggAnalysisDto);
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const analysis = yield this.findOne(id);
            return this.iggAnalysisRepository.delete(id);
        });
    }
    processAnalysis(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const analysis = yield this.findOne(id);
            return {
                message: 'Análise IGG processada com sucesso',
                analysis
            };
        });
    }
};
exports.IggAnalysisService = IggAnalysisService;
exports.IggAnalysisService = IggAnalysisService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [igg_analysis_repository_1.IggAnalysisRepository])
], IggAnalysisService);
//# sourceMappingURL=igg-analysis.service.js.map