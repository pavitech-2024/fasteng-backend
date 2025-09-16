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
exports.BinderAsphaltConcrete_SamplesRepository = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const database_config_1 = require("../../../../../infra/mongoose/database.config");
const mongoose_2 = require("mongoose");
const schemas_1 = require("../schemas");
let BinderAsphaltConcrete_SamplesRepository = class BinderAsphaltConcrete_SamplesRepository {
    constructor(binderAsphaltConcrete_sampleModel) {
        this.binderAsphaltConcrete_sampleModel = binderAsphaltConcrete_sampleModel;
    }
    create(binderAsphaltConcrete_sample) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdBinderAsphaltConcrete_Samples = new this.binderAsphaltConcrete_sampleModel(binderAsphaltConcrete_sample);
            return createdBinderAsphaltConcrete_Samples.save();
        });
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.binderAsphaltConcrete_sampleModel.find();
        });
    }
    findAll(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { limit, page } = options;
                const fomattedPage = Number(page);
                const formattedLimit = Number(limit);
                const skip = (fomattedPage - 1) * formattedLimit;
                const docs = yield this.binderAsphaltConcrete_sampleModel.find()
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(formattedLimit)
                    .lean();
                const count = yield this.binderAsphaltConcrete_sampleModel.countDocuments();
                const totalPages = Math.ceil(count / formattedLimit);
                return {
                    docs,
                    count,
                    totalPages,
                };
            }
            catch (error) { }
            return this.binderAsphaltConcrete_sampleModel.find();
        });
    }
    findAllByFilter(queryFilter) {
        return __awaiter(this, void 0, void 0, function* () {
            const { filter, limit, page, need_count } = queryFilter;
            const fomattedPage = Number(page);
            const formattedLimit = Number(limit);
            const skip = (fomattedPage - 1) * formattedLimit;
            const parsedFilter = JSON.parse(filter);
            const formattedFilter = [];
            parsedFilter.forEach(obj => {
                if (obj.name)
                    formattedFilter.push({ 'generalData.name': { $regex: `.*${obj.name}.*`, $options: 'i' } });
                if (obj.cityState)
                    formattedFilter.push({ 'generalData.cityState': { $regex: `.*${obj.cityState}.*`, $options: 'i' } });
                if (obj.zone)
                    formattedFilter.push({ 'generalData.zone': { $regex: `.*${obj.zone}.*`, $options: 'i' } });
                if (obj.layer)
                    formattedFilter.push({ 'generalData.layer': { $regex: `.*${obj.layer}.*`, $options: 'i' } });
                if (obj.highway)
                    formattedFilter.push({ 'generalData.highway': { $regex: `.*${obj.highway}.*`, $options: 'i' } });
            });
            let query = {};
            if (formattedFilter.length > 0) {
                query = { $and: formattedFilter };
            }
            const docs = yield this.binderAsphaltConcrete_sampleModel
                .find(query)
                .sort({ createdAt: -1 })
                .collation({ locale: 'en_US', caseFirst: 'off', strength: 2 })
                .skip(skip)
                .limit(formattedLimit)
                .lean();
            const countQuery = formattedFilter.length > 0 ? { $and: formattedFilter } : {};
            const count = yield this.binderAsphaltConcrete_sampleModel.countDocuments(countQuery);
            let totalPages;
            if (need_count) {
                totalPages = Math.ceil(count / Number(limit));
            }
            return {
                docs,
                count,
                totalPages,
            };
        });
    }
    findOne(binderAsphaltConcrete_samplesFilterQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = binderAsphaltConcrete_samplesFilterQuery;
            const sample = yield this.binderAsphaltConcrete_sampleModel.findOne({ 'generalData.name': name });
            return sample;
        });
    }
    findOneById(sampleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sample = yield this.binderAsphaltConcrete_sampleModel.findById(sampleId);
            return sample;
        });
    }
    findOneAndUpdate(binderAsphaltConcrete_samplesFilterQuery, binderAsphaltConcrete_sample) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.binderAsphaltConcrete_sampleModel.findOneAndUpdate(binderAsphaltConcrete_samplesFilterQuery, binderAsphaltConcrete_sample, {
                new: true,
            });
        });
    }
    findOneAndDelete(binderAsphaltConcrete_samplesFilterQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.binderAsphaltConcrete_sampleModel.findByIdAndDelete(binderAsphaltConcrete_samplesFilterQuery);
        });
    }
};
BinderAsphaltConcrete_SamplesRepository = __decorate([
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.BinderAsphaltConcrete_Sample.name, database_config_1.DATABASE_CONNECTION.PROMEDINA)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BinderAsphaltConcrete_SamplesRepository);
exports.BinderAsphaltConcrete_SamplesRepository = BinderAsphaltConcrete_SamplesRepository;
//# sourceMappingURL=index.js.map