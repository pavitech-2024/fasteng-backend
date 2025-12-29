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
exports.CbrService = void 0;
const common_1 = require("@nestjs/common");
const general_data_cbr_service_1 = require("./general-data.cbr.service");
const calc_cbr_service_1 = require("./calc.cbr.service");
const exceptions_1 = require("../../../../../utils/exceptions");
const repository_1 = require("../repository");
let CbrService = class CbrService {
    constructor(generalData_Service, calc_Service, Cbr_Repository) {
        this.generalData_Service = generalData_Service;
        this.calc_Service = calc_Service;
        this.Cbr_Repository = Cbr_Repository;
    }
    verifyInitCbr(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.generalData_Service.verifyInitCbr(body);
                return { success };
            }
            catch (error) {
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    calculateCbr(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.calc_Service.calculateCbr(body);
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
                const { name, sample: { _id: sampleId }, userId, } = body.generalData;
                const alreadyExists = yield this.Cbr_Repository.findOne({
                    'generalData.name': name,
                    'generalData.sample._id': sampleId,
                    'generalData.userId': userId,
                });
                if (alreadyExists)
                    throw new exceptions_1.AlreadyExists(`CBR with name "${name}" from user "${userId}"`);
                const cbr = yield this.Cbr_Repository.create(body);
                return { success: true, data: cbr };
            }
            catch (error) {
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
};
CbrService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [general_data_cbr_service_1.GeneralData_CBR_Service,
        calc_cbr_service_1.Calc_CBR_Service,
        repository_1.CbrRepository])
], CbrService);
exports.CbrService = CbrService;
//# sourceMappingURL=index.js.map