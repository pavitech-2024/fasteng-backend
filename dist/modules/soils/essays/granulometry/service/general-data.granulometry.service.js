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
var GeneralData_GRANULOMETRY_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralData_GRANULOMETRY_Service = void 0;
const common_1 = require("@nestjs/common");
const repository_1 = require("../repository");
const repository_2 = require("../../../samples/repository");
const exceptions_1 = require("../../../../../utils/exceptions");
const exceptions_2 = require("../../../../../utils/exceptions");
let GeneralData_GRANULOMETRY_Service = GeneralData_GRANULOMETRY_Service_1 = class GeneralData_GRANULOMETRY_Service {
    constructor(granulometryRepository, sampleRepository) {
        this.granulometryRepository = granulometryRepository;
        this.sampleRepository = sampleRepository;
        this.logger = new common_1.Logger(GeneralData_GRANULOMETRY_Service_1.name);
    }
    verifyInitGranulometry({ name, sample }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('verify init granulometry on general-data.granulometry.service.ts > [body]');
                const sampleExists = yield this.sampleRepository.findOne({
                    "_id": sample._id
                });
                if (!sampleExists)
                    throw new exceptions_2.GranulometryNotFound('sample');
                const granulometryExists = yield this.granulometryRepository.findOne({
                    "generalData.name": name,
                    "generalData.sample._id": sample._id
                });
                if (granulometryExists)
                    throw new exceptions_1.AlreadyExists(`name`);
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
};
GeneralData_GRANULOMETRY_Service = GeneralData_GRANULOMETRY_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.GranulometryRepository, repository_2.SamplesRepository])
], GeneralData_GRANULOMETRY_Service);
exports.GeneralData_GRANULOMETRY_Service = GeneralData_GRANULOMETRY_Service;
//# sourceMappingURL=general-data.granulometry.service.js.map