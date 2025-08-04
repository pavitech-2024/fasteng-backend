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
var MaterialSelection_Superpave_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialSelection_Superpave_Service = void 0;
const common_1 = require("@nestjs/common");
const repository_1 = require("../../../../../modules/asphalt/essays/granulometry/repository");
const repository_2 = require("../../../../../modules/asphalt/essays/specifyMass/repository");
const repository_3 = require("../../../../../modules/asphalt/materials/repository");
const mongoose_1 = require("@nestjs/mongoose");
const database_config_1 = require("../../../../../infra/mongoose/database.config");
const mongoose_2 = require("mongoose");
const schemas_1 = require("../schemas");
const repository_4 = require("../repository");
const repository_5 = require("../../../essays/viscosityRotational/repository");
let MaterialSelection_Superpave_Service = MaterialSelection_Superpave_Service_1 = class MaterialSelection_Superpave_Service {
    constructor(superpaveModel, material_repository, granulometry_repository, specifyMass_repository, superpaveRepository, rotationalViscosity_repository) {
        this.superpaveModel = superpaveModel;
        this.material_repository = material_repository;
        this.granulometry_repository = granulometry_repository;
        this.specifyMass_repository = specifyMass_repository;
        this.superpaveRepository = superpaveRepository;
        this.rotationalViscosity_repository = rotationalViscosity_repository;
        this.logger = new common_1.Logger(MaterialSelection_Superpave_Service_1.name);
    }
    getMaterials(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const materials = yield this.material_repository.findByUserId({
                    userId: userId,
                });
                const granulometrys = yield this.granulometry_repository.findAll();
                const specifyMasses = yield this.specifyMass_repository.findAll();
                const viscosities = yield this.rotationalViscosity_repository.findAll();
                const binders = materials.filter(({ _id }) => {
                    const viscosity = viscosities.some(({ generalData }) => {
                        const { material } = generalData;
                        return _id.toString() === material._id.toString();
                    });
                    return viscosity;
                });
                const aggregates = materials.filter(({ _id, type }) => {
                    if (type === 'CAP' || type === 'asphaltBinder')
                        return false;
                    const granulometry = granulometrys.some(({ generalData }) => {
                        const { material } = generalData;
                        return _id.toString() === material._id.toString();
                    });
                    const specifyMass = specifyMasses.some(({ generalData }) => {
                        const { material } = generalData;
                        return _id.toString() === material._id.toString();
                    });
                    return granulometry;
                });
                const filteredMaterials = binders.concat(aggregates);
                return filteredMaterials;
            }
            catch (error) {
                throw error;
            }
        });
    }
    saveMaterials(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Teste");
            try {
                this.logger.log('save superpave materials step on material-selection.superpave.service.ts > [body]', { body });
                const { name } = body.materialSelectionData;
                const superpaveExists = yield this.superpaveRepository.findOne(name, userId);
                const _a = body.materialSelectionData, { name: materialName } = _a, materialDataWithoutName = __rest(_a, ["name"]);
                const superpaveWithMaterials = Object.assign(Object.assign({}, superpaveExists._doc), { materialSelectionData: materialDataWithoutName });
                yield this.superpaveModel.updateOne({ _id: superpaveExists._doc._id }, superpaveWithMaterials);
                if (superpaveExists._doc.generalData.step < 2) {
                    yield this.superpaveRepository.saveStep(superpaveExists, 2);
                }
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
};
MaterialSelection_Superpave_Service = MaterialSelection_Superpave_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.Superpave.name, database_config_1.DATABASE_CONNECTION.ASPHALT)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        repository_3.MaterialsRepository,
        repository_1.AsphaltGranulometryRepository,
        repository_2.SpecifyMassRepository,
        repository_4.SuperpaveRepository,
        repository_5.ViscosityRotationalRepository])
], MaterialSelection_Superpave_Service);
exports.MaterialSelection_Superpave_Service = MaterialSelection_Superpave_Service;
//# sourceMappingURL=material-selection.superpave.service.js.map