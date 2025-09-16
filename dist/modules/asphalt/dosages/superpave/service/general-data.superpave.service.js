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
var GeneralData_Superpave_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralData_Superpave_Service = void 0;
const common_1 = require("@nestjs/common");
const index_1 = require("../repository/index");
const exceptions_1 = require("../../../../../utils/exceptions");
const schemas_1 = require("../schemas");
const mongoose_1 = require("@nestjs/mongoose");
const database_config_1 = require("../../../../../infra/mongoose/database.config");
const mongoose_2 = require("mongoose");
let GeneralData_Superpave_Service = GeneralData_Superpave_Service_1 = class GeneralData_Superpave_Service {
    constructor(superpaveModel, superpaveRepository) {
        this.superpaveModel = superpaveModel;
        this.superpaveRepository = superpaveRepository;
        this.logger = new common_1.Logger(GeneralData_Superpave_Service_1.name);
    }
    verifyInitSuperpave(superpave, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('verify init Superpave on general-data.superpave.service.ts > [body]');
                const { name } = superpave;
                const SuperpaveExists = yield this.superpaveRepository.findOne(name, userId);
                if (SuperpaveExists)
                    throw new exceptions_1.AlreadyExists('name');
                const createdPartialSuperpave = yield this.superpaveRepository.createPartialSuperpave(superpave, userId);
                yield this.superpaveRepository.saveStep(createdPartialSuperpave._doc, 1);
                return {
                    success: true,
                    dosage: createdPartialSuperpave,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    getDosageById(dosageId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('get dosage by id on general-data.superpave.service.ts > [body]', {
                    dosageId,
                });
                const dosage = yield this.superpaveRepository.findById(dosageId);
                if (!dosage) {
                    throw new common_1.NotFoundException(`Dosage whith id ${dosageId} not found`);
                }
                return dosage;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteSuperpaveDosage(dosageId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('delete superpave dosage on general-data.superpave.service.ts > [body]', {
                    dosageId,
                });
                const result = yield this.superpaveModel.findByIdAndDelete(dosageId);
                if (!result) {
                    throw new Error(`Dosage whith id ${dosageId} not found`);
                }
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
};
GeneralData_Superpave_Service = GeneralData_Superpave_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.Superpave.name, database_config_1.DATABASE_CONNECTION.ASPHALT)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        index_1.SuperpaveRepository])
], GeneralData_Superpave_Service);
exports.GeneralData_Superpave_Service = GeneralData_Superpave_Service;
//# sourceMappingURL=general-data.superpave.service.js.map