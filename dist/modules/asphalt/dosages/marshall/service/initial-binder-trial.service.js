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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var SetBinderTrial_Marshall_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetBinderTrial_Marshall_Service = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const database_config_1 = require("../../../../../infra/mongoose/database.config");
const mongoose_2 = require("mongoose");
const repository_1 = require("../repository");
const schemas_1 = require("../schemas");
const repository_2 = require("../../../essays/viscosityRotational/repository");
let SetBinderTrial_Marshall_Service = SetBinderTrial_Marshall_Service_1 = class SetBinderTrial_Marshall_Service {
    constructor(marshallModel, viscosityRepository, marshallRepository) {
        this.marshallModel = marshallModel;
        this.viscosityRepository = viscosityRepository;
        this.marshallRepository = marshallRepository;
        this.logger = new common_1.Logger(SetBinderTrial_Marshall_Service_1.name);
    }
    calculateInitlaBinderTrial(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('calculate marshall set initial binder trial step on initial-binder-trial.marshall.service.ts > [body]', { body });
                const { trial, percentsOfDosages, binder } = body;
                const newPercent = 100 - trial;
                const halfPlus = [];
                const halfLess = [];
                const onePlus = [];
                const oneLess = [];
                const percentOfDosage = [];
                const percentOfDosageToReturn = [];
                const newPercentOfDosage = [];
                const modifiedPercentsOfDosages = [];
                const ids1 = new Set();
                Object.keys(percentsOfDosages[0]).forEach((key) => {
                    const id = key.split('_')[1];
                    ids1.add(id);
                    const value = percentsOfDosages[0][key];
                    const index = Array.from(ids1).indexOf(id);
                    modifiedPercentsOfDosages[index] = { _id: id, value };
                });
                for (let i = 0; i < modifiedPercentsOfDosages.length; i++) {
                    halfPlus.push({
                        material: modifiedPercentsOfDosages[i]._id,
                        value: ((newPercent - 0.5) * modifiedPercentsOfDosages[i].value) / 100,
                        trial: 'halfPlus',
                    });
                    halfLess.push({
                        material: modifiedPercentsOfDosages[i]._id,
                        value: ((newPercent + 0.5) * modifiedPercentsOfDosages[i].value) / 100,
                        trial: 'halfLess',
                    });
                    onePlus.push({
                        material: modifiedPercentsOfDosages[i]._id,
                        value: ((newPercent - 1) * modifiedPercentsOfDosages[i].value) / 100,
                        trial: 'onePlus',
                    });
                    oneLess.push({
                        material: modifiedPercentsOfDosages[i]._id,
                        value: ((newPercent + 1) * modifiedPercentsOfDosages[i].value) / 100,
                        trial: 'oneLess',
                    });
                    percentOfDosage.push({
                        material: modifiedPercentsOfDosages[i]._id,
                        value: (newPercent * modifiedPercentsOfDosages[i].value) / 100,
                        trial: 'normal'
                    });
                    newPercentOfDosage.push([onePlus[i].value, halfPlus[i].value, percentOfDosage[i].value, halfLess[i].value, oneLess[i].value]);
                    percentOfDosageToReturn.push([oneLess[i], halfLess[i], percentOfDosage[i], halfPlus[i], onePlus[i]]);
                }
                percentOfDosageToReturn.push([
                    { trial: 'oneLess', value: trial - 1 },
                    { value: trial - 0.5, trial: 'halfLess' },
                    { value: trial, trial: 'normal' },
                    { value: trial + 0.5, trial: 'halfPlus' },
                    { value: trial + 1, trial: 'onePlus' },
                ]);
                const bandsOfTemperatures = yield this.getBandsOfTemperatures(binder);
                console.log(bandsOfTemperatures);
                const result = {
                    bandsOfTemperatures,
                    percentsOfDosage: percentOfDosageToReturn,
                    newPercentOfDosage,
                };
                return { result };
            }
            catch (error) {
                throw error;
            }
        });
    }
    getBandsOfTemperatures(binder) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resultRotational = yield this.viscosityRepository.findOne({
                    'generalData.material._id': binder,
                });
                if (!resultRotational) {
                    throw new common_1.NotFoundException(`O ligante selecionado não passou por nenhum ensaio de viscosidade ainda.`);
                }
                const machiningTemperatureRange = {
                    higher: resultRotational.results.machiningTemperatureRange.higher,
                    average: (resultRotational.results.machiningTemperatureRange.higher +
                        resultRotational.results.machiningTemperatureRange.lower) /
                        2,
                    lower: resultRotational.results.machiningTemperatureRange.lower,
                };
                const compressionTemperatureRange = {
                    higher: resultRotational.results.compressionTemperatureRange.higher,
                    average: (resultRotational.results.compressionTemperatureRange.higher +
                        resultRotational.results.compressionTemperatureRange.lower) /
                        2,
                    lower: resultRotational.results.compressionTemperatureRange.lower,
                };
                let higherAggregateTemperature, lowerAggregateTemperature;
                if (resultRotational.results.machiningTemperatureRange.higher + 15 > 177)
                    higherAggregateTemperature = 177;
                else
                    higherAggregateTemperature = resultRotational.results.machiningTemperatureRange.higher + 15;
                if (resultRotational.results.machiningTemperatureRange.lower + 15 > 177)
                    lowerAggregateTemperature = 177;
                else
                    lowerAggregateTemperature = resultRotational.results.machiningTemperatureRange.lower + 15;
                const aggregateTemperatureRange = {
                    higher: higherAggregateTemperature,
                    average: (higherAggregateTemperature + lowerAggregateTemperature) / 2,
                    lower: lowerAggregateTemperature,
                };
                return { machiningTemperatureRange, compressionTemperatureRange, aggregateTemperatureRange };
            }
            catch (error) {
                throw error;
            }
        });
    }
    saveStep4Data(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('save marshall binder trial step on binder-trial.marshall.service.ts > [body]', { body });
                const { name } = body.binderTrialData;
                const marshallExists = yield this.marshallRepository.findOne(name, userId);
                const _a = body.binderTrialData, { name: materialName } = _a, binderTrialWithoutName = __rest(_a, ["name"]);
                const marshallWithBinderTrial = Object.assign(Object.assign({}, marshallExists._doc), { binderTrialData: binderTrialWithoutName });
                yield this.marshallModel.updateOne({ _id: marshallExists._doc._id }, marshallWithBinderTrial);
                if (marshallExists._doc.generalData.step < 4) {
                    yield this.marshallRepository.saveStep(marshallExists, 4);
                }
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
};
exports.SetBinderTrial_Marshall_Service = SetBinderTrial_Marshall_Service;
exports.SetBinderTrial_Marshall_Service = SetBinderTrial_Marshall_Service = SetBinderTrial_Marshall_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.Marshall.name, database_config_1.DATABASE_CONNECTION.ASPHALT)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        repository_2.ViscosityRotationalRepository,
        repository_1.MarshallRepository])
], SetBinderTrial_Marshall_Service);
//# sourceMappingURL=initial-binder-trial.service.js.map