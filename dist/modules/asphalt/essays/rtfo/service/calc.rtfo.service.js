"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var Calc_Rtfo_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calc_Rtfo_Service = void 0;
const common_1 = require("@nestjs/common");
let Calc_Rtfo_Service = Calc_Rtfo_Service_1 = class Calc_Rtfo_Service {
    constructor() {
        this.logger = new common_1.Logger(Calc_Rtfo_Service_1.name);
    }
    calculateRtfo({ rtfo, generalData }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('calculate rtfo on calc.rtfo.service.ts > [body]');
                const resultList = rtfo.list.map(sample => ({
                    initialSetWeight: sample.sampleWeight,
                    weightLoss: ((sample.sampleWeight - sample.finalSampleWeight) / sample.sampleWeight) * 100,
                }));
                const weightLossAverage = resultList.reduce((total, sample) => total + sample.weightLoss, 0) / resultList.length;
                const { material } = generalData;
                const alerts = [];
                if ((material.description.classification_CAP === 'CAP 30/45' || material.description.classification_CAP === 'CAP 50/70' || material.description.classification_CAP === 'CAP 85/100' || material.description.classification_CAP === 'CAP 150/200') &&
                    Math.abs(weightLossAverage) > 0.50) {
                    alerts.push(`A variação de massa para o ${material.description.classification_CAP} não deve ser superior a 0,5%.`);
                }
                if ((material.description.classification_AMP === 'AMP 50/65' || material.description.classification_AMP === 'AMP 55/75' || material.description.classification_AMP === 'AMP 60/85' || material.description.classification_AMP === 'AMP 65/90') &&
                    Math.abs(weightLossAverage) > 1) {
                    alerts.push(`A variação de massa para o ${material.description.classification_AMP} não deve ser superior a 1%.`);
                }
                const result = {
                    list: resultList,
                    weightLossAverage,
                    alerts,
                };
                return {
                    success: true,
                    result,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
};
Calc_Rtfo_Service = Calc_Rtfo_Service_1 = __decorate([
    (0, common_1.Injectable)()
], Calc_Rtfo_Service);
exports.Calc_Rtfo_Service = Calc_Rtfo_Service;
//# sourceMappingURL=calc.rtfo.service.js.map