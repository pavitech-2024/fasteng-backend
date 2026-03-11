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
var Calc_SofteningPoint_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calc_SofteningPoint_Service = void 0;
const common_1 = require("@nestjs/common");
const service_1 = require("../../../../../modules/asphalt/materials/service");
let Calc_SofteningPoint_Service = Calc_SofteningPoint_Service_1 = class Calc_SofteningPoint_Service {
    constructor(materialsService) {
        this.materialsService = materialsService;
        this.logger = new common_1.Logger(Calc_SofteningPoint_Service_1.name);
    }
    calculateSofteningPoint(_a) {
        return __awaiter(this, arguments, void 0, function* ({ softeningPoint, generalData }) {
            try {
                this.logger.log('calculate softening point on calc.softeningPoint.service.ts > [body]');
                const { material } = generalData;
                const { temperature1, temperature2 } = softeningPoint;
                const result = {
                    softeningPoint: 0,
                    indexOfSusceptibility: 0,
                    alerts: []
                };
                result.softeningPoint = (temperature1 + temperature2) / 2;
                const alert = yield this.verifyResult(softeningPoint, material, result.softeningPoint);
                if (alert.length > 0) {
                    result.alerts.push(...alert);
                }
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
    verifyResult(softeningPointData, materialData, softeningPointResult) {
        return __awaiter(this, void 0, void 0, function* () {
            let alerts = [];
            let alert;
            const { temperature1, temperature2 } = softeningPointData;
            const materialType = materialData.type;
            const classificationAMP = materialData.description.classification_AMP;
            const classificationCAP = materialData.description.classification_CAP;
            if (Math.abs(temperature1 - temperature2) > 2) {
                alerts.push("Alerta: a diferença entre as temperaturas não deve ser maior que 2°C.");
            }
            if (materialType === 'asphaltBinder' && classificationAMP !== null) {
                alert = yield this.verifyResultForAmp(classificationAMP, softeningPointResult);
                if (alert)
                    alerts.push(alert);
            }
            else if (materialType === 'asphaltBinder' && classificationCAP !== null) {
                alert = yield this.verifyResultForCap(classificationCAP, softeningPointResult);
                if (alert)
                    alerts.push(alert);
            }
            return alerts;
        });
    }
    verifyResultForAmp(classification_AMP, softeningPointResult) {
        return __awaiter(this, void 0, void 0, function* () {
            let alert = "";
            if (classification_AMP === "AMP 50/65" && softeningPointResult < 50) {
                alert = "Alerta: para o " + classification_AMP + " o ponto de amolecimento mínimo deve ser 50 °C";
            }
            else if (classification_AMP === "AMP 55/75" && softeningPointResult < 55) {
                alert = "Alerta: para o " + classification_AMP + " o ponto de amolecimento mínimo deve ser 55 °C";
            }
            else if (classification_AMP === "AMP 60/85" && softeningPointResult < 60) {
                alert = "Alerta: para o " + classification_AMP + " o ponto de amolecimento mínimo deve ser 60 °C";
            }
            else if (classification_AMP === "AMP 65/90" && softeningPointResult < 65) {
                alert = "Alerta: para o " + classification_AMP + " o ponto de amolecimento mínimo deve ser 65 °C";
            }
            return alert;
        });
    }
    verifyResultForCap(classification_CAP, softeningPointResult) {
        return __awaiter(this, void 0, void 0, function* () {
            let alert = "";
            if (classification_CAP === "CAP 30/45" && softeningPointResult < 52) {
                alert = "Alerta: de acordo com a ANP (2005), para o " + classification_CAP + " o ponto de amolecimento mínimo deve ser 52 °C";
            }
            else if (classification_CAP === "CAP 50/70" && softeningPointResult < 46) {
                alert = "Alerta: de acordo com a ANP (2005), para o " + classification_CAP + " o ponto de amolecimento mínimo deve ser 46 °C";
            }
            else if (classification_CAP === "CAP 85/100" && softeningPointResult < 43) {
                alert = "Alerta: de acordo com a ANP (2005), para o " + classification_CAP + " o ponto de amolecimento mínimo deve ser 43 °C";
            }
            else if (classification_CAP === "CAP 150/200" && softeningPointResult < 37) {
                alert = "Alerta: de acordo com a ANP (2005), para o " + classification_CAP + " o ponto de amolecimento mínimo deve ser 37 °C";
            }
            return alert;
        });
    }
};
exports.Calc_SofteningPoint_Service = Calc_SofteningPoint_Service;
exports.Calc_SofteningPoint_Service = Calc_SofteningPoint_Service = Calc_SofteningPoint_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [service_1.MaterialsService])
], Calc_SofteningPoint_Service);
//# sourceMappingURL=calc-softeningPoint.softeningPoint.service.js.map