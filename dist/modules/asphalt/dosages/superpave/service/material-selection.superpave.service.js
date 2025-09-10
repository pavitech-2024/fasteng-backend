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
};
exports.MaterialSelection_Superpave_Service = MaterialSelection_Superpave_Service;
exports.MaterialSelection_Superpave_Service = MaterialSelection_Superpave_Service = MaterialSelection_Superpave_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.Superpave.name, database_config_1.DATABASE_CONNECTION.ASPHALT)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        repository_3.MaterialsRepository,
        repository_1.AsphaltGranulometryRepository,
        repository_2.SpecifyMassRepository,
        repository_4.SuperpaveRepository,
        repository_5.ViscosityRotationalRepository])
], MaterialSelection_Superpave_Service);
//# sourceMappingURL=material-selection.superpave.service.js.map