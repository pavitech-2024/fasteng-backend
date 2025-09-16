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
var EssaySelection_ABCP_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EssaySelection_ABCP_Service = void 0;
const common_1 = require("@nestjs/common");
const repository_1 = require("../../../../../modules/concrete/materials/repository");
const repository_2 = require("../../../../../modules/concrete/essays/granulometry/repository");
const repository_3 = require("../../../../../modules/concrete/essays/unitMass/repository");
const repository_4 = require("../repository");
const mongoose_1 = require("@nestjs/mongoose");
const database_config_1 = require("../../../../../infra/mongoose/database.config");
const mongoose_2 = require("mongoose");
const schemas_1 = require("../schemas");
let EssaySelection_ABCP_Service = EssaySelection_ABCP_Service_1 = class EssaySelection_ABCP_Service {
    constructor(abcpModel, material_repository, granulometry_repository, unit_mass_repository, abcpRepository) {
        this.abcpModel = abcpModel;
        this.material_repository = material_repository;
        this.granulometry_repository = granulometry_repository;
        this.unit_mass_repository = unit_mass_repository;
        this.abcpRepository = abcpRepository;
        this.logger = new common_1.Logger(EssaySelection_ABCP_Service_1.name);
    }
    getEssays({ cement, coarseAggregate, fineAggregate }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const materials = yield this.material_repository.find();
                const cementData = materials.find((material) => {
                    const { name } = material;
                    if (material._id.toString() === cement.id.toString()) {
                        return {
                            cement,
                            name,
                        };
                    }
                });
                const coarseGranulometrys = yield this.granulometry_repository.findAllGranulometrysByMaterialId(coarseAggregate.id.toString(), 'coarse');
                const fineGranulometrys = yield this.granulometry_repository.findAllGranulometrysByMaterialId(fineAggregate.id, 'fine');
                const unit_masses = yield this.unit_mass_repository.findAllUnitMassesByMaterialId(coarseAggregate.id);
                const coarseAggregates = materials
                    .filter((material) => coarseAggregate.id.toString() === material._id.toString())
                    .map((material) => {
                    const granulometry_esssays = coarseGranulometrys.filter((essay) => (essay.generalData.material._id.toString() === material._id.toString()));
                    const unit_mass_essays = unit_masses.filter((essay) => (essay.generalData.material._id.toString() === material._id.toString()));
                    return {
                        _id: material._id,
                        name: material.name,
                        granulometrys: granulometry_esssays,
                        unit_masses: unit_mass_essays,
                    };
                });
                const coarseAggregateData = coarseAggregates.length > 0 ? coarseAggregates[0] : null;
                const fineAggregates = materials
                    .filter((material) => fineAggregate.id.toString() === material._id.toString())
                    .map((material) => {
                    const granulometry_esssays = fineGranulometrys.filter((essay) => (essay.generalData.material._id.toString() === material._id.toString()));
                    return {
                        _id: material._id,
                        name: material.name,
                        granulometrys: granulometry_esssays,
                    };
                });
                const fineAggregateData = fineAggregates.length > 0 ? fineAggregates[0] : null;
                return {
                    cementData,
                    coarseAggregateData,
                    fineAggregateData,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    saveEssays(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('save abcp essays step on essays-selection.abcp.service.ts > [body]', { body });
                const { name } = body.essaySelectionData;
                const abcpExists = yield this.abcpRepository.findOne(name, userId);
                const _a = body.essaySelectionData, { name: essayName } = _a, essayDataWithoutName = __rest(_a, ["name"]);
                const abcpWithEssays = Object.assign(Object.assign({}, abcpExists._doc), { essaySelectionData: essayDataWithoutName });
                yield this.abcpModel.updateOne({ "_id": abcpExists._id }, abcpWithEssays);
                yield this.abcpRepository.saveStep(abcpExists._doc, 3);
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
};
EssaySelection_ABCP_Service = EssaySelection_ABCP_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.ABCP.name, database_config_1.DATABASE_CONNECTION.CONCRETE)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        repository_1.MaterialsRepository,
        repository_2.ConcreteGranulometryRepository,
        repository_3.UnitMassRepository,
        repository_4.ABCPRepository])
], EssaySelection_ABCP_Service);
exports.EssaySelection_ABCP_Service = EssaySelection_ABCP_Service;
//# sourceMappingURL=essay-selection.abcp.service.js.map