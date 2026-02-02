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
var ABCPService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ABCPService = void 0;
const common_1 = require("@nestjs/common");
const general_data_abcp_service_1 = require("./general-data.abcp.service");
const material_selection_abcp_service_1 = require("./material-selection.abcp.service");
const essay_selection_abcp_service_1 = require("./essay-selection.abcp.service");
const calc_abcp_service_1 = require("./calc-abcp.service");
const repository_1 = require("../repository");
const schemas_1 = require("../schemas");
const insert_params_abcp_service_1 = require("./insert-params.abcp.service");
const mongoose_1 = require("@nestjs/mongoose");
const database_config_1 = require("../../../../../infra/mongoose/database.config");
const mongoose_2 = require("mongoose");
let ABCPService = ABCPService_1 = class ABCPService {
    constructor(abcpModel, generalData_Service, materialSelection_Service, essaySelection_Service, insertParams_Service, calculateResults_Service, ABCPRepository) {
        this.abcpModel = abcpModel;
        this.generalData_Service = generalData_Service;
        this.materialSelection_Service = materialSelection_Service;
        this.essaySelection_Service = essaySelection_Service;
        this.insertParams_Service = insertParams_Service;
        this.calculateResults_Service = calculateResults_Service;
        this.ABCPRepository = ABCPRepository;
        this.logger = new common_1.Logger(ABCPService_1.name);
    }
    verifyInitABCP(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.generalData_Service.verifyInitABCP(body, userId);
                return { success };
            }
            catch (error) {
                this.logger.error(`error on verify init > [error]: ${error}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    getUserMaterials(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const materials = yield this.materialSelection_Service.getMaterials(userId);
                this.logger.log(`materials returned > [materials]: ${materials}`);
                return { materials, success: true };
            }
            catch (error) {
                this.logger.error(`error on get all materials by user id > [error]: ${error}`);
                const { status, name, message } = error;
                return { materials: [], success: false, error: { status, message, name } };
            }
        });
    }
    saveMaterialSelectionStep(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.materialSelection_Service.saveMaterials(body, userId);
                return { success };
            }
            catch (error) {
                this.logger.error(`error on save materials data abcp step > [error]: ${error}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    getEssaysByMaterials(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const essays = yield this.essaySelection_Service.getEssays(data);
                this.logger.log(`essays returned > [essays]: ${essays}`);
                return { essays, success: true };
            }
            catch (error) {
                this.logger.error(`error on get all essays by the materials ids > [error]: ${error}`);
                const { status, name, message } = error;
                return { essays: [], success: false, error: { status, message, name } };
            }
        });
    }
    saveEssaySelectionStep(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.essaySelection_Service.saveEssays(body, userId);
                return { success };
            }
            catch (error) {
                this.logger.error(`error on save essays data abcp step > [error]: ${error}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    saveInsertParamsStep(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.insertParams_Service.saveInsertParams(body, userId);
                return { success };
            }
            catch (error) {
                this.logger.error(`error on save essays data abcp step > [error]: ${error}`);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    getAllDosages(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dosages = yield this.ABCPRepository.find();
                return dosages.filter((dosage) => dosage.generalData && dosage.generalData.userId === userId);
            }
            catch (error) {
                this.logger.error(`error on get all dosages > [error]: ${error}`);
                throw error;
            }
        });
    }
    getDosageById(dosageId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dosage = yield this.ABCPRepository.findById(dosageId);
                return dosage;
            }
            catch (error) {
                this.logger.error(`error on get dosage with this id > [error]: ${error}`);
                throw error;
            }
        });
    }
    calculateAbcpDosage(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.calculateResults_Service.calculateAbcpDosage(data);
            }
            catch (error) {
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    saveDosage(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, userId, } = body.generalData;
                const { results } = body;
                const abcpExists = yield this.ABCPRepository.findOne(name, userId);
                const abcpAllData = Object.assign(Object.assign({}, abcpExists._doc), { results });
                yield this.abcpModel.updateOne({ "_id": abcpExists._id }, abcpAllData);
                yield this.ABCPRepository.saveStep(abcpExists._doc, 5);
                return { success: true, data: abcpExists };
            }
            catch (error) {
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    deleteDosage(dosage_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteAbcp = yield this.ABCPRepository.findOneAndDelete(dosage_id);
                return deleteAbcp;
            }
            catch (error) {
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
};
exports.ABCPService = ABCPService;
exports.ABCPService = ABCPService = ABCPService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.ABCP.name, database_config_1.DATABASE_CONNECTION.CONCRETE)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        general_data_abcp_service_1.GeneralData_ABCP_Service,
        material_selection_abcp_service_1.MaterialSelection_ABCP_Service,
        essay_selection_abcp_service_1.EssaySelection_ABCP_Service,
        insert_params_abcp_service_1.InsertParams_ABCP_Service,
        calc_abcp_service_1.Calculate_ABCP_Results_Service,
        repository_1.ABCPRepository])
], ABCPService);
//# sourceMappingURL=index.js.map