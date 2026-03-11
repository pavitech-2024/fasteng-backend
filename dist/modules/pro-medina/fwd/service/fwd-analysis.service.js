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
exports.FwdAnalysisService = void 0;
const common_1 = require("@nestjs/common");
const fwd_analysis_repository_1 = require("../repository/fwd-analysis.repository");
let FwdAnalysisService = class FwdAnalysisService {
    constructor(fwdAnalysisRepository) {
        this.fwdAnalysisRepository = fwdAnalysisRepository;
    }
    create(createFwdAnalysisDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Dados recebidos para criação:', JSON.stringify(createFwdAnalysisDto, null, 2));
                return yield this.fwdAnalysisRepository.create(createFwdAnalysisDto);
            }
            catch (error) {
                console.error('Erro detalhado ao criar análise:', error);
                throw new Error(`Falha ao criar análise: ${error.message}`);
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fwdAnalysisRepository.findAll();
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fwdAnalysisRepository.findById(id);
        });
    }
    update(id, updateFwdAnalysisDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fwdAnalysisRepository.update(id, updateFwdAnalysisDto);
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fwdAnalysisRepository.delete(id);
        });
    }
    processAnalysis(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const analysis = yield this.findOne(id);
            return { message: 'Análise processada', analysis };
        });
    }
};
exports.FwdAnalysisService = FwdAnalysisService;
exports.FwdAnalysisService = FwdAnalysisService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [fwd_analysis_repository_1.FwdAnalysisRepository])
], FwdAnalysisService);
//# sourceMappingURL=fwd-analysis.service.js.map