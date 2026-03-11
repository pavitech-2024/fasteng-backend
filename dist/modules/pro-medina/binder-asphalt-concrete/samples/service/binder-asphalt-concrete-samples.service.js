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
var BinderAsphaltConcreteSamplesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BinderAsphaltConcreteSamplesService = void 0;
const common_1 = require("@nestjs/common");
const exceptions_1 = require("../../../../../utils/exceptions");
const repository_1 = require("../repository");
let BinderAsphaltConcreteSamplesService = BinderAsphaltConcreteSamplesService_1 = class BinderAsphaltConcreteSamplesService {
    constructor(binderAsphaltConcrete_SamplesRepository) {
        this.binderAsphaltConcrete_SamplesRepository = binderAsphaltConcrete_SamplesRepository;
        this.logger = new common_1.Logger(BinderAsphaltConcreteSamplesService_1.name);
    }
    createSample(sample) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sampleFound = yield this.binderAsphaltConcrete_SamplesRepository.findOne({ name: sample.generalData.name });
                if (sampleFound) {
                    throw new common_1.HttpException({
                        status: common_1.HttpStatus.CONFLICT,
                        error: `Binder/concrete sample with name "${sample.generalData.name}" already exists.`,
                    }, common_1.HttpStatus.CONFLICT);
                }
                return this.binderAsphaltConcrete_SamplesRepository.create(Object.assign(Object.assign({}, sample), { createdAt: new Date() }));
            }
            catch (error) {
                this.logger.error(`error on create sample > [error]: ${error}`);
                throw error;
            }
        });
    }
    getAllSamples(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const samples = yield this.binderAsphaltConcrete_SamplesRepository.findAll(options);
                return samples;
            }
            catch (error) {
                this.logger.error(`error on get all stabilized layers samples > [error]: ${error}`);
                throw error;
            }
        });
    }
    getSample(sampleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sample = yield this.binderAsphaltConcrete_SamplesRepository.findOneById(sampleId);
                if (!sample)
                    throw new exceptions_1.NotFound('Sample');
                return sample;
            }
            catch (error) {
                this.logger.error(`error on get sample > [error]: ${error}`);
                throw error;
            }
        });
    }
    getSamplesByFilter(queryFilter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const samples = yield this.binderAsphaltConcrete_SamplesRepository.findAllByFilter(queryFilter);
                return {
                    docs: samples.docs,
                    totalPages: samples.totalPages,
                    count: samples.count
                };
            }
            catch (error) {
                this.logger.error(`error on get sample > [error]: ${error}`);
                throw error;
            }
        });
    }
    updateSample(sample) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sampleFound = yield this.binderAsphaltConcrete_SamplesRepository.findOneById(sample._id);
                if (!sampleFound)
                    throw new exceptions_1.NotFound('Sample');
                return this.binderAsphaltConcrete_SamplesRepository.findOneAndUpdate({ _id: sample._id }, sample);
            }
            catch (error) {
                this.logger.error(`error on update sample > [error]: ${error}`);
                throw error;
            }
        });
    }
    deleteSample(sampleId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sample = yield this.binderAsphaltConcrete_SamplesRepository.findOneById(sampleId);
                if (!sample)
                    throw new exceptions_1.NotFound('Sample');
                return this.binderAsphaltConcrete_SamplesRepository.findOneAndDelete({ _id: sampleId });
            }
            catch (error) {
                this.logger.error(`error on delete sample > [error]: ${error}`);
                throw error;
            }
        });
    }
};
exports.BinderAsphaltConcreteSamplesService = BinderAsphaltConcreteSamplesService;
exports.BinderAsphaltConcreteSamplesService = BinderAsphaltConcreteSamplesService = BinderAsphaltConcreteSamplesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.BinderAsphaltConcrete_SamplesRepository])
], BinderAsphaltConcreteSamplesService);
//# sourceMappingURL=binder-asphalt-concrete-samples.service.js.map