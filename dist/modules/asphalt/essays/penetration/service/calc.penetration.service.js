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
var Calc_Penetration_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calc_Penetration_Service = void 0;
const common_1 = require("@nestjs/common");
const repository_1 = require("../../../materials/repository");
const repository_2 = require("../repository");
const repository_3 = require("../../softeningPoint/repository");
let Calc_Penetration_Service = Calc_Penetration_Service_1 = class Calc_Penetration_Service {
    constructor(penetrationRepository, materialRepository, softeningPointRespository) {
        this.penetrationRepository = penetrationRepository;
        this.materialRepository = materialRepository;
        this.softeningPointRespository = softeningPointRespository;
        this.logger = new common_1.Logger(Calc_Penetration_Service_1.name);
    }
    calculatePenetration(_a) {
        return __awaiter(this, arguments, void 0, function* ({ penetrationCalc, generalData, }) {
            try {
                this.logger.log('calculate penetration on calc.penetration.service.ts > [body]');
                const { points } = penetrationCalc;
                const { material } = generalData;
                const penetration = points.reduce((soma, valor) => (soma += valor)) / points.length;
                const indexOfSusceptibility = yield this.setIndexOfSusceptibility(penetration, material);
                yield this.verifyResults(penetration, points, material);
                return {
                    success: true,
                    result: {
                        penetration,
                        cap: '',
                        alerts: '',
                        indexOfSusceptibility,
                    },
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    setIndexOfSusceptibility(penetration, material) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('set index of susceptibility on calc.penetration.service.ts > [body]');
            try {
                let indexOfSusceptibility = 0;
                if (material.description.classification_CAP) {
                    const allSofteningPointsById = yield this.softeningPointRespository.findAllByMaterialId(material._id);
                    if (allSofteningPointsById.length === 1 || allSofteningPointsById.length > 1) {
                        const softeningPoint = allSofteningPointsById[allSofteningPointsById.length - 1];
                        if (softeningPoint) {
                            indexOfSusceptibility = this.calculateIndexOfSusceptibility(penetration, softeningPoint.results.data.softeningPoint);
                        }
                    }
                }
                return indexOfSusceptibility;
            }
            catch (error) {
                this.logger.error('Error in setIndexOfSusceptibility', error);
                throw error;
            }
        });
    }
    calculateIndexOfSusceptibility(penetration, softeningPoint) {
        this.logger.log('calculate index of susceptibility on calc.penetration.service.ts > [body]');
        try {
            const indexOfSusceptibility = (500 * Math.log(penetration) + (20 * softeningPoint - 1951)) /
                (120 - 50 * Math.log(penetration) + softeningPoint);
            return indexOfSusceptibility;
        }
        catch (error) {
            this.logger.error('Error in calculateIndexOfSusceptibility', error);
            throw error;
        }
    }
    compareResults(penetration, points, material) {
        let alert = false;
        let max = Math.max(...points);
        let min = Math.min(...points);
        let maxDifference = 0;
        let alerts = [];
        if (penetration >= 0 && penetration <= 4.9) {
            maxDifference = 0.2;
        }
        else if (penetration >= 5 && penetration <= 14.9) {
            maxDifference = 0.4;
        }
        else if (penetration >= 15 && penetration <= 24.9) {
            maxDifference = 1.2;
        }
        else if (penetration >= 25 && penetration <= 50) {
            maxDifference = 2;
        }
        alert = this.compareHighAndlower(max, min, maxDifference);
        if (alert) {
            alerts.push('Atenção: diferença máxima entre o valor mais alto e mais baixo das determinações acima do valor recomendado (DNIT-ME 155/2010).');
        }
        return this.classifyCap(penetration, material);
    }
    compareHighAndlower(high, lower, difference) {
        if (difference == 0 && Math.abs(high - lower) <= difference) {
            return false;
        }
        return true;
    }
    classifyCap(penetration, material) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let type;
                let alert = '';
                if (penetration >= 3 && penetration <= 4.5) {
                    type = 'CAP 30/45';
                }
                else if (penetration >= 5 && penetration <= 7) {
                    type = 'CAP 50/70';
                }
                else if (penetration >= 8.5 && penetration <= 10) {
                    type = 'CAP 85/100';
                }
                else if (penetration >= 15 && penetration <= 20) {
                    type = 'CAP 150/200';
                }
                if ((!material.description.classification_CAP && material.type === 'CAP') || material.type === 'other') {
                    const materialFinded = yield this.materialRepository.findById(material._id);
                    materialFinded.description.classification_CAP = type;
                    yield this.materialRepository.findOneAndUpdate({ _id: materialFinded._id }, materialFinded, { new: true });
                }
                else {
                    if (!material.description.classification_AMP && material.type === 'asphaltBinder') {
                        alert += this.ampAlert(penetration, material.description.classification_AMP);
                    }
                }
                return { type: type, alert: alert };
            }
            catch (error) {
                this.logger.error('Error in classifyCap', error);
                throw error;
            }
        });
    }
    ampAlert(penetration, classification) {
        let out = false;
        if ((classification === 'AMP 50/65' || classification === 'AMP 55/75') && (penetration < 4.5 || penetration > 7)) {
            out = true;
        }
        else if ((classification === 'AMP 60/85' || classification === 'AMP 65/90') &&
            (penetration < 4 || penetration > 7)) {
            out = true;
        }
        if (out) {
            return 'Atenção: resultado de penetração fora dos limites especificados para o ' + classification + '.';
        }
        return '';
    }
    verifyResults(penetration, points, material) {
        return __awaiter(this, void 0, void 0, function* () {
            let cap = yield this.compareResults(penetration, points, material);
            return {
                cap: cap.type,
                alert: cap.alert,
            };
        });
    }
};
exports.Calc_Penetration_Service = Calc_Penetration_Service;
exports.Calc_Penetration_Service = Calc_Penetration_Service = Calc_Penetration_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_2.PenetrationRepository,
        repository_1.MaterialsRepository,
        repository_3.SofteningPointRepository])
], Calc_Penetration_Service);
//# sourceMappingURL=calc.penetration.service.js.map