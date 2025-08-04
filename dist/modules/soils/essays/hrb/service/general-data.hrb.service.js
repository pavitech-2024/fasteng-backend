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
var GeneralData_HRB_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralData_HRB_Service = void 0;
const common_1 = require("@nestjs/common");
const exceptions_1 = require("../../../../../utils/exceptions");
const repository_1 = require("../../../samples/repository");
const repository_2 = require("../repository");
let GeneralData_HRB_Service = GeneralData_HRB_Service_1 = class GeneralData_HRB_Service {
    constructor(hrbRepository, sampleRepository) {
        this.hrbRepository = hrbRepository;
        this.sampleRepository = sampleRepository;
        this.logger = new common_1.Logger(GeneralData_HRB_Service_1.name);
    }
    verifyInitHrb({ name, sample }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('verify init hrb on general-data.hrb.service.ts > [body]');
                const sampleExists = yield this.sampleRepository.findOne({ _id: sample._id });
                if (!sampleExists)
                    throw new exceptions_1.NotFound('Chosen sample of HRB');
                const hrbExists = yield this.hrbRepository.findOne({ generalData: { name, sample: { _id: sample._id } } });
                if (hrbExists)
                    throw new exceptions_1.AlreadyExists(`HRB with name "${name} from user "${sample.userId}"`);
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
};
GeneralData_HRB_Service = GeneralData_HRB_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_2.HrbRepository, repository_1.SamplesRepository])
], GeneralData_HRB_Service);
exports.GeneralData_HRB_Service = GeneralData_HRB_Service;
//# sourceMappingURL=general-data.hrb.service.js.map