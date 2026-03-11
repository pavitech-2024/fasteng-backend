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
var SpecifyMassService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecifyMassService = void 0;
const common_1 = require("@nestjs/common");
const general_data_specifyMass_service_1 = require("./general-data.specifyMass.service");
const exceptions_1 = require("../../../../../utils/exceptions");
const repository_1 = require("../repository");
const calc_specifyMass_service_1 = require("./calc.specifyMass.service");
let SpecifyMassService = SpecifyMassService_1 = class SpecifyMassService {
    constructor(generalData_Service, calc_Service, SpecifyMass_Repository) {
        this.generalData_Service = generalData_Service;
        this.calc_Service = calc_Service;
        this.SpecifyMass_Repository = SpecifyMass_Repository;
        this.logger = new common_1.Logger(SpecifyMassService_1.name);
    }
    verifyInitSpecifyMass(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.generalData_Service.verifyInitSpecifyMass(body);
                return { result };
            }
            catch (error) {
                const { status, name, message } = error;
                return { result: { success: false }, error: { status, message, name } };
            }
        });
    }
    calculateSpecifyMass(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.calc_Service.calculateSpecifyMass(body);
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
                const alreadyExists = yield this.SpecifyMass_Repository.findOne({
                    'generalData.name': name,
                    'generalData.material._id': materialId,
                    'generalData.userId': userId,
                });
                if (alreadyExists)
                    throw new exceptions_1.AlreadyExists(`SPECIFYMASS with name "${name}" from user "${userId}"`);
                const specifyMass = yield this.SpecifyMass_Repository.create(body);
                return { success: true, data: specifyMass };
            }
            catch (error) {
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
};
exports.SpecifyMassService = SpecifyMassService;
exports.SpecifyMassService = SpecifyMassService = SpecifyMassService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [general_data_specifyMass_service_1.GeneralData_SPECIFYMASS_Service,
        calc_specifyMass_service_1.Calc_SPECIFYMASS_Service,
        repository_1.SpecifyMassRepository])
], SpecifyMassService);
//# sourceMappingURL=index.js.map