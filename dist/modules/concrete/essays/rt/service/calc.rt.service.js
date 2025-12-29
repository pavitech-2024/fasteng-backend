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
var Calc_ConcreteRt_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calc_ConcreteRt_Service = void 0;
const common_1 = require("@nestjs/common");
const referenceTables_1 = require("./referenceTables");
let Calc_ConcreteRt_Service = Calc_ConcreteRt_Service_1 = class Calc_ConcreteRt_Service {
    constructor() {
        this.logger = new common_1.Logger(Calc_ConcreteRt_Service_1.name);
    }
    calculateConcreteRt({ step2Data, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('calculate rt on calc.rc.service.ts > [body]');
                const samples = step2Data;
                const result = {
                    tolerances: new Array(samples.length).fill(null),
                    flexualTensileStrength: new Array(samples.length).fill(null),
                    compressionResistance: new Array(samples.length).fill(null),
                };
                const toleranceRefs = this.findToleranceRefs(samples);
                result.flexualTensileStrength = this.calculateTolerance(samples, toleranceRefs);
                for (let i = 0; i < samples.length; i++) {
                    result.flexualTensileStrength[i] = this.calculateFlexualTensileStrength(samples[i].appliedCharge, samples[i].supportsDistance);
                    result.compressionResistance[i] = this.calculateCompressionResistance(samples[i].appliedCharge);
                }
                return {
                    success: true,
                    result,
                };
            }
            catch (error) {
                return {
                    success: false,
                    result: null,
                };
            }
        });
    }
    findToleranceRefs(samples) {
        try {
            this.logger.log('find refs on calc.rc.service.ts > [body]');
            let higherReference = new Array(samples.length).fill(null);
            let lowerReference = new Array(samples.length).fill(null);
            for (let i = 0; i < samples.length; i++) {
                const toleranceFound = referenceTables_1.ruptureAge.find((e) => e.age * 60 === samples[i].age);
                if (toleranceFound) {
                    higherReference[i] = toleranceFound;
                    lowerReference[i] = toleranceFound;
                }
                else {
                    let lowerIndex;
                    let higherIndex;
                    for (let j = 0; j < referenceTables_1.ruptureAge.length; j++) {
                        if (referenceTables_1.ruptureAge[j].age * 60 < samples[i].age) {
                            lowerIndex = j;
                        }
                        else if (referenceTables_1.ruptureAge[j].age * 60 > samples[i].age) {
                            higherIndex = j;
                            break;
                        }
                    }
                    const higherReferenceArr = higherIndex !== undefined ? referenceTables_1.ruptureAge[higherIndex] : null;
                    higherReference[i] = higherReferenceArr;
                    const lowerReferenceArr = lowerIndex !== undefined ? referenceTables_1.ruptureAge[lowerIndex] : null;
                    lowerReference[i] = lowerReferenceArr;
                }
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
            let toleranceRatio;
            const tolerances = new Array(samples.length).fill(null);
            for (let i = 0; i < samples.length; i++) {
                if (refs.higherReference[i].age !== refs.lowerReference[i].age) {
                    const ageDifference = higherReference[i].age * 60 - lowerReference[i].age * 60;
                    const toleranceDifference = higherReference[i].tolerance - lowerReference[i].tolerance;
                    const ageRatio = ageDifference / samples[i].age;
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
    verifyToleranceInput(samples, toleranceRatio) {
        try {
            this.logger.log('verify tolerance input on calc.rt.service.ts > [body]');
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
    calculateFlexualTensileStrength(appliedCharge, supportsDistance) {
        const chargeSupportsProduct = appliedCharge * supportsDistance;
        const finalProduct = 1.5 * chargeSupportsProduct;
        const flexualTensileStrength = finalProduct / 64000;
        return flexualTensileStrength;
    }
    calculateCompressionResistance(appliedCharge) {
        const compressionResistance = appliedCharge / 1600;
        return compressionResistance;
    }
};
Calc_ConcreteRt_Service = Calc_ConcreteRt_Service_1 = __decorate([
    (0, common_1.Injectable)()
], Calc_ConcreteRt_Service);
exports.Calc_ConcreteRt_Service = Calc_ConcreteRt_Service;
//# sourceMappingURL=calc.rt.service.js.map