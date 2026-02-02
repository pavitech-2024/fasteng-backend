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
    getIndexesOfMissesSpecificGravity(aggregates) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!aggregates || !Array.isArray(aggregates) || aggregates.length === 0) {
                    throw new Error('Aggregates array is required and must not be empty');
                }
                this.logger.log(`Getting indexes for ${aggregates.length} aggregates`);
                let materials = aggregates.map((element) => element._id);
                const getIndexesOfMissesSpecificGravity = (materialsArray) => __awaiter(this, void 0, void 0, function* () {
                    const materialsData = yield Promise.all(materialsArray.map((materialId) => this.specificMassRepository.findOne({
                        'generalData.material._id': materialId,
                    })));
                    this.logger.log(`Found ${materialsData.filter(m => m !== null).length} material records`);
                    const withoutExperimentSpecificGravity = materialsData
                        .map((material, index) => {
                        var _a, _b, _c, _d;
                        if (!material) {
                            this.logger.warn(`Material ${materialsArray[index]} not found in SpecifyMass database`);
                            return {
                                value: 2.65,
                                _id: materialsArray[index],
                                name: ((_a = aggregates[index]) === null || _a === void 0 ? void 0 : _a.name) || `Material ${index + 1}`,
                                hasRealData: false,
                                status: 'not_found'
                            };
                        }
                        let bulkSpecifyMass = null;
                        const resultsAny = material.results;
                        if (resultsAny && resultsAny.bulk_specify_mass !== undefined) {
                            bulkSpecifyMass = resultsAny.bulk_specify_mass;
                            this.logger.log(`Using bulk_specify_mass from results (direct): ${bulkSpecifyMass}`);
                        }
                        else if (((_b = resultsAny === null || resultsAny === void 0 ? void 0 : resultsAny.data) === null || _b === void 0 ? void 0 : _b.bulk_specify_mass) !== undefined) {
                            bulkSpecifyMass = resultsAny.data.bulk_specify_mass;
                            this.logger.log(`Using bulk_specify_mass from results.data: ${bulkSpecifyMass}`);
                        }
                        if (bulkSpecifyMass === null || bulkSpecifyMass === undefined) {
                            this.logger.warn(`bulk_specify_mass is null/undefined for material: ${material._id}`);
                            bulkSpecifyMass = 2.65;
                        }
                        else if (bulkSpecifyMass <= 0 || bulkSpecifyMass > 5) {
                            this.logger.warn(`Invalid bulk_specify_mass value (${bulkSpecifyMass}) for material: ${material._id}`);
                            bulkSpecifyMass = 2.65;
                        }
                        const materialType = (_d = (_c = material.generalData) === null || _c === void 0 ? void 0 : _c.material) === null || _d === void 0 ? void 0 : _d.type;
                        const isRealData = bulkSpecifyMass !== 2.65 && bulkSpecifyMass > 0 && bulkSpecifyMass <= 5;
                        return {
                            value: bulkSpecifyMass,
                            _id: material._id.toString(),
                            name: material.generalData.material.name,
                            materialType: materialType,
                            hasRealData: isRealData,
                            status: isRealData ? 'real_data' : 'fallback'
                        };
                    });
                    this.logger.log(`Returning ${withoutExperimentSpecificGravity.length} indexes`);
                    const validIndexes = withoutExperimentSpecificGravity.filter(index => index !== null);
                    return {
                        missesSpecificGravity: validIndexes,
                        summary: {
                            totalAggregates: aggregates.length,
                            foundInDb: materialsData.filter(m => m !== null).length,
                            hasRealData: validIndexes.filter(i => i.hasRealData).length,
                            usingFallback: validIndexes.filter(i => !i.hasRealData).length
                        }
                    };
                });
                return yield getIndexesOfMissesSpecificGravity(materials);
            }
            catch (error) {
                this.logger.error(`Error in getIndexesOfMissesSpecificGravity: ${error.message}`);
                this.logger.error(`Full error: ${error.stack}`);
                throw new Error(`Failed to calculate max specific gravity: ${error.message}`);
            }
        });
    }
    calculateDmtData(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('🔍 DMT Body recebido:', JSON.stringify(body, null, 2));
                const { aggregates, percentsOfDosage, trial, missingSpecificGravity } = body;
                console.log('🔍 Dados extraídos CORRETAMENTE:', {
                    aggregatesCount: aggregates === null || aggregates === void 0 ? void 0 : aggregates.length,
                    trial,
                    percentsOfDosageLength: percentsOfDosage === null || percentsOfDosage === void 0 ? void 0 : percentsOfDosage.length,
                    missingSpecificGravityCount: missingSpecificGravity === null || missingSpecificGravity === void 0 ? void 0 : missingSpecificGravity.length
                });
                if (!trial)
                    throw new Error('Trial é obrigatório');
                if (!percentsOfDosage || percentsOfDosage.length === 0) {
                    throw new Error('PercentsOfDosage é obrigatório');
                }
                if (!aggregates || aggregates.length === 0) {
                    throw new Error('Aggregates é obrigatório');
                }
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
                            const missingGravity = missingSpecificGravity === null || missingSpecificGravity === void 0 ? void 0 : missingSpecificGravity.find(mg => mg._id === aggregates[i]._id);
                            if (missingGravity && missingGravity.hasRealData === false) {
                                listOfSpecificGravities[i] = Number(missingGravity.value);
                                console.log(`📝 Usando valor do frontend para ${aggregates[i].name}: ${missingGravity.value}`);
                            }
                            else if (listOfMaterials[i] !== null) {
                                if (listOfMaterials[i].generalData.material.type === 'coarseAggregate' ||
                                    listOfMaterials[i].generalData.material.type === 'fineAggregate') {
                                    let experiment = yield this.specificMassRepository.findOne({
                                        'generalData.material._id': listOfMaterials[i].generalData.material._id,
                                    });
                                    if (!experiment || !experiment.results || !experiment.results.bulk_specify_mass) {
                                        throw new Error(`Material ${aggregates[i].name} não possui massa específica válida`);
                                    }
                                    listOfSpecificGravities[i] = experiment.results.bulk_specify_mass;
                                    console.log(`📝 Usando valor do banco para ${aggregates[i].name}: ${listOfSpecificGravities[i]}`);
                                }
                            }
                            else {
                                throw new Error(`Material ${aggregates[i].name} não encontrado e sem valor fornecido`);
                            }
                            if (percentsOfDosage[i] && percentsOfDosage[i].length >= 5 && listOfSpecificGravities[i]) {
                                denominadorLessOne += percentsOfDosage[i][4] / listOfSpecificGravities[i];
                                denominadorLessHalf += percentsOfDosage[i][3] / listOfSpecificGravities[i];
                                denominador += percentsOfDosage[i][2] / listOfSpecificGravities[i];
                                denominadorPlusHalf += percentsOfDosage[i][1] / listOfSpecificGravities[i];
                                denominadorPlusOne += percentsOfDosage[i][0] / listOfSpecificGravities[i];
                                console.log(`🧮 Material ${i} (${aggregates[i].name}):`);
                                console.log(`   - Gravidade: ${listOfSpecificGravities[i]}`);
                                console.log(`   - Percents: [${percentsOfDosage[i].join(', ')}]`);
                            }
                        }
                        console.log('🧮 Denominadores calculados:', {
                            denominadorLessOne,
                            denominadorLessHalf,
                            denominador,
                            denominadorPlusHalf,
                            denominadorPlusOne
                        });
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
                        console.log('✅ DMT Calculado com sucesso:', maxSpecificGravity);
                        return { maxSpecificGravity, listOfSpecificGravities };
                    }
                    catch (error) {
                        console.error('💥 Erro no cálculo interno:', error);
                        throw new Error(`Failed to calculate max specific gravity: ${error.message}`);
                    }
                });
                const result = yield calculate();
                return result;
            }
            catch (error) {
                console.error('💥 Erro geral no calculateDmtData:', error);
                throw new Error(`Failed to calculate max specific gravity: ${error.message}`);
            }
        });
    }
    calculateGmmData(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { gmm: valuesOfGmm, temperatureOfWaterGmm, aggregates } = body;
                if (!valuesOfGmm || !Array.isArray(valuesOfGmm)) {
                    throw new Error('GMM values are required and must be an array');
                }
                if (!aggregates || !Array.isArray(aggregates)) {
                    throw new Error('Aggregates are required and must be an array');
                }
                const materials = aggregates.map((element) => element._id);
                const calculate = () => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const listOfMaterials = yield Promise.all(materials.map((materialId) => this.specificMassRepository.findOne({
                            'generalData.material._id': materialId,
                        })));
                        const listOfSpecificGravities = [];
                        for (let i = 0; i < listOfMaterials.length; i++) {
                            const material = listOfMaterials[i];
                            if (!material) {
                                listOfSpecificGravities.push(null);
                                continue;
                            }
                            if (!material.generalData || !material.generalData.material) {
                                listOfSpecificGravities.push(null);
                                continue;
                            }
                            const materialType = material.generalData.material.type;
                            const isAggregate = ['coarseAggregate', 'fineAggregate', 'filler'].includes(materialType);
                            let bulkSpecifyMass = null;
                            if (material.results &&
                                material.results.data &&
                                material.results.data.bulk_specify_mass !== undefined) {
                                bulkSpecifyMass = material.results.data.bulk_specify_mass;
                            }
                            if (isAggregate && bulkSpecifyMass !== null) {
                                listOfSpecificGravities.push(bulkSpecifyMass);
                            }
                            else {
                                listOfSpecificGravities.push(null);
                            }
                        }
                        return listOfSpecificGravities;
                    }
                    catch (error) {
                        this.logger.error(`Error in calculate function: ${error.message}`);
                        throw new Error('Failed to calculate specific gravities from database.');
                    }
                });
                const gmm = Array.from({ length: 5 }, (_, i) => {
                    const gmmItem = valuesOfGmm.find(gmm => gmm.id - 1 === i);
                    return gmmItem || null;
                });
                const content = gmm.map((gmmItem, index) => {
                    if (!gmmItem) {
                        this.logger.warn(`GMM item ${index + 1} is missing`);
                        return null;
                    }
                    if (gmmItem.value !== undefined && gmmItem.value !== null) {
                        return gmmItem.value;
                    }
                    const hasRequiredFields = gmmItem.massOfDrySample !== undefined &&
                        gmmItem.massOfContainer_Water_Sample !== undefined &&
                        gmmItem.massOfContainer_Water !== undefined &&
                        temperatureOfWaterGmm !== undefined;
                    if (!hasRequiredFields) {
                        this.logger.warn(`Missing required fields for GMM calculation at index ${index}`);
                        return null;
                    }
                    const massDry = parseFloat(gmmItem.massOfDrySample);
                    const massContainerWaterSample = parseFloat(gmmItem.massOfContainer_Water_Sample);
                    const massContainerWater = parseFloat(gmmItem.massOfContainer_Water);
                    const tempWater = parseFloat(temperatureOfWaterGmm);
                    if (isNaN(massDry) || isNaN(massContainerWaterSample) || isNaN(massContainerWater) || isNaN(tempWater)) {
                        this.logger.warn(`Invalid numeric values for GMM calculation at index ${index}`);
                        return null;
                    }
                    const denominator = massContainerWaterSample - massContainerWater;
                    const difference = massDry - denominator;
                    if (Math.abs(difference) < 0.0001) {
                        this.logger.warn(`Division by near-zero value in GMM calculation at index ${index}`);
                        return null;
                    }
                    const result = (massDry / difference) * tempWater;
                    if (isNaN(result) || !isFinite(result) || result <= 0) {
                        this.logger.warn(`Invalid GMM result at index ${index}: ${result}`);
                        return null;
                    }
                    return result;
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
                this.logger.error(`Error in calculateGmmData: ${error.message}`);
                this.logger.error(`Stack trace: ${error.stack}`);
                throw new Error(`Failed to calculate max specific gravity GMM: ${error.message}`);
            }
        });
    }
    calculateRiceTest(body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('calculate rice test > [body]', { body });
            try {
                const maxSpecificGravity = body.map((item) => {
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
    saveMistureMaximumDensityData(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('save marshall maximum misxture density data on maximum-mixture-density.marshall.service.ts > [body]', {
                    body,
                });
                const { name } = body.maximumMixtureDensityData;
                const marshallExists = yield this.marshallRepository.findOne(name, userId);
                const _a = body.maximumMixtureDensityData, { name: materialName } = _a, maximumMixtureDensityWithoutName = __rest(_a, ["name"]);
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