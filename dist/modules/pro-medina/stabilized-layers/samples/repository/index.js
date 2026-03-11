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
exports.StabilizedLayers_SamplesRepository = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const database_config_1 = require("../../../../../infra/mongoose/database.config");
const mongoose_2 = require("mongoose");
const schemas_1 = require("../schemas");
let StabilizedLayers_SamplesRepository = class StabilizedLayers_SamplesRepository {
    constructor(stabilizedLayers_sampleModel) {
        this.stabilizedLayers_sampleModel = stabilizedLayers_sampleModel;
    }
    create(stabilizedLayers_sample) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdStabilizedLayers_Samples = new this.stabilizedLayers_sampleModel(stabilizedLayers_sample);
            return createdStabilizedLayers_Samples.save();
        });
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.stabilizedLayers_sampleModel.find();
        });
    }
    findAll(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { limit, page } = options;
                const fomattedPage = Number(page);
                const formattedLimit = Number(limit);
                const skip = (fomattedPage - 1) * formattedLimit;
                const docs = yield this.stabilizedLayers_sampleModel.find().skip(skip).limit(formattedLimit).lean();
                const count = yield this.stabilizedLayers_sampleModel.countDocuments();
                const totalPages = Math.ceil(count / formattedLimit);
                return {
                    docs,
                    count,
                    totalPages,
                };
            }
            catch (error) { }
            return this.stabilizedLayers_sampleModel.find();
        });
    }
    findAllByFilter(queryFilter) {
        return __awaiter(this, void 0, void 0, function* () {
            const { filter, limit, page, sort, need_count } = queryFilter;
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
            const docs = yield this.stabilizedLayers_sampleModel
                .find(query)
                .collation({ locale: 'en', strength: 2 })
                .skip(skip)
                .limit(formattedLimit)
                .lean();
            const countQuery = formattedFilter.length > 0 ? { $and: formattedFilter } : {};
            const count = yield this.stabilizedLayers_sampleModel.countDocuments(countQuery);
            let totalPages;
            if (need_count) {
                totalPages = Math.ceil(count / formattedLimit);
            }
            return {
                docs,
                count,
                totalPages,
            };
        });
    }
    findOne(stabilizedLayers_samplesFilterQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = stabilizedLayers_samplesFilterQuery;
            const sample = yield this.stabilizedLayers_sampleModel.findOne({ 'generalData.name': name });
            return sample;
        });
    }
    findOneById(sampleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sample = yield this.stabilizedLayers_sampleModel.findById(sampleId);
            return sample;
        });
    }
    findOneAndUpdate(stabilizedLayers_samplesFilterQuery, stabilizedLayers_sample) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.stabilizedLayers_sampleModel.findOneAndUpdate(stabilizedLayers_samplesFilterQuery, stabilizedLayers_sample, {
                new: true,
            });
        });
    }
    findOneAndDelete(stabilizedLayers_samplesFilterQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.stabilizedLayers_sampleModel.findByIdAndDelete(stabilizedLayers_samplesFilterQuery);
        });
    }
};
exports.StabilizedLayers_SamplesRepository = StabilizedLayers_SamplesRepository;
exports.StabilizedLayers_SamplesRepository = StabilizedLayers_SamplesRepository = __decorate([
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.StabilizedLayers_Sample.name, database_config_1.DATABASE_CONNECTION.PROMEDINA)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], StabilizedLayers_SamplesRepository);
//# sourceMappingURL=index.js.map