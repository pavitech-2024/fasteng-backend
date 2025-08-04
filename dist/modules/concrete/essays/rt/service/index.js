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
var ConcreteRtService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcreteRtService = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("@nestjs/common/decorators");
const exceptions_1 = require("../../../../../utils/exceptions");
const repository_1 = require("../repository");
const general_data_rt_service_1 = require("./general-data.rt.service");
const calc_rt_service_1 = require("./calc.rt.service");
let ConcreteRtService = ConcreteRtService_1 = class ConcreteRtService {
    constructor(generalData_Service, calc_ConcreteRt_Service, rt_Repository) {
        this.generalData_Service = generalData_Service;
        this.calc_ConcreteRt_Service = calc_ConcreteRt_Service;
        this.rt_Repository = rt_Repository;
        this.logger = new common_1.Logger(ConcreteRtService_1.name);
    }
    verifyInitRt(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const success = yield this.generalData_Service.verifyInitRt(body);
                return { success };
            }
            catch (error) {
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
    calculateRt(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.calc_ConcreteRt_Service.calculateConcreteRt(body);
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
                const { name, userId, } = body.generalData;
                const alreadyExists = yield this.rt_Repository.findOne({
                    'generalData.name': name,
                    'generalData.userId': userId,
                });
                if (alreadyExists)
                    throw new exceptions_1.AlreadyExists(`rt with name "${name}" from user "${userId}"`);
                const rt = yield this.rt_Repository.create(body);
                return { success: true, data: rt };
            }
            catch (error) {
                const { status, name, message } = error;
                return { success: false, error: { status, message, name } };
            }
        });
    }
};
ConcreteRtService = ConcreteRtService_1 = __decorate([
    (0, decorators_1.Injectable)(),
    __metadata("design:paramtypes", [general_data_rt_service_1.GeneralData_CONCRETERT_Service,
        calc_rt_service_1.Calc_ConcreteRt_Service,
        repository_1.ConcreteRtRepository])
], ConcreteRtService);
exports.ConcreteRtService = ConcreteRtService;
//# sourceMappingURL=index.js.map