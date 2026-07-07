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
Object.defineProperty(exports, "__esModule", { value: true });
exports.IggAnalysisRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const igg_analysis_schema_1 = require("../schema/igg-analysis.schema");
const database_config_1 = require("../../../../infra/mongoose/database.config");
let IggAnalysisRepository = class IggAnalysisRepository {
    constructor(iggAnalysisModel) {
        this.iggAnalysisModel = iggAnalysisModel;
    }
    create(createIggAnalysisDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdAnalysis = new this.iggAnalysisModel(createIggAnalysisDto);
                return yield createdAnalysis.save();
            }
            catch (error) {
                console.error('Erro no repository ao criar análise IGG:', error);
                throw error;
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.iggAnalysisModel.find().exec();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.iggAnalysisModel.findById(id).exec();
        });
    }
    update(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.iggAnalysisModel
                .findByIdAndUpdate(id, updateData, { new: true })
                .exec();
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.iggAnalysisModel.findByIdAndDelete(id).exec();
        });
    }
    findByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.iggAnalysisModel.find({ userId }).exec();
        });
    }
};
exports.IggAnalysisRepository = IggAnalysisRepository;
exports.IggAnalysisRepository = IggAnalysisRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(igg_analysis_schema_1.IggAnalysis.name, database_config_1.DATABASE_CONNECTION.PROMEDINA)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], IggAnalysisRepository);
//# sourceMappingURL=igg-analysis.repository.js.map