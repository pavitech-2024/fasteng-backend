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
function isViscosityPayload(x) {
    if (typeof x !== 'object' || x === null)
        return false;
    const obj = x;
    const mt = obj['machiningTemperatureRange'];
    const ct = obj['compressionTemperatureRange'];
    return (typeof (mt === null || mt === void 0 ? void 0 : mt.higher) === 'number' &&
        typeof (mt === null || mt === void 0 ? void 0 : mt.lower) === 'number' &&
        typeof (ct === null || ct === void 0 ? void 0 : ct.higher) === 'number' &&
        typeof (ct === null || ct === void 0 ? void 0 : ct.lower) === 'number');
}
function extractViscosityPayload(res) {
    if (typeof res === 'object' && res !== null) {
        const r = res;
        if ('results' in r && isViscosityPayload(r.results))
            return r.results;
        if ('data' in r && isViscosityPayload(r.data))
            return r.data;
    }
    throw new Error('Formato inesperado do retorno do ViscosityRotationalRepository.');
}
let SetBinderTrial_Marshall_Service = SetBinderTrial_Marshall_Service_1 = class SetBinderTrial_Marshall_Service {
    constructor(marshallModel, viscosityRepository, marshallRepository) {
        this.marshallModel = marshallModel;
        this.viscosityRepository = viscosityRepository;
        this.marshallRepository = marshallRepository;
        this.logger = new common_1.Logger(SetBinderTrial_Marshall_Service_1.name);
    }
    calculateInitialBinderTrial(body) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                this.logger.log('Calculating Marshall initial binder trial', { body });
                const { trial, binder } = body;
                const percentsList = 'percentsOfDosages' in body ? body.percentsOfDosages : body.percentsOfDosage;
                const newPercent = 100 - trial;
                const halfPlus = [];
                const halfLess = [];
                const onePlus = [];
                const oneLess = [];
                const percentOfDosage = [];
                const percentOfDosageToReturn = [];
                const newPercentOfDosage = [];
                const modifiedPercentsOfDosages = [];
                const ids = new Set();
                const first = (_a = percentsList[0]) !== null && _a !== void 0 ? _a : {};
                Object.keys(first).forEach((key) => {
                    var _a;
                    const id = key.split('_')[1];
                    if (!id)
                        return;
                    ids.add(id);
                    const value = Number((_a = first[key]) !== null && _a !== void 0 ? _a : 0);
                    const index = Array.from(ids).indexOf(id);
                    modifiedPercentsOfDosages[index] = { _id: id, value };
                });
                for (let i = 0; i < modifiedPercentsOfDosages.length; i++) {
                    const item = modifiedPercentsOfDosages[i];
                    onePlus.push({ material: item._id, value: ((newPercent - 1) * item.value) / 100, trial: 'onePlus' });
                    halfPlus.push({ material: item._id, value: ((newPercent - 0.5) * item.value) / 100, trial: 'halfPlus' });
                    const normal = { material: item._id, value: (newPercent * item.value) / 100, trial: 'normal' };
                    halfLess.push({ material: item._id, value: ((newPercent + 0.5) * item.value) / 100, trial: 'halfLess' });
                    oneLess.push({ material: item._id, value: ((newPercent + 1) * item.value) / 100, trial: 'oneLess' });
                    percentOfDosage.push(normal);
                    newPercentOfDosage.push([
                        onePlus[i].value,
                        halfPlus[i].value,
                        normal.value,
                        halfLess[i].value,
                        oneLess[i].value,
                    ]);
                    percentOfDosageToReturn.push([oneLess[i], halfLess[i], normal, halfPlus[i], onePlus[i]]);
                }
                percentOfDosageToReturn.push([
                    { trial: 'oneLess', value: trial - 1, material: 'binder' },
                    { trial: 'halfLess', value: trial - 0.5, material: 'binder' },
                    { trial: 'normal', value: trial, material: 'binder' },
                    { trial: 'halfPlus', value: trial + 0.5, material: 'binder' },
                    { trial: 'onePlus', value: trial + 1, material: 'binder' },
                ]);
                const bandsOfTemperatures = yield this.getBandsOfTemperatures(binder);
                return {
                    result: {
                        bandsOfTemperatures,
                        percentsOfDosage: percentOfDosageToReturn,
                        newPercentOfDosage,
                    },
                };
            }
            catch (error) {
                this.logger.error('Error calculating initial binder trial', error);
                throw error;
            }
        });
    }
    getBandsOfTemperatures(binderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resultRotational = yield this.viscosityRepository.findOne({
                    'generalData.material._id': binderId,
                });
                if (!resultRotational) {
                    throw new common_1.NotFoundException('O ligante selecionado não passou por nenhum ensaio de viscosidade ainda.');
                }
                const payload = extractViscosityPayload(resultRotational);
                const machiningTemperatureRange = {
                    higher: payload.machiningTemperatureRange.higher,
                    average: (payload.machiningTemperatureRange.higher + payload.machiningTemperatureRange.lower) / 2,
                    lower: payload.machiningTemperatureRange.lower,
                };
                const compressionTemperatureRange = {
                    higher: payload.compressionTemperatureRange.higher,
                    average: (payload.compressionTemperatureRange.higher + payload.compressionTemperatureRange.lower) /
                        2,
                    lower: payload.compressionTemperatureRange.lower,
                };
                const higherAggregateTemperature = Math.min(payload.machiningTemperatureRange.higher + 15, 177);
                const lowerAggregateTemperature = Math.min(payload.machiningTemperatureRange.lower + 15, 177);
                const AggregateTemperatureRange = {
                    higher: higherAggregateTemperature,
                    average: (higherAggregateTemperature + lowerAggregateTemperature) / 2,
                    lower: lowerAggregateTemperature,
                };
                const bands = {
                    machiningTemperatureRange,
                    compressionTemperatureRange,
                    AggregateTemperatureRange,
                };
                return bands;
            }
            catch (error) {
                this.logger.error('Error fetching bands of temperatures', error);
                throw error;
            }
        });
    }
    saveStep4Data(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('Saving Marshall binder trial step 4', { body, userId });
                const _a = body.binderTrialData, { name } = _a, binderTrialWithoutName = __rest(_a, ["name"]);
                const marshallExists = yield this.marshallRepository.findOne(name, userId);
                if (!marshallExists)
                    throw new common_1.NotFoundException('Marshall not found');
                marshallExists.set({ binderTrialData: binderTrialWithoutName });
                yield marshallExists.save();
                if (marshallExists.step < 4) {
                    yield this.marshallRepository.saveStep(marshallExists._id, 4);
                }
                return true;
            }
            catch (error) {
                this.logger.error('Error saving step 4 binder trial data', error);
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