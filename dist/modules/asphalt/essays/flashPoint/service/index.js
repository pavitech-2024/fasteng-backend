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
var FlashPointService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlashPointService = void 0;
const common_1 = require("@nestjs/common");
const exceptions_1 = require("../../../../../utils/exceptions");
const repository_1 = require("../repository");
const calc_flashPoint_service_1 = require("./calc.flashPoint.service");
const general_data_flashPoint_service_1 = require("./general-data.flashPoint.service");
let FlashPointService = FlashPointService_1 = class FlashPointService {
    constructor(generalData_Service, calc_Service, FlashPoint_Repository) {
        this.generalData_Service = generalData_Service;
        this.calc_Service = calc_Service;
        this.FlashPoint_Repository = FlashPoint_Repository;
        this.logger = new common_1.Logger(FlashPointService_1.name);
    }
    verifyInitFlashPoint(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.generalData_Service.verifyInitFlashPoint(body);
                return { result };
            }
            catch (error) {
                const { status, name, message } = error;
                return { result: { success: false }, error: { status, message, name } };
            }
        });
    }
    calculateFlashPoint(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.calc_Service.calculateFlashPoint(body);
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
                const alreadyExists = yield this.FlashPoint_Repository.findOne({
                    'generalData.name': name,
                    'generalData.material._id': materialId,
                    'generalData.userId': userId,
                });
                if (alreadyExists)
                    throw new exceptions_1.AlreadyExists(`FLASHPOINT with name "${name}" from user "${userId}"`);
                const flashPoint = yield this.FlashPoint_Repository.create(body);
                return { success: true, data: flashPoint };
            }
            catch (error) {
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
};
FlashPointService = FlashPointService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [general_data_flashPoint_service_1.GeneralData_FLASHPOINT_Service,
        calc_flashPoint_service_1.Calc_FLASHPOINT_Service,
        repository_1.FlashPointRepository])
], FlashPointService);
exports.FlashPointService = FlashPointService;
//# sourceMappingURL=index.js.map