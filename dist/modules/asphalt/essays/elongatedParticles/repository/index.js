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
var ElongatedParticlesRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElongatedParticlesRepository = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const schemas_1 = require("../schemas");
const database_config_1 = require("../../../../../infra/mongoose/database.config");
const mongoose_2 = require("mongoose");
const common_1 = require("@nestjs/common");
let ElongatedParticlesRepository = ElongatedParticlesRepository_1 = class ElongatedParticlesRepository {
    constructor(elongatedParticlesModel) {
        this.elongatedParticlesModel = elongatedParticlesModel;
        this.logger = new common_1.Logger(ElongatedParticlesRepository_1.name);
    }
    findOne(elongatedParticlesFilterQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.elongatedParticlesModel.findOne(elongatedParticlesFilterQuery);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.elongatedParticlesModel.find();
        });
    }
    create(elongatedParticles) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdElongatedParticles = new this.elongatedParticlesModel(elongatedParticles);
            return createdElongatedParticles.save();
        });
    }
};
exports.ElongatedParticlesRepository = ElongatedParticlesRepository;
exports.ElongatedParticlesRepository = ElongatedParticlesRepository = ElongatedParticlesRepository_1 = __decorate([
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.ElongatedParticles.name, database_config_1.DATABASE_CONNECTION.ASPHALT)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ElongatedParticlesRepository);
//# sourceMappingURL=index.js.map