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
var Calc_SPECIFYMASS_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calc_SPECIFYMASS_Service = void 0;
const common_1 = require("@nestjs/common");
const repository_1 = require("../repository");
const repository_2 = require("../../../../../modules/asphalt/materials/repository");
let Calc_SPECIFYMASS_Service = Calc_SPECIFYMASS_Service_1 = class Calc_SPECIFYMASS_Service {
    constructor(specifyMassRepository, materialRepository) {
        this.specifyMassRepository = specifyMassRepository;
        this.materialRepository = materialRepository;
        this.logger = new common_1.Logger(Calc_SPECIFYMASS_Service_1.name);
        this.calculatingbulkSpecificGravity = (dry_mass, submerged_mass) => {
            return (0.9971 * (dry_mass /
                (dry_mass - submerged_mass)));
        };
        this.calculatingApparentSpecificGravity = (dry_mass, submerged_mass, saturated_mass) => {
            return (0.9975 * (dry_mass /
                (saturated_mass - submerged_mass)));
        };
        this.calculatingAbsoption = (dry_mass, saturated_mass) => {
            return (((saturated_mass - dry_mass)
                / dry_mass) * 100);
        };
    }
    calculateSpecifyMass({ step2Data }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('calculate specifyMass on calc.specifyMass.service.ts > [body]');
                const { dry_mass, submerged_mass, surface_saturated_mass } = step2Data;
                const bulk_specify_mass = Math.round(100 * (this.calculatingbulkSpecificGravity(dry_mass, submerged_mass))) / 100;
                const apparent_specify_mass = Math.round(100 * (this.calculatingApparentSpecificGravity(dry_mass, submerged_mass, surface_saturated_mass))) / 100;
                const absorption = Math.round(100 * (this.calculatingAbsoption(dry_mass, surface_saturated_mass))) / 100;
                this.logger.log(bulk_specify_mass);
                this.logger.log(apparent_specify_mass);
                this.logger.log(absorption);
                return {
                    success: true,
                    result: {
                        bulk_specify_mass,
                        apparent_specify_mass,
                        absorption,
                    }
                };
            }
            catch (error) {
                return {
                    success: false,
                    result: null
                };
            }
        });
    }
};
Calc_SPECIFYMASS_Service = Calc_SPECIFYMASS_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.SpecifyMassRepository, repository_2.MaterialsRepository])
], Calc_SPECIFYMASS_Service);
exports.Calc_SPECIFYMASS_Service = Calc_SPECIFYMASS_Service;
//# sourceMappingURL=calc.specifyMass.service.js.map