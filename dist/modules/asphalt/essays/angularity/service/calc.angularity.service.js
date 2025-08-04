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
var Calc_ANGULARITY_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calc_ANGULARITY_Service = void 0;
const common_1 = require("@nestjs/common");
const repository_1 = require("../repository");
const repository_2 = require("../../../../../modules/asphalt/materials/repository");
let Calc_ANGULARITY_Service = Calc_ANGULARITY_Service_1 = class Calc_ANGULARITY_Service {
    constructor(angularityRepository, materialRepository) {
        this.angularityRepository = angularityRepository;
        this.materialRepository = materialRepository;
        this.logger = new common_1.Logger(Calc_ANGULARITY_Service_1.name);
        this.calculateMethod = (relativeDensity, cylinderVolume, method, determinations) => {
            let average = [];
            const angularities = [];
            const porcentagesOfVoids = [];
            const alerts = [];
            let pass = 1;
            if (method === 'B') {
                pass = 2;
            }
            for (let index = 0; index < determinations.length; index = index + pass) {
                const cylinderMass = determinations[index].cylinder_mass;
                const cylinderMassPlusSample = determinations[index].cylinder_mass_plus_sample;
                if (pass === 2) {
                    const cylinderMass1 = determinations[index + 1].cylinder_mass;
                    const cylinderMassPlusSample1 = determinations[index + 1].cylinder_mass_plus_sample;
                    const porcetage1 = Math.round(100 * (((cylinderVolume - ((cylinderMassPlusSample - cylinderMass) / relativeDensity)) / cylinderVolume) * 100)) / 100;
                    const porcetage2 = Math.round(100 * (((cylinderVolume - ((cylinderMassPlusSample1 - cylinderMass1) / relativeDensity)) / cylinderVolume) * 100)) / 100;
                    const averageOfEntry = Math.round(100 * ((porcetage1 + porcetage2) / 2)) / 100;
                    porcentagesOfVoids.push(porcetage1);
                    porcentagesOfVoids.push(porcetage2);
                    average.push(averageOfEntry);
                    angularities.push({ label: determinations[index].diameter, angularity: averageOfEntry });
                }
                else {
                    const porcentage = Math.round(100 * (((cylinderVolume - ((cylinderMassPlusSample - cylinderMass) / relativeDensity)) / cylinderVolume) * 100)) / 100;
                    porcentagesOfVoids.push(porcentage);
                    average.push(porcentage);
                    angularities.push({ label: determinations[index].determination, angularity: porcentage });
                }
            }
            const averageOfAll = Math.round(100 * (average.reduce(function (sum, index) {
                return sum + index;
            }, 0) / average.length)) / 100;
            for (let index = 0; index < porcentagesOfVoids.length; index = index + 2) {
                const element = porcentagesOfVoids[index];
                const element2 = porcentagesOfVoids[index + 1];
                const verifySub = element - element2;
                if (Math.abs(verifySub) > 3.1) {
                    alerts.push("A angularidade não deve diferir em mais que 3,1% entre as determinações.");
                    break;
                }
            }
            if (averageOfAll < 40) {
                alerts.push("Os agregados miúdos devem apresentar angularidade mínima de 40% para o uso em misturas asfálticas.");
            }
            return {
                angularities,
                averageOfAll,
                porcentagesOfVoids,
                alerts
            };
        };
    }
    calculateAngularity({ step2Data }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('calculate angularity on calc.angularity.service.ts > [body]');
                const { relative_density, cylinder_volume, method, determinations } = step2Data;
                const result = this.calculateMethod(relative_density, cylinder_volume, method, determinations);
                this.logger.debug(result);
                return {
                    success: true,
                    result
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
Calc_ANGULARITY_Service = Calc_ANGULARITY_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.AngularityRepository, repository_2.MaterialsRepository])
], Calc_ANGULARITY_Service);
exports.Calc_ANGULARITY_Service = Calc_ANGULARITY_Service;
//# sourceMappingURL=calc.angularity.service.js.map