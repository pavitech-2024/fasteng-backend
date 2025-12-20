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
var VolumetricParameters_Marshall_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VolumetricParameters_Marshall_Service = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const schemas_1 = require("../schemas");
const database_config_1 = require("../../../../../infra/mongoose/database.config");
const mongoose_2 = require("mongoose");
const repository_1 = require("../repository");
let VolumetricParameters_Marshall_Service = VolumetricParameters_Marshall_Service_1 = class VolumetricParameters_Marshall_Service {
    constructor(marshallModel, marshallRepository) {
        this.marshallModel = marshallModel;
        this.marshallRepository = marshallRepository;
        this.logger = new common_1.Logger(VolumetricParameters_Marshall_Service_1.name);
    }
    setVolumetricParameters(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('set volumetric parameters data on volumetric-parameters.marshall.service.ts > [body]', {
                    body,
                });
                const { volumetricParametersData } = body;
                const { trial: binderTrial, maxSpecificGravity, temperatureOfWater, } = body;
                if (!maxSpecificGravity) {
                    throw new Error('maxSpecificGravity is required');
                }
                const gravityData = maxSpecificGravity.results || maxSpecificGravity.result;
                if (!gravityData) {
                    throw new Error('maxSpecificGravity must have either "result" or "results" property');
                }
                this.logger.log(`Gravity structure: ${JSON.stringify({
                    hasResult: !!maxSpecificGravity.result,
                    hasResults: !!maxSpecificGravity.results,
                    method: maxSpecificGravity.method,
                    gravityDataKeys: Object.keys(gravityData)
                })}`);
                let pointsOfCurveDosageVv = [];
                let pointsOfCurveDosageRBV = [];
                let volumetricParameters = [];
                let asphaltContent;
                let newArray = [];
                Object.entries(volumetricParametersData).forEach(([key, value]) => {
                    const allNonNull = value.every((obj) => Object.values(obj).every((val) => val !== null));
                    if (allNonNull) {
                        const newObj = {};
                        newObj[key] = value;
                        newArray.push(newObj);
                    }
                });
                for (let i = 0; i < newArray.length; i++) {
                    let sumOfDryMass = 0;
                    let sumOfSaturatedMass = 0;
                    let sumOfSubmergedMass = 0;
                    let sumStability = 0;
                    let sumFluency = 0;
                    let sumIndirectTensileStrength = 0;
                    let nStability = 0;
                    let nFluency = 0;
                    let nIndirectTensileStrength = 0;
                    let nDryMass = 0;
                    let nSubmergedMass = 0;
                    let nSaturatedMass = 0;
                    let usedMaxSpecifyGravity;
                    let asphaltContentResult;
                    asphaltContent = Object.keys(newArray[i])[0];
                    switch (asphaltContent) {
                        case 'lessOne':
                            usedMaxSpecifyGravity = gravityData.lessOne;
                            asphaltContentResult = binderTrial - 1;
                            break;
                        case 'lessHalf':
                            usedMaxSpecifyGravity = gravityData.lessHalf;
                            asphaltContentResult = binderTrial - 0.5;
                            break;
                        case 'normal':
                            usedMaxSpecifyGravity = gravityData.normal;
                            asphaltContentResult = binderTrial;
                            break;
                        case 'plusHalf':
                            usedMaxSpecifyGravity = gravityData.plusHalf;
                            asphaltContentResult = binderTrial + 0.5;
                            break;
                        case 'plusOne':
                            usedMaxSpecifyGravity = gravityData.plusOne;
                            asphaltContentResult = binderTrial + 1;
                            break;
                        default:
                            throw new Error('Invalid asphalt content');
                    }
                    if (!usedMaxSpecifyGravity) {
                        throw new Error(`Could not find max specific gravity for ${asphaltContent}`);
                    }
                    for (let j = 0; j < newArray[i][asphaltContent].length; j++) {
                        const { dryMass, drySurfaceSaturatedMass, submergedMass, stability, fluency, diametricalCompressionStrength, } = newArray[i][asphaltContent][j];
                        sumOfDryMass += dryMass;
                        sumOfSaturatedMass += drySurfaceSaturatedMass;
                        sumOfSubmergedMass += submergedMass;
                        nDryMass++;
                        nSubmergedMass++;
                        nSaturatedMass++;
                        if (stability !== 0) {
                            sumStability += stability;
                            nStability++;
                        }
                        if (fluency !== 0) {
                            sumFluency += fluency;
                            nFluency++;
                        }
                        if (diametricalCompressionStrength !== 0) {
                            sumIndirectTensileStrength += diametricalCompressionStrength;
                            nIndirectTensileStrength++;
                        }
                    }
                    if (nStability === 0)
                        nStability = 1;
                    if (nFluency === 0)
                        nFluency = 1;
                    if (nIndirectTensileStrength === 0)
                        nIndirectTensileStrength = 1;
                    const stabilityBar = sumStability / nStability;
                    const fluencyBar = sumFluency / nFluency;
                    const diametricalCompressionStrengthBar = sumIndirectTensileStrength / nIndirectTensileStrength;
                    const sampleData = {
                        asphaltContent: asphaltContentResult,
                        sumOfDryMass,
                        sumOfSubmergedMass,
                        sumOfSaturatedMass,
                        stability: stabilityBar,
                        fluency: fluencyBar,
                        diametricalCompressionStrength: diametricalCompressionStrengthBar,
                        temperatureOfWater,
                        maxSpecificGravity: usedMaxSpecifyGravity,
                    };
                    const { pointsOfCurveDosageVv: returnVv, pointsOfCurveDosageRBV: returnRBV, volumetricParameters: returnVp, } = yield this.calculateVolumetricParameters(sampleData);
                    pointsOfCurveDosageVv.push(...returnVv);
                    pointsOfCurveDosageRBV.push(...returnRBV);
                    volumetricParameters.push(...returnVp);
                }
                return { volumetricParameters, pointsOfCurveDosageRBV, pointsOfCurveDosageVv };
            }
            catch (error) {
                this.logger.error(`Failed to set volumetric parameters: ${error.message}`);
                throw new Error(`Failed to set volumetric parameters: ${error.message}`);
            }
        });
    }
    calculateVolumetricParameters(samplesData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let pointsOfCurveDosageVv = [];
                let pointsOfCurveDosageRBV = [];
                let volumetricParameters = [];
                const { asphaltContent, sumOfSaturatedMass, sumOfDryMass, sumOfSubmergedMass, stability, fluency, diametricalCompressionStrength, temperatureOfWater, maxSpecificGravity, } = samplesData;
                const samplesVolumes = sumOfSaturatedMass - sumOfSubmergedMass;
                const apparentBulkSpecificGravity = (sumOfDryMass / samplesVolumes) * temperatureOfWater;
                const volumeVoids = (maxSpecificGravity - apparentBulkSpecificGravity) / maxSpecificGravity;
                const voidsFilledAsphalt = (apparentBulkSpecificGravity * asphaltContent) / 102.7;
                const aggregateVolumeVoids = volumeVoids + voidsFilledAsphalt;
                const ratioBitumenVoid = voidsFilledAsphalt / aggregateVolumeVoids;
                volumetricParameters.push({
                    asphaltContent,
                    values: {
                        volumeVoids,
                        apparentBulkSpecificGravity,
                        voidsFilledAsphalt,
                        aggregateVolumeVoids,
                        ratioBitumenVoid,
                        fluency,
                        stability,
                        diametricalCompressionStrength,
                        maxSpecificGravity,
                    },
                });
                pointsOfCurveDosageVv.push({ x: asphaltContent, y: volumeVoids });
                pointsOfCurveDosageRBV.push({ x: asphaltContent, y: ratioBitumenVoid });
                return {
                    pointsOfCurveDosageVv,
                    pointsOfCurveDosageRBV,
                    volumetricParameters,
                };
            }
            catch (error) {
                throw new Error(`Failed to set volumetric parameters: ${error}`);
            }
        });
    }
    confirmVolumetricParameters(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { valuesOfVolumetricParameters, confirmedSpecificGravity, optimumContent, confirmedPercentsOfDosage, listOfSpecificGravities, temperatureOfWater, } = body;
                let sumDryMass = 0;
                let sumSubmergedMass = 0;
                let sumSaturatedMass = 0;
                let sumStability = 0;
                let sumFluency = 0;
                let sumIndirectTensileStrength = 0;
                let nStability = 0;
                let nFluency = 0;
                let nIndirectTensileStrength = 0;
                let nDryMass = 0;
                let nSubmergedMass = 0;
                let nSaturatedMass = 0;
                for (let i = 0; i < valuesOfVolumetricParameters.length; i++) {
                    sumDryMass += valuesOfVolumetricParameters[i].dryMass;
                    sumSubmergedMass += valuesOfVolumetricParameters[i].submergedMass;
                    sumSaturatedMass += valuesOfVolumetricParameters[i].drySurfaceSaturatedMass;
                    nDryMass++;
                    nSubmergedMass++;
                    nSaturatedMass++;
                    if (valuesOfVolumetricParameters[i].stability !== 0) {
                        sumStability += valuesOfVolumetricParameters[i].stability;
                        nStability++;
                    }
                    if (valuesOfVolumetricParameters[i].fluency !== 0) {
                        sumFluency += valuesOfVolumetricParameters[i].fluency;
                        nFluency++;
                    }
                    if (valuesOfVolumetricParameters[i].indirectTensileStrength !== 0) {
                        sumIndirectTensileStrength += valuesOfVolumetricParameters[i].diametricalCompressionStrength;
                        nIndirectTensileStrength++;
                    }
                }
                let dryMass = sumDryMass / nDryMass;
                let saturatedMass = sumSaturatedMass / nSaturatedMass;
                let submergedMass = sumSubmergedMass / nSubmergedMass;
                if (nStability === 0)
                    nStability = 1;
                if (nFluency === 0)
                    nFluency = 1;
                if (nIndirectTensileStrength === 0)
                    nIndirectTensileStrength = 1;
                const stabilityBar = sumStability / nStability;
                const fluencyBar = sumFluency / nFluency;
                const indirectTensileStrengthBar = sumIndirectTensileStrength / nIndirectTensileStrength;
                const samplesVolumes = saturatedMass - submergedMass;
                const apparentBulkSpecificGravity = (dryMass / samplesVolumes) * temperatureOfWater;
                const volumeVoids = (confirmedSpecificGravity - apparentBulkSpecificGravity) / confirmedSpecificGravity;
                const voidsFilledAsphalt = (apparentBulkSpecificGravity * optimumContent) / 102.7;
                const aggregateVolumeVoids = volumeVoids + voidsFilledAsphalt;
                const ratioBitumenVoid = voidsFilledAsphalt / aggregateVolumeVoids;
                const quantitative = confirmedPercentsOfDosage.map((percent, i) => (confirmedSpecificGravity * percent * 10) / 1000 / listOfSpecificGravities[i]);
                quantitative.unshift(optimumContent * 10 * confirmedSpecificGravity);
                const confirmedVolumetricParameters = {
                    valuesOfVolumetricParameters,
                    asphaltContent: optimumContent,
                    quantitative,
                    values: {
                        volumeVoids,
                        apparentBulkSpecificGravity,
                        voidsFilledAsphalt,
                        aggregateVolumeVoids,
                        ratioBitumenVoid,
                        stability: stabilityBar,
                        fluency: fluencyBar,
                        indirectTensileStrength: indirectTensileStrengthBar,
                    },
                };
                return confirmedVolumetricParameters;
            }
            catch (error) {
                throw new Error(`Failed to confirm volumetric parameters: ${error}`);
            }
        });
    }
    temperaturesOfWater(name) {
        const list = {
            '15°C - 0.9991': 0.9991,
            '16°C - 0.9989': 0.9989,
            '17°C - 0.9988': 0.9988,
            '18°C - 0.9986': 0.9986,
            '19°C - 0.9984': 0.9984,
            '20°C - 0.9982': 0.9982,
            '21°C - 0.9980': 0.998,
            '22°C - 0.9978': 0.9978,
            '23°C - 0.9975': 0.9975,
            '24°C - 0.9973': 0.9973,
            '25°C - 0.9970': 0.997,
            '26°C - 0.9968': 0.9968,
            '27°C - 0.9965': 0.9965,
            '28°C - 0.9962': 0.9962,
            '29°C - 0.9959': 0.9959,
            '30°C - 0.9956': 0.9956,
        };
        return list[name];
    }
    saveVolumetricParametersData(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('save marshall volumetric parameters step on volumetric-parameters.marshall.service.ts > [body]', {
                    body,
                });
                const { name } = body.volumetricParametersData;
                const marshallExists = yield this.marshallRepository.findOne(name, userId);
                const _a = body.volumetricParametersData, { name: materialName } = _a, volumetricParametersWithoutName = __rest(_a, ["name"]);
                const marshallWithVolumetricParameters = Object.assign(Object.assign({}, marshallExists._doc), { volumetricParametersData: volumetricParametersWithoutName });
                yield this.marshallModel.updateOne({ _id: marshallExists._doc._id }, marshallWithVolumetricParameters);
                if (marshallExists._doc.generalData.step < 6) {
                    yield this.marshallRepository.saveStep(marshallExists, 6);
                }
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
};
exports.VolumetricParameters_Marshall_Service = VolumetricParameters_Marshall_Service;
exports.VolumetricParameters_Marshall_Service = VolumetricParameters_Marshall_Service = VolumetricParameters_Marshall_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.Marshall.name, database_config_1.DATABASE_CONNECTION.ASPHALT)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        repository_1.MarshallRepository])
], VolumetricParameters_Marshall_Service);
//# sourceMappingURL=volumetric-parameters.service.js.map