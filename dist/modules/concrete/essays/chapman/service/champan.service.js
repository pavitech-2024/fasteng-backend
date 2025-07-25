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
exports.ChapmanService = void 0;
const common_1 = require("@nestjs/common");
const general_data_chapman_service_1 = require("./general-data.chapman.service");
const repository_1 = require("../repository");
const calc_chapman_service_1 = require("./calc.chapman.service");
const exceptions_1 = require("../../../../../utils/exceptions");
let ChapmanService = class ChapmanService {
    constructor(generalData_Service, chapman_Repository, calc_Service) {
        this.generalData_Service = generalData_Service;
        this.chapman_Repository = chapman_Repository;
        this.calc_Service = calc_Service;
    }
    verifyInitChapman(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.generalData_Service.verifyInitChapman(body);
                return { success };
            }
            catch (error) {
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    calculateChapman(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.calc_Service.calculateChapman(body);
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
                const alreadyExists = yield this.chapman_Repository.findOne({
                    'generalData.name': name,
                    'generalData.material._id': materialId,
                    'generalData.userId': userId,
                });
                if (alreadyExists)
                    throw new exceptions_1.AlreadyExists(`Chapman with name "${name}" from user "${userId}"`);
                const chapman = yield this.chapman_Repository.create(body);
                return { success: true, data: chapman };
            }
            catch (error) {
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
};
exports.ChapmanService = ChapmanService;
exports.ChapmanService = ChapmanService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [general_data_chapman_service_1.GeneralData_Chapman_Service,
        repository_1.ChapmanRepository,
        calc_chapman_service_1.Calc_CHAPMAN_Service])
], ChapmanService);
//# sourceMappingURL=champan.service.js.map