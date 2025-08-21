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
exports.BaseMarshallService = void 0;
const common_1 = require("@nestjs/common");
const repository_1 = require("../repository");
let BaseMarshallService = class BaseMarshallService {
    constructor(marshall_repository) {
        this.marshall_repository = marshall_repository;
        this.stepMapping = {
            generalData: 'generalData',
            materialSelection: 'materialSelectionData',
            granulometryComposition: 'granulometryCompositionData',
            binderTrial: 'binderTrialData',
            maximumMixtureDensity: 'maximumMixtureDensityData',
            volumetricParameters: 'volumetricParametersData',
            optimumBinderContent: 'optimumBinderContentData',
            confirmationCompression: 'confirmationCompressionData',
        };
    }
    saveStepData(dosageId, step, data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dosage = yield this.marshall_repository.findById(dosageId);
                if (!dosage) {
                    throw new common_1.NotFoundException(`Dosage with ID ${dosageId} not found`);
                }
                if (dosage.generalData && dosage.generalData.userId !== userId) {
                    throw new common_1.ForbiddenException('User does not have permission to modify this dosage');
                }
                const propertyName = this.stepMapping[step];
                if (!propertyName) {
                    throw new common_1.BadRequestException(`Invalid step: ${step}`);
                }
                const updateData = {
                    updatedAt: new Date()
                };
                updateData[propertyName] = data;
                yield this.marshall_repository.findOneAndUpdate({ _id: dosageId }, updateData);
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getStepData(dosageId, step, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dosage = yield this.marshall_repository.findById(dosageId);
                if (!dosage) {
                    throw new common_1.NotFoundException(`Dosage with ID ${dosageId} not found`);
                }
                if (dosage.generalData && dosage.generalData.userId !== userId) {
                    throw new common_1.ForbiddenException('User does not have permission to access this dosage');
                }
                const propertyName = this.stepMapping[step];
                if (!propertyName) {
                    throw new common_1.BadRequestException(`Invalid step: ${step}`);
                }
                return dosage[propertyName] || null;
            }
            catch (error) {
                throw error;
            }
        });
    }
};
exports.BaseMarshallService = BaseMarshallService;
exports.BaseMarshallService = BaseMarshallService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.MarshallRepository])
], BaseMarshallService);
//# sourceMappingURL=base.marshall.service.js.map