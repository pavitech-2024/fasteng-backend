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
exports.ConcreteRtRepository = void 0;
const dist_1 = require("@nestjs/mongoose/dist");
const database_config_1 = require("../../../../../infra/mongoose/database.config");
const mongoose_1 = require("mongoose");
const schemas_1 = require("../schemas");
let ConcreteRtRepository = class ConcreteRtRepository {
    constructor(rtModel) {
        this.rtModel = rtModel;
    }
    findOne(rtFilterQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rtModel.findOne(rtFilterQuery);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rtModel.findById(id);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rtModel.find();
        });
    }
    findAllByMaterialId(unitMassFilterQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rtModel.find(unitMassFilterQuery);
        });
    }
    findAllRtsByMaterialId(materialId, type) {
        return __awaiter(this, void 0, void 0, function* () {
            let rtEssays;
            if (type === 'coarse') {
                rtEssays = yield this.rtModel.find({
                    "generalData.material._id": materialId,
                    "results.nominal_diameter": {
                        $gte: 9.5,
                        $lte: 37.5
                    }
                });
            }
            else if (type === 'fine') {
                rtEssays = yield this.rtModel.find({
                    "generalData.material._id": materialId,
                    "results.fineness_module": {
                        $gte: 1.8,
                        $lte: 3.6
                    }
                });
            }
            return rtEssays;
        });
    }
    create(rt) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdRt = new this.rtModel(rt);
            return createdRt.save();
        });
    }
};
ConcreteRtRepository = __decorate([
    __param(0, (0, dist_1.InjectModel)(schemas_1.RT.name, database_config_1.DATABASE_CONNECTION.CONCRETE)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], ConcreteRtRepository);
exports.ConcreteRtRepository = ConcreteRtRepository;
//# sourceMappingURL=index.js.map