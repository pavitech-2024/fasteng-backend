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
exports.AsphaltGranulometryRepository = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const database_config_1 = require("../../../../../infra/mongoose/database.config");
const mongoose_2 = require("mongoose");
const schemas_1 = require("../schemas");
let AsphaltGranulometryRepository = class AsphaltGranulometryRepository {
    constructor(granulometryModel) {
        this.granulometryModel = granulometryModel;
    }
    findOne(granulometryFilterQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            const granulometry = yield this.granulometryModel.findOne(granulometryFilterQuery);
            return granulometry;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.granulometryModel.find();
        });
    }
    findById(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            let granulometrys = [];
            for (const id of ids) {
                const granulometry = yield this.granulometryModel.find({ "generalData.material._id": id }).lean();
                if (Array.isArray(granulometry) && granulometry.length > 0) {
                    granulometrys.push(granulometry[0]);
                }
            }
            return granulometrys;
        });
    }
    create(granulometry) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdGranulometry = new this.granulometryModel(granulometry);
            return createdGranulometry.save();
        });
    }
    findByMaterialId(materialId_1) {
        return __awaiter(this, arguments, void 0, function* (materialId, page = 1, limit = 10) {
            const skip = (page - 1) * limit;
            return this.granulometryModel
                .find({ 'generalData.material._id': materialId })
                .sort({ 'generalData.createdAt': -1 })
                .skip(skip)
                .limit(limit);
        });
    }
};
exports.AsphaltGranulometryRepository = AsphaltGranulometryRepository;
exports.AsphaltGranulometryRepository = AsphaltGranulometryRepository = __decorate([
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.AsphaltGranulometry.name, database_config_1.DATABASE_CONNECTION.ASPHALT)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AsphaltGranulometryRepository);
//# sourceMappingURL=index.js.map