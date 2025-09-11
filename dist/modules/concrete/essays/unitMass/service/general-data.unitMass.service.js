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
var GeneralData_UnitMass_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralData_UnitMass_Service = void 0;
const common_1 = require("@nestjs/common");
const repository_1 = require("../../../../../modules/concrete/materials/repository");
const exceptions_1 = require("../../../../../utils/exceptions");
const repository_2 = require("../repository");
let GeneralData_UnitMass_Service = GeneralData_UnitMass_Service_1 = class GeneralData_UnitMass_Service {
    constructor(UnitMassRepository, materialsRepository) {
        this.UnitMassRepository = UnitMassRepository;
        this.materialsRepository = materialsRepository;
        this.logger = new common_1.Logger(GeneralData_UnitMass_Service_1.name);
    }
    verifyInitUnitMass({ experimentName, method, material }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('verify init unitMass on general-data.unitMass.service.ts > [body]');
                this.logger.log('verify if material exists> [body]');
                const materialExists = yield this.materialsRepository.findOne({ _id: material._id });
                if (!materialExists)
                    throw new exceptions_1.NotFound('Chosen material of unitMass');
                this.logger.log('verify if experiment name already exists> [body]');
                const unitMassExists = yield this.UnitMassRepository.findOne({
                    generalData: { experimentName, material: { _id: material._id }, method },
                });
                if (unitMassExists)
                    throw new exceptions_1.AlreadyExists(`UnitMass with name "${experimentName} from user "${material.userId}"`);
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
};
GeneralData_UnitMass_Service = GeneralData_UnitMass_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_2.UnitMassRepository,
        repository_1.MaterialsRepository])
], GeneralData_UnitMass_Service);
exports.GeneralData_UnitMass_Service = GeneralData_UnitMass_Service;
//# sourceMappingURL=general-data.unitMass.service.js.map