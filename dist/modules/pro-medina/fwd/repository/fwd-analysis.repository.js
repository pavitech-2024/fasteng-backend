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
exports.FwdAnalysisRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const fwd_analysis_schema_1 = require("../schemas/fwd-analysis.schema");
const database_config_1 = require("../../../../infra/mongoose/database.config");
let FwdAnalysisRepository = class FwdAnalysisRepository {
    constructor(fwdAnalysisModel) {
        this.fwdAnalysisModel = fwdAnalysisModel;
    }
    create(createFwdAnalysisDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdAnalysis = new this.fwdAnalysisModel(createFwdAnalysisDto);
                return yield createdAnalysis.save();
            }
            catch (error) {
                console.error('Erro no repository ao criar análise:', error);
                throw error;
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fwdAnalysisModel.find().exec();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fwdAnalysisModel.findById(id).exec();
        });
    }
    update(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fwdAnalysisModel
                .findByIdAndUpdate(id, updateData, { new: true })
                .exec();
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fwdAnalysisModel.findByIdAndDelete(id).exec();
        });
    }
    findByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fwdAnalysisModel.find({ userId }).exec();
        });
    }
};
FwdAnalysisRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(fwd_analysis_schema_1.FwdAnalysis.name, database_config_1.DATABASE_CONNECTION.PROMEDINA)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FwdAnalysisRepository);
exports.FwdAnalysisRepository = FwdAnalysisRepository;
//# sourceMappingURL=fwd-analysis.repository.js.map