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
exports.UnitMassService = void 0;
const common_1 = require("@nestjs/common");
const general_data_unitMass_service_1 = require("./general-data.unitMass.service");
const step2Data_unitMass_service_1 = require("./step2Data.unitMass.service");
const result_unitMass_service_1 = require("./result.unitMass.service");
const exceptions_1 = require("../../../../../utils/exceptions");
const repository_1 = require("../repository");
let UnitMassService = class UnitMassService {
    constructor(generalData_Service, step2_UnitMass_Service, result_UnitMass_Service, unitMassRepository) {
        this.generalData_Service = generalData_Service;
        this.step2_UnitMass_Service = step2_UnitMass_Service;
        this.result_UnitMass_Service = result_UnitMass_Service;
        this.unitMassRepository = unitMassRepository;
    }
    verifyInitUnitMass(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.generalData_Service.verifyInitUnitMass(body);
                return { success };
            }
            catch (error) {
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    verifyStep2DataUnitMass(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.step2_UnitMass_Service.verifyStep2DataUnitMass(body);
                return { success };
            }
            catch (error) {
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    resultUnitMass(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.result_UnitMass_Service.calculateUnitMass(body);
            }
            catch (error) {
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    saveEssay(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { experimentName, material: { _id: materialId }, userId, method, } = body.generalData;
                const alreadyExists = yield this.unitMassRepository.findOne({
                    'generalData.experimentName': experimentName,
                    'generalData.material._id': materialId,
                    'generalData.userId': userId,
                    'generalData.method': method,
                });
                if (alreadyExists)
                    throw new exceptions_1.AlreadyExists(`UnitMass with name "${experimentName}" from user "${userId}"`);
                const unitMass = yield this.unitMassRepository.create(body);
                return { success: true, data: unitMass };
            }
            catch (error) {
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
};
exports.UnitMassService = UnitMassService;
exports.UnitMassService = UnitMassService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [general_data_unitMass_service_1.GeneralData_UnitMass_Service,
        step2Data_unitMass_service_1.step2Data_Service,
        result_unitMass_service_1.Result_UnitMass_Service,
        repository_1.UnitMassRepository])
], UnitMassService);
//# sourceMappingURL=index.js.map