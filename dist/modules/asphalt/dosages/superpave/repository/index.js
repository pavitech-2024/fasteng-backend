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
exports.SuperpaveRepository = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const database_config_1 = require("../../../../../infra/mongoose/database.config");
const mongoose_2 = require("mongoose");
const schemas_1 = require("../schemas");
let SuperpaveRepository = class SuperpaveRepository {
    constructor(superpaveModel) {
        this.superpaveModel = superpaveModel;
    }
    create(superpave) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdSuperpave = new this.superpaveModel(superpave);
            return createdSuperpave.save();
        });
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.superpaveModel.find().sort({ createdAt: -1 });
        });
    }
    ;
    findOne(name, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const dosage = yield this.superpaveModel.findOne({
                "generalData.name": name,
                "generalData.userId": userId
            });
            return dosage;
        });
    }
    findOneAndUpdate(superpaveFilterQuery, superpave) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.superpaveModel.findOneAndUpdate(superpaveFilterQuery, superpave, {
                new: true,
            });
        });
    }
    findById(dosageId) {
        return __awaiter(this, void 0, void 0, function* () {
            const dosage = this.superpaveModel.findById(dosageId);
            return dosage;
        });
    }
    createPartialSuperpave(superpave, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdPartialSuperpave = yield this.superpaveModel.create({
                    generalData: Object.assign(Object.assign({}, superpave), { userId }),
                });
                return createdPartialSuperpave;
            }
            catch (error) {
                console.error("Erro ao salvar o step:", error);
                throw error;
            }
        });
    }
    saveStep(superpave, step) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.superpaveModel.updateOne({ _id: superpave._id }, { $set: { "generalData.step": step } });
            }
            catch (error) {
                console.error("Erro ao salvar o passo:", error);
                throw error;
            }
        });
    }
};
exports.SuperpaveRepository = SuperpaveRepository;
exports.SuperpaveRepository = SuperpaveRepository = __decorate([
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.Superpave.name, database_config_1.DATABASE_CONNECTION.ASPHALT)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SuperpaveRepository);
//# sourceMappingURL=index.js.map