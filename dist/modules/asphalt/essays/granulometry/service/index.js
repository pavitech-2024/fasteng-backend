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
var AsphaltGranulometryService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsphaltGranulometryService = void 0;
const common_1 = require("@nestjs/common");
const exceptions_1 = require("../../../../../utils/exceptions");
const repository_1 = require("../repository");
const general_data_granulometry_service_1 = require("./general-data.granulometry.service");
const calc_granulometry_service_1 = require("./calc.granulometry.service");
let AsphaltGranulometryService = AsphaltGranulometryService_1 = class AsphaltGranulometryService {
    constructor(generalData_Service, calc_Service, Granulometry_Repository) {
        this.generalData_Service = generalData_Service;
        this.calc_Service = calc_Service;
        this.Granulometry_Repository = Granulometry_Repository;
        this.logger = new common_1.Logger(AsphaltGranulometryService_1.name);
    }
    verifyInitGranulometry(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.generalData_Service.verifyInitGranulometry(body);
                return { success };
            }
            catch (error) {
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    calculateGranulometry(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.calc_Service.calculateGranulometry(body);
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
                const alreadyExists = yield this.Granulometry_Repository.findOne({
                    'generalData.name': name,
                    'generalData.material._id': materialId,
                    'generalData.userId': userId,
                });
                if (alreadyExists)
                    throw new exceptions_1.AlreadyExists(`GRANULOMETRY with name "${name}" from user "${userId}"`);
                const granulometry = yield this.Granulometry_Repository.create(body);
                return { success: true, data: granulometry };
            }
            catch (error) {
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
};
AsphaltGranulometryService = AsphaltGranulometryService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [general_data_granulometry_service_1.GeneralData_AsphaltGranulometry_Service,
        calc_granulometry_service_1.Calc_AsphaltGranulometry_Service,
        repository_1.AsphaltGranulometryRepository])
], AsphaltGranulometryService);
exports.AsphaltGranulometryService = AsphaltGranulometryService;
//# sourceMappingURL=index.js.map