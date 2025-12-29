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
var Calc_ELONGATEDPARTICLES_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calc_ELONGATEDPARTICLES_Service = void 0;
const common_1 = require("@nestjs/common");
const repository_1 = require("../repository");
const repository_2 = require("../../../../../modules/asphalt/materials/repository");
let Calc_ELONGATEDPARTICLES_Service = Calc_ELONGATEDPARTICLES_Service_1 = class Calc_ELONGATEDPARTICLES_Service {
    constructor(elongatedParticlesRepository, materialRepository) {
        this.elongatedParticlesRepository = elongatedParticlesRepository;
        this.materialRepository = materialRepository;
        this.logger = new common_1.Logger(Calc_ELONGATEDPARTICLES_Service_1.name);
    }
    calculateElongatedParticles({ step2Data }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('calculate elongatedParticles on calc.elongatedParticles.service.ts > [body]');
                const { dimensions_table_data } = step2Data;
                const results_dimensions_table_data = [];
                dimensions_table_data.map((row) => {
                    const { ratio, sample_mass, mass } = row;
                    const particles_percentage = (sample_mass !== 0 && mass !== 0)
                        ? Math.round(100 * (mass / sample_mass) * 100) / 100
                        : 0;
                    results_dimensions_table_data.push({
                        ratio,
                        particles_percentage
                    });
                });
                const alerts = [];
                if (results_dimensions_table_data[0].particles_percentage > 10) {
                    alerts.push("elongatedParticles.warning.criterion-1_5-max-value");
                }
                return {
                    success: true,
                    result: {
                        results_dimensions_table_data,
                        alerts,
                    },
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
Calc_ELONGATEDPARTICLES_Service = Calc_ELONGATEDPARTICLES_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.ElongatedParticlesRepository, repository_2.MaterialsRepository])
], Calc_ELONGATEDPARTICLES_Service);
exports.Calc_ELONGATEDPARTICLES_Service = Calc_ELONGATEDPARTICLES_Service;
//# sourceMappingURL=calc.elongatedParticles.service.js.map