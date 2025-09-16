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
exports.ABCPRepository = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const database_config_1 = require("../../../../../infra/mongoose/database.config");
const mongoose_2 = require("mongoose");
const schemas_1 = require("../schemas");
let ABCPRepository = class ABCPRepository {
    constructor(abcpModel) {
        this.abcpModel = abcpModel;
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            const dosages = yield this.abcpModel.find().lean();
            return dosages;
        });
    }
    findById(dosageId) {
        return __awaiter(this, void 0, void 0, function* () {
            const dosage = yield this.abcpModel.findById(dosageId).lean();
            return dosage;
        });
    }
    findOne(name, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const dosage = yield this.abcpModel.findOne({
                "generalData.name": name,
                "generalData.userId": userId
            });
            return dosage;
        });
    }
    create(abcp) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdGranulometry = new this.abcpModel(abcp);
            return createdGranulometry.save();
        });
    }
    createPartialAbcp(abcp, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdPartialAbcp = yield this.abcpModel.create({
                    generalData: Object.assign(Object.assign({}, abcp), { userId }),
                });
                return createdPartialAbcp;
            }
            catch (error) {
                console.error("Erro ao salvar o step:", error);
                throw error;
            }
        });
    }
    updatePartialAbcp(abcp, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdPartialAbcp = yield this.abcpModel.updateOne({ "generalData.name": abcp.data.name, "generalData.userId": userId }, { $set: { generalData: abcp.data } });
                return createdPartialAbcp;
            }
            catch (error) {
                console.error("Erro ao salvar o step:", error);
                throw error;
            }
        });
    }
    saveStep(abcp, step) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.abcpModel.updateOne({ _id: abcp._id }, { $set: { "generalData.step": step } });
            }
            catch (error) {
                console.error("Erro ao salvar o passo:", error);
                throw error;
            }
        });
    }
    findOneAndDelete(dosage_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedDosage = yield this.abcpModel.findOneAndDelete({ _id: dosage_id });
                return deletedDosage;
            }
            catch (error) {
                console.error("Erro ao deletar a dosagem:", error);
                throw error;
            }
        });
    }
};
ABCPRepository = __decorate([
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.ABCP.name, database_config_1.DATABASE_CONNECTION.CONCRETE)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ABCPRepository);
exports.ABCPRepository = ABCPRepository;
//# sourceMappingURL=index.js.map