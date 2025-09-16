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
var Calc_Abrasion_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calc_Abrasion_Service = void 0;
const common_1 = require("@nestjs/common");
const repository_1 = require("../../../materials/repository");
const repository_2 = require("../repository");
let Calc_Abrasion_Service = Calc_Abrasion_Service_1 = class Calc_Abrasion_Service {
    constructor(abrasionRepository, materialRepository) {
        this.abrasionRepository = abrasionRepository;
        this.materialRepository = materialRepository;
        this.logger = new common_1.Logger(Calc_Abrasion_Service_1.name);
    }
    calculateAbrasion(calcAbrasionDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('calculate abrasion on calc.abrasion.service.ts > [body]');
                const { initialMass, finalMass } = calcAbrasionDto.abrasionCalc;
                const losAngelesAbrasionResult = this.calculateLosAngelesAbrasion(initialMass, finalMass);
                const alerts = this.verifyResult(losAngelesAbrasionResult);
                return {
                    success: true,
                    result: {
                        losAngelesAbrasion: losAngelesAbrasionResult,
                        alerts: alerts,
                    },
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    calculateLosAngelesAbrasion(inicialMass, finalMass) {
        if (inicialMass > finalMass) {
            return ((inicialMass - finalMass) * 100) / inicialMass;
        }
        else {
            throw new Error("Atenção: a massa inicial deve ser maior que a massa final.");
        }
    }
    verifyResult(losAngelesAbrasionResult) {
        const alerts = [];
        if (losAngelesAbrasionResult > 50) {
            alerts.push("Alerta: de acordo com a especificação DNIT 031/2006, o desgaste Los Angeles deve ser igual ou inferior a 50%, admitindo-se excepcionalmente agregados com valores maiores, no caso de terem apresentado comprovadamente desempenho satisfatório em utilização anterior.");
        }
        return alerts;
    }
};
Calc_Abrasion_Service = Calc_Abrasion_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_2.AbrasionRepository, repository_1.MaterialsRepository])
], Calc_Abrasion_Service);
exports.Calc_Abrasion_Service = Calc_Abrasion_Service;
//# sourceMappingURL=calc.abrasion.service.js.map