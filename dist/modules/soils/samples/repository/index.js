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
exports.SamplesRepository = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const schemas_1 = require("../schemas");
const database_config_1 = require("../../../../infra/mongoose/database.config");
const mongoose_2 = require("mongoose");
let SamplesRepository = class SamplesRepository {
    constructor(sampleModel) {
        this.sampleModel = sampleModel;
    }
    create(sample) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdSample = new this.sampleModel(sample);
            return createdSample.save();
        });
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            const samples = yield this.sampleModel.find().sort({ createdAt: -1 });
            return samples;
        });
    }
    findOne(samplesFilterQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            const sample = yield this.sampleModel.findOne(samplesFilterQuery);
            return sample;
        });
    }
    findOneAndUpdate(samplesFilterQuery, sample) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.sampleModel.findOneAndUpdate(samplesFilterQuery, sample, {
                new: true,
            });
        });
    }
    findOneAndDelete(samplesFilterQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.sampleModel.findByIdAndDelete(samplesFilterQuery);
        });
    }
};
SamplesRepository = __decorate([
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.Sample.name, database_config_1.DATABASE_CONNECTION.SOILS)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SamplesRepository);
exports.SamplesRepository = SamplesRepository;
//# sourceMappingURL=index.js.map