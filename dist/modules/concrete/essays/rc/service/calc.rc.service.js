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
var Calc_CONCRETERC_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calc_CONCRETERC_Service = void 0;
const common_1 = require("@nestjs/common");
const referenceTables_1 = require("./referenceTables");
let Calc_CONCRETERC_Service = Calc_CONCRETERC_Service_1 = class Calc_CONCRETERC_Service {
    constructor() {
        this.logger = new common_1.Logger(Calc_CONCRETERC_Service_1.name);
    }
    calculateRc(_a) {
        return __awaiter(this, arguments, void 0, function* ({ step2Data }) {
            try {
                this.logger.log('calculate rc on calc.rc.service.ts > [body]');
                const samples = step2Data;
                let correctionRefs = new Array(samples.length).fill(null);
                const result = {
                    tolerances: new Array(samples.length).fill(null),
                    correctionFactors: new Array(samples.length).fill(null),
                    finalResult: new Array(samples.length).fill(null),
                };
                const toleranceRefs = this.findToleranceRefs(samples);
                result.tolerances = this.calculateTolerance(samples, toleranceRefs);
                for (let i = 0; i < samples.length; i++) {
                    const diammeterRatio = (samples[i].diammeter1 + samples[i].diammeter2) / 2;
                    const heightDiammeterRatio = samples[i].height / diammeterRatio;
                    if (heightDiammeterRatio >= 2.06) {
                        throw new common_1.BadRequestException('Diameter ratio needs to be smaller than 2.06');
                    }
                    else if (heightDiammeterRatio <= 1.94) {
                        const correctionRefsValue = this.findCorrectionFactorRefs(heightDiammeterRatio);
                        correctionRefs[i] = correctionRefsValue;
                    }
                    else if (heightDiammeterRatio >= 1.94 && heightDiammeterRatio <= 2.06) {
                        correctionRefs[i] = heightDiammeterRatio;
                        result.correctionFactors[i] = heightDiammeterRatio;
                    }
                }
                result.correctionFactors = this.calculateCorrectionFactor(samples, correctionRefs);
                result.finalResult = this.calculateFinalResults(samples, result.correctionFactors);
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
    calculateFinalResults(samples, correctionFactors) {
        const results = new Array(samples.length);
        const factor = 4 / Math.PI;
        for (let i = 0; i < samples.length; i++) {
            const averageDiameter = (samples[i].diammeter1 + samples[i].diammeter2) / 2;
            results[i] = factor * correctionFactors[i] / Math.pow(averageDiameter, 2);
        }
        return results;
    }
    findToleranceRefs(samples) {
        try {
            this.logger.log('find refs on calc.rc.service.ts > [body]');
            let higherReference = new Array(samples.length).fill(null);
            let lowerReference = new Array(samples.length).fill(null);
            for (let i = 0; i < samples.length; i++) {
                const toleranceFound = referenceTables_1.concreteRcToleranceAge.find((e) => e.age * 60 === samples[i].age);
                if (toleranceFound) {
                    higherReference[i] = toleranceFound;
                    lowerReference[i] = toleranceFound;
                }
                else {
                    let lowerIndex;
                    let higherIndex;
                    for (let j = 0; j < referenceTables_1.concreteRcToleranceAge.length; j++) {
                        if (referenceTables_1.concreteRcToleranceAge[j].age * 60 < samples[i].age) {
                            lowerIndex = j;
                        }
                        else if (referenceTables_1.concreteRcToleranceAge[j].age * 60 > samples[i].age) {
                            higherIndex = j;
                            break;
                        }
                    }
                    const higherReferenceArr = higherIndex !== undefined ? referenceTables_1.concreteRcToleranceAge[higherIndex] : null;
                    higherReference[i] = higherReferenceArr;
                    const lowerReferenceArr = lowerIndex !== undefined ? referenceTables_1.concreteRcToleranceAge[lowerIndex] : null;
                    lowerReference[i] = lowerReferenceArr;
                }
            }
            return { higherReference, lowerReference };
        }
        catch (error) {
            throw error;
        }
    }
    findCorrectionFactorRefs(heightDiammeterRatio) {
        var _a;
        try {
            this.logger.log('find refs on calc.rc.service.ts > [body]');
            let higherReference;
            let lowerReference;
            const correctionFound = referenceTables_1.correctionFactorArr.find((e) => e.diammHeightRatio === heightDiammeterRatio);
            if (correctionFound) {
                higherReference = correctionFound;
                lowerReference = correctionFound;
            }
            else {
                let lowerIndex;
                let higherIndex;
                for (let j = 0; j < referenceTables_1.correctionFactorArr.length; j++) {
                    if (referenceTables_1.correctionFactorArr[j].diammHeightRatio <= heightDiammeterRatio &&
                        ((_a = referenceTables_1.correctionFactorArr[j + 1]) === null || _a === void 0 ? void 0 : _a.diammHeightRatio) > heightDiammeterRatio) {
                        lowerIndex = j;
                        higherIndex = j + 1;
                        break;
                    }
                }
                higherReference = higherIndex !== undefined ? referenceTables_1.correctionFactorArr[higherIndex] : null;
                lowerReference = lowerIndex !== undefined ? referenceTables_1.correctionFactorArr[lowerIndex] : null;
            }
            return { higherReference, lowerReference };
        }
        catch (error) {
            throw error;
        }
    }
    calculateTolerance(samples, refs) {
        try {
            this.logger.log('calculate tolerance on calc.rc.service.ts > [body]');
            const { higherReference, lowerReference } = refs;
            const averageDiammeters = new Array(samples.length).fill(null);
            const tolerances = new Array(samples.length).fill(null);
            let toleranceRatio;
            for (let i = 0; i < samples.length; i++) {
                if (refs.higherReference[i].age !== refs.lowerReference[i].age) {
                    const ageDifference = higherReference[i].age * 60 - lowerReference[i].age * 60;
                    const toleranceDifference = higherReference[i].tolerance * 60 - lowerReference[i].tolerance * 60;
                    const averageDiammeter = (samples[i].diammeter1 + samples[i].diammeter2) / 2;
                    averageDiammeters[i] = averageDiammeter;
                    const ageInput = higherReference[i].age * 60 - samples[i].age;
                    const ageRatio = ageDifference / ageInput;
                    const toleranceValue = (ageRatio * higherReference[i].tolerance) / toleranceDifference;
                    toleranceRatio = toleranceValue / higherReference[i].tolerance;
                    tolerances[i] = toleranceRatio;
                }
                else {
                    toleranceRatio = refs.higherReference[i].tolerance;
                    tolerances[i] = toleranceRatio;
                }
                const { success } = this.verifyToleranceInput(samples[i].tolerance, toleranceRatio);
                if (!success) {
                    throw new common_1.BadRequestException(`Invalid tolerance input > index: ${i}`);
                }
            }
            return tolerances;
        }
        catch (error) {
            throw error;
        }
    }
    calculateCorrectionFactor(samples, correctionRefs) {
        try {
            this.logger.log('calculate correction factor on calc.rc.service.ts > [body]');
            let correctionFactor = new Array(samples.length).fill(null);
            for (let i = 0; i < samples.length; i++) {
                if (correctionRefs[i] !== null && Object.keys(correctionRefs[i]).some((key) => key === 'higherReference')) {
                    const averageDiammeter = (samples[i].diammeter1 + samples[i].diammeter2) / 2;
                    const heightDiammeterRatio = Number((samples[i].height / averageDiammeter).toFixed(2));
                    if (heightDiammeterRatio >= 2.06) {
                        throw new common_1.BadRequestException('Diameter ratio needs to be smaller than 2.06');
                    }
                    else if (heightDiammeterRatio <= 1.94) {
                        const correctionFound = referenceTables_1.correctionFactorArr.find((e) => e.diammHeightRatio === heightDiammeterRatio);
                        if (!correctionFound) {
                            const diammterRatioDifference = correctionRefs[i].higherReference.diammHeightRatio - correctionRefs[i].lowerReference.diammHeightRatio;
                            const correctionFactorDifference = correctionRefs[i].higherReference.correctionFactor - correctionRefs[i].lowerReference.correctionFactor;
                            const value = correctionRefs[i].higherReference.diammHeightRatio - heightDiammeterRatio;
                            const formattedValue = Number(value.toFixed(2));
                            const ratio = diammterRatioDifference / formattedValue;
                            const ratio2 = correctionFactorDifference / ratio;
                            const finalInterpolation = correctionRefs[i].higherReference.correctionFactor - ratio2;
                            const correctionRatio = finalInterpolation * samples[i].maximumStrenghth;
                            correctionFactor[i] = correctionRatio;
                        }
                        else if (heightDiammeterRatio <= 1.94 && heightDiammeterRatio >= 2.06) {
                            correctionFactor[i] = heightDiammeterRatio;
                        }
                    }
                }
            }
            return correctionFactor;
        }
        catch (error) {
            throw error;
        }
    }
    verifyToleranceInput(samples, toleranceRatio) {
        try {
            this.logger.log('verify tolerance input on calc.rc.service.ts > [body]');
            if (samples > toleranceRatio + 10 && samples < toleranceRatio - 10) {
                return {
                    success: false,
                    error: 'tolarance ratio is not permitted.',
                };
            }
            return {
                success: true,
                error: null,
            };
        }
        catch (error) {
            throw error;
        }
    }
};
exports.Calc_CONCRETERC_Service = Calc_CONCRETERC_Service;
exports.Calc_CONCRETERC_Service = Calc_CONCRETERC_Service = Calc_CONCRETERC_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], Calc_CONCRETERC_Service);
//# sourceMappingURL=calc.rc.service.js.map