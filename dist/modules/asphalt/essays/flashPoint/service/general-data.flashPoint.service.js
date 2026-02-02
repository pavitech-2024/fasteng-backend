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
var GeneralData_FLASHPOINT_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralData_FLASHPOINT_Service = void 0;
const common_1 = require("@nestjs/common");
const repository_1 = require("../repository");
const repository_2 = require("../../../materials/repository");
const exceptions_1 = require("../../../../../utils/exceptions");
const exceptions_2 = require("../../../../../utils/exceptions");
let GeneralData_FLASHPOINT_Service = GeneralData_FLASHPOINT_Service_1 = class GeneralData_FLASHPOINT_Service {
    constructor(flashPointRepository, materialRepository) {
        this.flashPointRepository = flashPointRepository;
        this.materialRepository = materialRepository;
        this.logger = new common_1.Logger(GeneralData_FLASHPOINT_Service_1.name);
    }
    verifyInitFlashPoint(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, material }) {
            try {
                this.logger.log('verify init flashPoint on general-data.flashPoint.service.ts > [body]');
                const materialExists = yield this.materialRepository.findOne({
                    "_id": material._id
                });
                if (!materialExists)
                    throw new exceptions_2.NotFound('material');
                const flashPointExists = yield this.flashPointRepository.findOne({
                    "generalData.name": name,
                    "generalData.material._id": material._id
                });
                if (flashPointExists)
                    throw new exceptions_1.AlreadyExists(`name`);
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
};
exports.GeneralData_FLASHPOINT_Service = GeneralData_FLASHPOINT_Service;
exports.GeneralData_FLASHPOINT_Service = GeneralData_FLASHPOINT_Service = GeneralData_FLASHPOINT_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.FlashPointRepository, repository_2.MaterialsRepository])
], GeneralData_FLASHPOINT_Service);
//# sourceMappingURL=general-data.flashPoint.service.js.map