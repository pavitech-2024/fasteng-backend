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
    return function (target, key) { decorator(target, key, paramIndex); };
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
                const materials = aggregates.map((element) => element._id);

                const materialsData = yield Promise.all(
                    materials.map((materialId) =>
                        this.specificMassRepository.findOne({
                            'generalData.material._id': materialId,
                        })
                    )
                );

                const missesSpecificGravity = materialsData.map((material, index) => {
                    if (!material) {
                        this.logger.warn(`Material ${materials[index]} not found in SpecifyMass database`);
                        return {
                            value: 2.65,
                            _id: materials[index],
                            name: aggregates[index]?.name || `Material ${index + 1}`,
                            hasRealData: false,
                            status: 'not_found',
                        };
                    }

                    let bulkSpecifyMass = null;
                    const resultsAny = material.results;

                    if (resultsAny?.bulk_specify_mass !== undefined) {
                        bulkSpecifyMass = resultsAny.bulk_specify_mass;
                    }
                    else if (resultsAny?.data?.bulk_specify_mass !== undefined) {
                        bulkSpecifyMass = resultsAny.data.bulk_specify_mass;
                    }

                    if (!bulkSpecifyMass || bulkSpecifyMass <= 0 || bulkSpecifyMass > 5) {
                        this.logger.warn(`Invalid bulk_specify_mass for material ${material._id}, using fallback`);
                        bulkSpecifyMass = 2.65;
                    }

                    return {
                        value: bulkSpecifyMass,
                        _id: material._id.toString(),
                        name: material.generalData.material.name,
                        materialType: material.generalData.material.type,
                        hasRealData: bulkSpecifyMass !== 2.65,
                        status: bulkSpecifyMass !== 2.65 ? 'real_data' : 'fallback',
                    };
                });

                return {
                    missesSpecificGravity,
                    summary: {
                        totalAggregates: aggregates.length,
                        foundInDb: materialsData.filter(Boolean).length,
                        hasRealData: missesSpecificGravity.filter(i => i.hasRealData).length,
                        usingFallback: missesSpecificGravity.filter(i => !i.hasRealData).length,
                    },
                };
            }
            catch (error) {
                this.logger.error(error.message);
                throw error;
            }
        });
    }

    calculateGmmData(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { gmm, temperatureOfWaterGmm, aggregates } = body;

                const content = gmm.map((item, index) => {
                    if (item?.value) return item.value;

                    const denominator =
                        item.massOfContainer_Water_Sample - item.massOfContainer_Water;

                    if (!denominator || denominator === 0) return null;

                    return (
                        (item.massOfDrySample /
                            (item.massOfDrySample - denominator)) *
                        temperatureOfWaterGmm
                    );
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

                return { maxSpecificGravity };
            }
            catch (error) {
                this.logger.error(error.message);
                throw error;
            }
        });
    }

    saveMistureMaximumDensityData(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = body.maximumMixtureDensityData;
                const marshallExists = yield this.marshallRepository.findOne(name, userId);

                const _a = body.maximumMixtureDensityData,
                    { name: materialName } = _a,
                    maximumMixtureDensityWithoutName = __rest(_a, ["name"]);

                const marshallWithMaximumMixtureDensity = Object.assign(
                    Object.assign({}, marshallExists._doc),
                    { maximumMixtureDensityData: maximumMixtureDensityWithoutName }
                );

                yield this.marshallModel.updateOne(
                    { _id: marshallExists._doc._id },
                    marshallWithMaximumMixtureDensity
                );

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

exports.MaximumMixtureDensity_Marshall_Service =
    MaximumMixtureDensity_Marshall_Service =
    MaximumMixtureDensity_Marshall_Service_1 =
        __decorate([
            (0, common_1.Injectable)(),
            __param(
                0,
                (0, mongoose_1.InjectModel)(
                    schemas_1.Marshall.name,
                    database_config_1.DATABASE_CONNECTION.ASPHALT
                )
            ),
            __metadata("design:paramtypes", [
                mongoose_2.Model,
                repository_1.MarshallRepository,
                repository_2.MaterialsRepository,
                repository_3.SpecifyMassRepository,
            ]),
        ], MaximumMixtureDensity_Marshall_Service);

//# sourceMappingURL=maximumMixtureDensity.service.js.map
