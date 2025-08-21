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
var GeneralData_Marshall_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralData_Marshall_Service = void 0;
const common_1 = require("@nestjs/common");
const repository_1 = require("../repository");
const exceptions_1 = require("../../../../../utils/exceptions");
const mongoose_1 = require("@nestjs/mongoose");
const database_config_1 = require("../../../../../infra/mongoose/database.config");
const mongoose_2 = require("mongoose");
const schemas_1 = require("../schemas");
let GeneralData_Marshall_Service = GeneralData_Marshall_Service_1 = class GeneralData_Marshall_Service {
    constructor(marshallModel, marshallRepository) {
        this.marshallModel = marshallModel;
        this.marshallRepository = marshallRepository;
        this.logger = new common_1.Logger(GeneralData_Marshall_Service_1.name);
    }
    verifyInitMarshall(marshall, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('Verify init Marshall');
                const { name } = marshall;
                const existingMarshall = yield this.marshallRepository.findOne(name, userId);
                if (existingMarshall)
                    throw new exceptions_1.AlreadyExists('name');
                const createdPartialMarshall = yield this.marshallRepository.createPartialMarshall(marshall, userId);
                yield this.marshallRepository.saveStep(createdPartialMarshall._id, 1);
                return {
                    success: true,
                    dosage: createdPartialMarshall,
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
                this.logger.log('Getting dosage by ID', { dosageId });
                const dosage = yield this.marshallRepository.findById(dosageId);
                if (!dosage) {
                    this.logger.warn(`Dosage with id ${dosageId} not found`);
                    throw new common_1.NotFoundException(`Dosage with id ${dosageId} not found`);
                }
                return dosage;
            }
            catch (error) {
                this.logger.error('Error fetching dosage by ID', error);
                throw error;
            }
        });
    }
    saveMarshallDosage(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('Saving marshall dosage', { body, userId });
                const { isConsult } = body, marshallDataToSave = __rest(body, ["isConsult"]);
                const marshallExists = yield this.marshallRepository.findOne(marshallDataToSave.generalData.name, userId);
                if (!marshallExists) {
                    this.logger.warn('Marshall not found', { name: marshallDataToSave.generalData.name, userId });
                    throw new common_1.NotFoundException('Marshall not found');
                }
                marshallExists.set(marshallDataToSave);
                yield marshallExists.save();
                if (marshallExists.step < 9) {
                    yield this.marshallRepository.saveStep(marshallExists._id, 9);
                }
                return true;
            }
            catch (error) {
                this.logger.error('Error saving marshall dosage', error);
                throw error;
            }
        });
    }
    deleteMarshallDosage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('Delete marshall dosage', { id });
                const result = yield this.marshallModel.findByIdAndDelete(id);
                if (!result)
                    throw new common_1.NotFoundException('Documento não encontrado para deletar.');
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
};
exports.GeneralData_Marshall_Service = GeneralData_Marshall_Service;
exports.GeneralData_Marshall_Service = GeneralData_Marshall_Service = GeneralData_Marshall_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.Marshall.name, database_config_1.DATABASE_CONNECTION.ASPHALT)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        repository_1.MarshallRepository])
], GeneralData_Marshall_Service);
//# sourceMappingURL=general-data.marshall.service.js.map