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
var MaximumMixtureDensity_Marshall_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaximumMixtureDensity_Marshall_Service = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const schemas_1 = require("../schemas");
const database_config_1 = require("../../../../../infra/mongoose/database.config");
const repository_1 = require("../repository");
const mongoose_2 = require("mongoose");
const repository_2 = require("../../../materials/repository");
const repository_3 = require("../../../essays/specifyMass/repository");
let MaximumMixtureDensity_Marshall_Service = MaximumMixtureDensity_Marshall_Service_1 = class MaximumMixtureDensity_Marshall_Service {
    constructor(marshallModel, marshallRepository, materialsRepository, specificMassRepository) {
        this.marshallModel = marshallModel;
        this.marshallRepository = marshallRepository;
        this.materialsRepository = materialsRepository;
        this.specificMassRepository = specificMassRepository;
        this.logger = new common_1.Logger(MaximumMixtureDensity_Marshall_Service_1.name);
    }
    getIndexesOfMissesSpecificGravity(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const materials = dto.aggregates.map((element) => element._id);
                const getIndexesOfMissesSpecificGravity = () => __awaiter(this, void 0, void 0, function* () {
                    const materialsData = yield Promise.all(materials.map((materialId) => this.specificMassRepository.findOne({
                        'generalData.material._id': materialId,
                    })));
                    const withoutExperimentSpecificGravity = materialsData
                        .map((material) => {
                        if (material && material.results && material.results.data) {
                            return {
                                value: material.results.data.bulk_specify_mass,
                                _id: material._id.toString(),
                                name: material.generalData.material.name,
                            };
                        }
                        return null;
                    })
                        .filter((index) => index !== null);
                    return { missesSpecificGravity: withoutExperimentSpecificGravity };
                });
                return yield getIndexesOfMissesSpecificGravity();
            }
            catch (error) {
                throw new Error('Failed to calculate max specific gravity.');
            }
        });
    }
    calculateDmtData(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { indexesOfMissesSpecificGravity, missingSpecificGravity, percentsOfDosage, aggregates, trial } = dto;
                let denominadorLessOne = 0;
                let denominadorLessHalf = 0;
                let denominador = 0;
                let denominadorPlusHalf = 0;
                let denominadorPlusOne = 0;
                const materials = aggregates.map((element) => element._id);
                const calculate = () => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const listOfMaterials = yield Promise.all(materials.map((materialId) => this.specificMassRepository.findOne({
                            'generalData.material._id': materialId,
                        })));
                        let listOfSpecificGravities = [];
                        let cont = 0;
                        for (let i = 0; i < listOfMaterials.length; i++) {
                            listOfSpecificGravities.push(null);
                            if (listOfMaterials[i] && listOfMaterials[i].results && listOfMaterials[i].results.data) {
                                if (listOfMaterials[i].generalData.material.type === 'coarseAggregate' ||
                                    listOfMaterials[i].generalData.material.type === 'fineAggregate') {
                                    const experiment = yield this.specificMassRepository.findOne({
                                        'generalData.material._id': listOfMaterials[i].generalData.material._id,
                                    });
                                    if (experiment && experiment.results && experiment.results.data) {
                                        listOfSpecificGravities[i] = experiment.results.data.bulk_specify_mass;
                                        denominadorLessOne += percentsOfDosage[i][4] / listOfSpecificGravities[i];
                                        denominadorLessHalf += percentsOfDosage[i][3] / listOfSpecificGravities[i];
                                        denominador += percentsOfDosage[i][2] / listOfSpecificGravities[i];
                                        denominadorPlusHalf += percentsOfDosage[i][1] / listOfSpecificGravities[i];
                                        denominadorPlusOne += percentsOfDosage[i][0] / listOfSpecificGravities[i];
                                    }
                                }
                            }
                            else {
                                const MissingGravitiesArray = [
                                    Number(missingSpecificGravity.material_1),
                                    Number(missingSpecificGravity.material_2),
                                ];
                                listOfSpecificGravities[i] = MissingGravitiesArray[cont];
                                denominadorLessOne += percentsOfDosage[i][4] / listOfSpecificGravities[i];
                                denominadorLessHalf += percentsOfDosage[i][3] / listOfSpecificGravities[i];
                                denominador += percentsOfDosage[i][2] / listOfSpecificGravities[i];
                                denominadorPlusHalf += percentsOfDosage[i][1] / listOfSpecificGravities[i];
                                denominadorPlusOne += percentsOfDosage[i][0] / listOfSpecificGravities[i];
                                cont++;
                            }
                        }
                        const maxSpecificGravity = {
                            result: {
                                lessOne: 100 / (denominadorLessOne + (trial - 1) / 1.03),
                                lessHalf: 100 / (denominadorLessHalf + (trial - 0.5) / 1.03),
                                normal: 100 / (denominador + trial / 1.03),
                                plusHalf: 100 / (denominadorPlusHalf + (trial + 0.5) / 1.03),
                                plusOne: 100 / (denominadorPlusOne + (trial + 1) / 1.03),
                            },
                            method: 'DMT',
                        };
                        return { maxSpecificGravity, listOfSpecificGravities };
                    }
                    catch (error) {
                        throw new Error('Failed to calculate max specific gravity.');
                    }
                });
                const result = yield calculate();
                return result;
            }
            catch (error) {
                throw new Error('Failed to calculate max specific gravity.');
            }
        });
    }
    calculateGmmData(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { gmm: valuesOfGmm, temperatureOfWaterGmm, aggregates } = dto;
                const materials = aggregates.map((element) => element._id);
                const calculate = () => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const listOfMaterials = yield Promise.all(materials.map((materialId) => this.specificMassRepository.findOne({
                            'generalData.material._id': materialId,
                        })));
                        let listOfSpecificGravities = [];
                        for (let i = 0; i < listOfMaterials.length; i++) {
                            listOfSpecificGravities.push(null);
                            if (listOfMaterials[i] &&
                                listOfMaterials[i].results &&
                                listOfMaterials[i].results.data &&
                                (listOfMaterials[i].generalData.material.type === 'coarseAggregate' ||
                                    listOfMaterials[i].generalData.material.type === 'fineAggregate' ||
                                    listOfMaterials[i].generalData.material.type === 'filler')) {
                                listOfSpecificGravities[i] = listOfMaterials[i].results.data.bulk_specify_mass;
                            }
                        }
                        return listOfSpecificGravities;
                    }
                    catch (error) {
                        throw new Error('Failed to calculate max specific gravity.');
                    }
                });
                const gmm = Array.from({ length: 5 }, (_, i) => {
                    const gmmItem = valuesOfGmm.find(gmm => gmm.id - 1 === i);
                    return gmmItem || null;
                });
                const content = gmm.map(gmmItem => {
                    if (gmmItem && !gmmItem.value) {
                        const denominator = gmmItem.massOfContainerWaterSample - gmmItem.massOfContainerWater;
                        return (gmmItem.massOfDrySample / (gmmItem.massOfDrySample - denominator)) * temperatureOfWaterGmm;
                    }
                    return (gmmItem === null || gmmItem === void 0 ? void 0 : gmmItem.value) || null;
                });
                const maxSpecificGravity = {
                    result: {
                        lessOne: content[0],
                        lessHalf: content[1],
                        normal: content[2],
                        plusHalf: content[3],
                        plusOne: content[4],
                    },
                    method: 'GMM',
                };
                const listOfSpecificGravities = yield calculate();
                return { maxSpecificGravity, listOfSpecificGravities };
            }
            catch (error) {
                throw new Error('Failed to calculate max specific gravity GMM.');
            }
        });
    }
    calculateRiceTest(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('calculate rice test > [dto]', { dto });
            try {
                const maxSpecificGravity = dto.riceTest.map((item) => {
                    return {
                        id: item.id,
                        Teor: item.teor,
                        GMM: item.massOfDrySample /
                            (item.massOfDrySample - (item.massOfContainerWaterSample - item.massOfContainerWater)),
                    };
                });
                return maxSpecificGravity;
            }
            catch (error) {
                throw new Error('Failed to calculate rice test.');
            }
        });
    }
    saveMistureMaximumDensityData(dto, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('save marshall maximum mixture density data', { dto });
                const { name } = dto;
                const marshallExists = yield this.marshallRepository.findOne(name, userId);
                const { name: materialName } = dto, maximumMixtureDensityWithoutName = __rest(dto, ["name"]);
                const marshallWithMaximumMixtureDensity = Object.assign(Object.assign({}, marshallExists._doc), { maximumMixtureDensityData: maximumMixtureDensityWithoutName });
                yield this.marshallModel.updateOne({ _id: marshallExists._doc._id }, marshallWithMaximumMixtureDensity);
                if (marshallExists._doc.generalData.step < 5) {
                    yield this.marshallRepository.saveStep(marshallExists, 5);
                }
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
};
exports.MaximumMixtureDensity_Marshall_Service = MaximumMixtureDensity_Marshall_Service;
exports.MaximumMixtureDensity_Marshall_Service = MaximumMixtureDensity_Marshall_Service = MaximumMixtureDensity_Marshall_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.Marshall.name, database_config_1.DATABASE_CONNECTION.ASPHALT)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        repository_1.MarshallRepository,
        repository_2.MaterialsRepository,
        repository_3.SpecifyMassRepository])
], MaximumMixtureDensity_Marshall_Service);
//# sourceMappingURL=maximumMixtureDensity.service.js.map