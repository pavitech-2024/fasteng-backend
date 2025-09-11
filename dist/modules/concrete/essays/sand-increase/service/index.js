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
var SandIncreaseService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SandIncreaseService = void 0;
const common_1 = require("@nestjs/common");
const general_data_sand_increase_service_1 = require("./general-data.sand-increase.service");
const calc_sand_increase_service_1 = require("./calc.sand-increase.service");
const repository_1 = require("../repository");
const exceptions_1 = require("../../../../../utils/exceptions");
const calc_unitMass_service_1 = require("./calc.unitMass.service");
const calc_moistureContents_service_1 = require("./calc.moistureContents.service");
let SandIncreaseService = SandIncreaseService_1 = class SandIncreaseService {
    constructor(generalData_Service, calc_UnitMass_Service, calc_MoistureContent_Service, calc_Service, sandIncreaseRepository) {
        this.generalData_Service = generalData_Service;
        this.calc_UnitMass_Service = calc_UnitMass_Service;
        this.calc_MoistureContent_Service = calc_MoistureContent_Service;
        this.calc_Service = calc_Service;
        this.sandIncreaseRepository = sandIncreaseRepository;
        this.logger = new common_1.Logger(SandIncreaseService_1.name);
    }
    verifyInitSandIncrease(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.generalData_Service.verifyInitSandIncrease(body);
                return { success };
            }
            catch (error) {
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    calculateUnitMass(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.calc_UnitMass_Service.calculateUnitMass(body);
            }
            catch (error) {
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    calculateMoistureContent(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.calc_MoistureContent_Service.calculateMoistureContent(body);
            }
            catch (error) {
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    calculateSandIncrease(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.calc_Service.calculateSandIncrease(body);
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
                const { name, material: { _id: materialId }, userId, } = body.generalData;
                const alreadyExists = yield this.sandIncreaseRepository.findOne({
                    'generalData.name': name,
                    'generalData.material._id': materialId,
                    'generalData.userId': userId,
                });
                if (alreadyExists)
                    throw new exceptions_1.AlreadyExists(`Sand increase with name "${name}" from user "${userId}"`);
                const sandIncrease = yield this.sandIncreaseRepository.create(body);
                return { success: true, data: sandIncrease };
            }
            catch (error) {
                this.logger.error(error);
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
};
SandIncreaseService = SandIncreaseService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [general_data_sand_increase_service_1.GeneralData_SandIncrease_Service,
        calc_unitMass_service_1.Calc_UnitMass_Service,
        calc_moistureContents_service_1.Calc_MoistureContent_Service,
        calc_sand_increase_service_1.Calc_SandIncrease_Service,
        repository_1.SandIncreaseRepository])
], SandIncreaseService);
exports.SandIncreaseService = SandIncreaseService;
//# sourceMappingURL=index.js.map