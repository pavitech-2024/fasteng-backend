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
                        var _a;
                        if (!material) {
                            this.logger.error(`❌ Material ${materialsArray[index]} not found in SpecifyMass database`);
                            return null;
                        }
                        let bulkSpecifyMass = null;
                        const resultsAny = material.results;
                        if ((resultsAny === null || resultsAny === void 0 ? void 0 : resultsAny.bulk_specify_mass) !== undefined) {
                            bulkSpecifyMass = resultsAny.bulk_specify_mass;
                        }
                        else if (((_a = resultsAny === null || resultsAny === void 0 ? void 0 : resultsAny.data) === null || _a === void 0 ? void 0 : _a.bulk_specify_mass) !== undefined) {
                            bulkSpecifyMass = resultsAny.data.bulk_specify_mass;
                        }
                        else if ((resultsAny === null || resultsAny === void 0 ? void 0 : resultsAny.apparent_specific_mass) !== undefined) {
                            bulkSpecifyMass = resultsAny.apparent_specific_mass;
                        }
                        if (bulkSpecifyMass === null || bulkSpecifyMass === undefined) {
                            this.logger.error(`❌ bulk_specify_mass não encontrado para material: ${material._id}`);
                            return null;
                        }
                        const numValue = Number(bulkSpecifyMass);
                        if (isNaN(numValue) || numValue <= 0 || numValue > 5) {
                            this.logger.error(`❌ Valor inválido de bulk_specify_mass (${bulkSpecifyMass}) para material: ${material._id}`);
                            return null;
                        }
                        return {
                            value: numValue,
                            _id: material._id.toString(),
                            name: material.generalData.material.name,
                            materialType: material.generalData.material.type,
                            hasRealData: true,
                            status: 'real_data'
                        };
                    });
                    const hasNullValues = withoutExperimentSpecificGravity.some(item => item === null);
                    if (hasNullValues) {
                        throw new Error('Um ou mais materiais não possuem massa específica válida no banco de dados');
                    }
                    this.logger.log(`Returning ${withoutExperimentSpecificGravity.length} indexes`);
                    return {
                        missesSpecificGravity: withoutExperimentSpecificGravity,
                        summary: {
                            totalAggregates: aggregates.length,
                            foundInDb: materialsData.filter(m => m !== null).length,
                            hasRealData: withoutExperimentSpecificGravity.filter(i => i === null || i === void 0 ? void 0 : i.hasRealData).length
                        }
                    };
                });
                return yield getIndexesOfMissesSpecificGravity(materials);
            }
            catch (error) {
                this.logger.error(`Error in getIndexesOfMissesSpecificGravity: ${error.message}`);
                throw new Error(`Failed to get specific gravity indexes: ${error.message}`);
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
                console.log('🚀 ===== CALCULO GMM =====');
                console.log('🔍 Body recebido:', JSON.stringify(body, null, 2));
                const { gmm: valuesOfGmm, temperatureOfWaterGmm, aggregates, listOfSpecificGravities: specificGravitiesFromFrontend } = body;
                console.log('🔍 Dados extraídos:');
                console.log('- valuesOfGmm:', valuesOfGmm === null || valuesOfGmm === void 0 ? void 0 : valuesOfGmm.length);
                console.log('- aggregates:', aggregates === null || aggregates === void 0 ? void 0 : aggregates.length);
                console.log('- specificGravitiesFromFrontend:', specificGravitiesFromFrontend);
                if (!valuesOfGmm || !Array.isArray(valuesOfGmm)) {
                    throw new Error('GMM values are required and must be an array');
                }
                if (!aggregates || !Array.isArray(aggregates)) {
                    throw new Error('Aggregates are required and must be an array');
                }
                let listOfSpecificGravities = [];
                if (specificGravitiesFromFrontend &&
                    Array.isArray(specificGravitiesFromFrontend) &&
                    specificGravitiesFromFrontend.length === aggregates.length &&
                    specificGravitiesFromFrontend.every(val => val !== null && val !== undefined)) {
                    console.log('✅ Usando specificGravitiesFromFrontend:', specificGravitiesFromFrontend);
                    listOfSpecificGravities = specificGravitiesFromFrontend.map(val => Number(val));
                }
                else {
                    console.log('⚠️ specificGravitiesFromFrontend não veio ou inválido, buscando do banco...');
                    listOfSpecificGravities = yield this.getSpecificGravitiesFromDatabase(aggregates);
                }
                console.log('✅ listOfSpecificGravities final:', listOfSpecificGravities);
                const calculateGmmValues = () => {
                    console.log('🧮 Calculando valores GMM...');
                    const gmmItems = Array.from({ length: 5 }, (_, i) => {
                        return valuesOfGmm.find(gmm => gmm.id - 1 === i);
                    });
                    console.log('📊 GMM items processados:', gmmItems.map((g, i) => ({ id: i + 1, data: g })));
                    const gmmValues = gmmItems.map((gmmItem, index) => {
                        if (!gmmItem) {
                            console.warn(`⚠️ GMM item ${index + 1} está faltando`);
                            return null;
                        }
                        if (gmmItem.value !== undefined && gmmItem.value !== null) {
                            console.log(`📊 GMM ${index + 1}: Usando valor direto = ${gmmItem.value}`);
                            return gmmItem.value;
                        }
                        const requiredFields = [
                            'massOfDrySample',
                            'massOfContainerWaterSample',
                            'massOfContainerWater'
                        ];
                        const missingFields = requiredFields.filter(field => gmmItem[field] === undefined || gmmItem[field] === null);
                        if (missingFields.length > 0) {
                            console.warn(`⚠️ Campos faltando para GMM ${index + 1}:`, missingFields);
                            return null;
                        }
                        const massDry = parseFloat(gmmItem.massOfDrySample);
                        const massContainerWaterSample = parseFloat(gmmItem.massOfContainerWaterSample);
                        const massContainerWater = parseFloat(gmmItem.massOfContainerWater);
                        const tempWater = temperatureOfWaterGmm ? parseFloat(temperatureOfWaterGmm) : 0.9982;
                        if (isNaN(massDry) || isNaN(massContainerWaterSample) ||
                            isNaN(massContainerWater) || isNaN(tempWater)) {
                            console.warn(`⚠️ Valores não numéricos para GMM ${index + 1}`);
                            return null;
                        }
                        const denominator = massContainerWaterSample - massContainerWater;
                        const difference = massDry - denominator;
                        console.log(`🧮 Cálculo GMM ${index + 1}:`);
                        console.log(`   massDry: ${massDry}`);
                        console.log(`   massContainerWaterSample: ${massContainerWaterSample}`);
                        console.log(`   massContainerWater: ${massContainerWater}`);
                        console.log(`   tempWater: ${tempWater}`);
                        console.log(`   denominator: ${denominator}`);
                        console.log(`   difference: ${difference}`);
                        if (Math.abs(difference) < 0.0001) {
                            console.warn(`⚠️ Divisão por valor muito pequeno no GMM ${index + 1}`);
                            return null;
                        }
                        const result = (massDry / difference) * tempWater;
                        console.log('✅ ===== RESULTADO QUE SERÁ RETORNADO =====');
                        console.log('📊 maxSpecificGravity:', maxSpecificGravity);
                        console.log('📊 listOfSpecificGravities REAL:', listOfSpecificGravities);
                        console.log('📊 É null?', listOfSpecificGravities.some(v => v === null));
                        console.log('===================================');
                        console.log(`   result: ${result}`);
                        if (isNaN(result) || !isFinite(result) || result <= 0 || result > 5) {
                            console.warn(`⚠️ Resultado GMM inválido ${index + 1}: ${result}`);
                            return null;
                        }
                        return result;
                    });
                    console.log('📊 Valores GMM calculados:', gmmValues);
                    return gmmValues;
                };
                const gmmValues = calculateGmmValues();
                const validGmmValues = gmmValues.filter(v => v !== null && v !== undefined);
                if (validGmmValues.length < 2) {
                    throw new Error(`Apenas ${validGmmValues.length} valores GMM válidos. São necessários pelo menos 2.`);
                }
                const maxSpecificGravity = {
                    result: {
                        lessOne: gmmValues[0],
                        lessHalf: gmmValues[1],
                        normal: gmmValues[2],
                        plusHalf: gmmValues[3],
                        plusOne: gmmValues[4],
                    },
                    method: 'GMM',
                };
                console.log('✅ ===== RESULTADO FINAL GMM =====');
                console.log('📊 maxSpecificGravity:', JSON.stringify(maxSpecificGravity, null, 2));
                console.log('📊 listOfSpecificGravities:', listOfSpecificGravities);
                console.log('📊 Todos válidos?', listOfSpecificGravities.every(sg => sg && sg > 0));
                console.log('===================================');
                return {
                    maxSpecificGravity,
                    listOfSpecificGravities
                };
            }
            catch (error) {
                console.error('💥 Erro FATAL no calculateGmmData:', error.message);
                console.error('💥 Stack trace:', error.stack);
                throw new Error(`Falha no cálculo GMM: ${error.message}`);
            }
        });
    }
    getSpecificGravitiesFromDatabase(aggregates) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const specificGravities = [];
            for (const agg of aggregates) {
                const material = yield this.specificMassRepository.findOne({
                    'generalData.material._id': agg._id,
                });
                if (!material) {
                    throw new Error(`Material ${agg.name} não encontrado`);
                }
                const results = material.results;
                const value = (results === null || results === void 0 ? void 0 : results.bulk_specify_mass) || ((_a = results === null || results === void 0 ? void 0 : results.data) === null || _a === void 0 ? void 0 : _a.bulk_specify_mass);
                if (!value) {
                    throw new Error(`Massa específica não encontrada para ${agg.name}`);
                }
                specificGravities.push(Number(value));
            }
            return specificGravities;
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
                this.logger.log('save marshall maximum mixture density data > [body]', { body });
                const { name } = body.maximumMixtureDensityData;
                const marshallExists = yield this.marshallRepository.findOne(name, userId);
                const { listOfSpecificGravities } = body.maximumMixtureDensityData;
                if (!listOfSpecificGravities || listOfSpecificGravities.some(val => val === null || val === undefined)) {
                    throw new Error('listOfSpecificGravities contém valores null/undefined');
                }
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