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
var MaterialSelection_Marshall_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialSelection_Marshall_Service = void 0;
const common_1 = require("@nestjs/common");
const repository_1 = require("../../../../../modules/asphalt/essays/granulometry/repository");
const repository_2 = require("../../../../../modules/asphalt/materials/repository");
const mongoose_1 = require("mongoose");
const repository_3 = require("../repository");
const schemas_1 = require("../schemas");
const mongoose_2 = require("@nestjs/mongoose");
const database_config_1 = require("../../../../../infra/mongoose/database.config");
const repository_4 = require("../../../essays/viscosityRotational/repository");
const index_1 = require("../../../essays/specifyMass/repository/index");
let MaterialSelection_Marshall_Service = MaterialSelection_Marshall_Service_1 = class MaterialSelection_Marshall_Service {
    constructor(marshallModel, material_repository, granulometry_repository, marshallRepository, rotationalViscosity_repository, specificMass_repository) {
        this.marshallModel = marshallModel;
        this.material_repository = material_repository;
        this.granulometry_repository = granulometry_repository;
        this.marshallRepository = marshallRepository;
        this.rotationalViscosity_repository = rotationalViscosity_repository;
        this.specificMass_repository = specificMass_repository;
        this.logger = new common_1.Logger(MaterialSelection_Marshall_Service_1.name);
    }
    getMaterials(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('get materials on material-selection.marshall.service.ts > [body]', { userId: userId });
                const materials = yield this.material_repository.findByUserId({
                    userId: userId,
                });
                return materials;
            }
            catch (error) {
                throw error;
            }
        });
    }
    saveMaterials(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('save marshall materials step on material-selection.marshall.service.ts > [body]', { body });
                const { name } = body.materialSelectionData;
                const marshallExists = yield this.marshallRepository.findOne(name, userId);
                const _a = body.materialSelectionData, { name: materialName } = _a, materialDataWithoutName = __rest(_a, ["name"]);
                const marshallWithMaterials = Object.assign(Object.assign({}, marshallExists._doc), { materialSelectionData: materialDataWithoutName });
                yield this.marshallModel.updateOne({ _id: marshallExists._doc._id }, marshallWithMaterials);
                if (marshallExists._doc.generalData.step < 2) {
                    yield this.marshallRepository.saveStep(marshallExists, 2);
                }
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
};
exports.MaterialSelection_Marshall_Service = MaterialSelection_Marshall_Service;
exports.MaterialSelection_Marshall_Service = MaterialSelection_Marshall_Service = MaterialSelection_Marshall_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(schemas_1.Marshall.name, database_config_1.DATABASE_CONNECTION.ASPHALT)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        repository_2.MaterialsRepository,
        repository_1.AsphaltGranulometryRepository,
        repository_3.MarshallRepository,
        repository_4.ViscosityRotationalRepository,
        index_1.SpecifyMassRepository])
], MaterialSelection_Marshall_Service);
//# sourceMappingURL=material-selection.marshall.service.js.map