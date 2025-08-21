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
exports.MarshallRepository = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const database_config_1 = require("../../../../../infra/mongoose/database.config");
const mongoose_2 = require("mongoose");
const schemas_1 = require("../schemas");
let MarshallRepository = class MarshallRepository {
    constructor(marshallModel) {
        this.marshallModel = marshallModel;
    }
    create(marshall) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdMarshall = new this.marshallModel(marshall);
            return createdMarshall.save();
        });
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.marshallModel.find().sort({ createdAt: -1 });
        });
    }
    findOne(name, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.marshallModel.findOne({
                "generalData.name": name,
                "generalData.userId": userId
            });
        });
    }
    findOneAndUpdate(marshallFilterQuery, marshall) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.marshallModel.findOneAndUpdate(marshallFilterQuery, marshall, {
                new: true
            });
        });
    }
    findById(dosageId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.marshallModel.findById(dosageId).exec();
        });
    }
    createPartialMarshall(generalData, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdPartialMarshall = yield this.marshallModel.create({
                    generalData: Object.assign(Object.assign({}, generalData), { userId })
                });
                return createdPartialMarshall;
            }
            catch (error) {
                console.error("Erro ao salvar o step:", error);
                throw error;
            }
        });
    }
    saveStep(marshallId, step) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.marshallModel.updateOne({ _id: marshallId }, { $set: { step } });
            }
            catch (error) {
                console.error("Erro ao salvar o passo:", error);
                throw error;
            }
        });
    }
};
exports.MarshallRepository = MarshallRepository;
exports.MarshallRepository = MarshallRepository = __decorate([
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.Marshall.name, database_config_1.DATABASE_CONNECTION.ASPHALT)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MarshallRepository);
//# sourceMappingURL=index.js.map