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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitMassRepository = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const database_config_1 = require("../../../../../infra/mongoose/database.config");
const mongoose_2 = require("mongoose");
const schemas_1 = require("../schemas");
let UnitMassRepository = class UnitMassRepository {
    constructor(unitMassModel) {
        this.unitMassModel = unitMassModel;
    }
    findOne(unitMassFilterQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.unitMassModel.findOne(unitMassFilterQuery);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.unitMassModel.findById(id);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.unitMassModel.find();
        });
    }
    findAllUnitMassesByMaterialId(materialId) {
        return __awaiter(this, void 0, void 0, function* () {
            const unitMassEssays = yield this.unitMassModel.find({ "generalData.material._id": materialId });
            return unitMassEssays;
        });
    }
    create(unitMass) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdUnitMass = new this.unitMassModel(unitMass);
            return createdUnitMass.save();
        });
    }
};
exports.UnitMassRepository = UnitMassRepository;
exports.UnitMassRepository = UnitMassRepository = __decorate([
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.UnitMass.name, database_config_1.DATABASE_CONNECTION.CONCRETE)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UnitMassRepository);
//# sourceMappingURL=index.js.map