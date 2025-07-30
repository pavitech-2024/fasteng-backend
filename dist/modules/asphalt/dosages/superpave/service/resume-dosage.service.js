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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var ResumeDosage_Superpave_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumeDosage_Superpave_Service = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const database_config_1 = require("../../../../../infra/mongoose/database.config");
const mongoose_2 = require("mongoose");
const repository_1 = require("../repository");
const schemas_1 = require("../schemas");
let ResumeDosage_Superpave_Service = ResumeDosage_Superpave_Service_1 = class ResumeDosage_Superpave_Service {
    constructor(superpaveModel, superpave_repository) {
        this.superpaveModel = superpaveModel;
        this.superpave_repository = superpave_repository;
        this.logger = new common_1.Logger(ResumeDosage_Superpave_Service_1.name);
    }
    riceTest(massOfDrySample, containerSampleWaterMass, containerWaterMass, temperatureOfWater = 1.0) {
        return (massOfDrySample / (massOfDrySample + containerWaterMass - containerSampleWaterMass)) * temperatureOfWater;
    }
    calculateStep9RiceTest(body) {
        const { gmm, riceTest } = body;
        let gmmValue;
        if (gmm)
            gmmValue = gmm;
        else
            gmmValue = this.riceTest(riceTest.sampleAirDryMass, riceTest.containerSampleWaterMass, riceTest.containerWaterMass);
        return gmmValue;
    }
    calculateDosageResumeEquation(body) {
        const { samplesData, optimumContent, choosenGranulometryComposition, binderSpecificGravity, listOfSpecificGravities, porcentagesPassantsN200, gmm: gmmValue, } = body;
        const confirmGranulometryComposition = {
            ponderatedPercentsOfDosage: null,
            samplesData,
            Gmb: null,
            Vv: null,
            Gmm: Number(gmmValue),
            percentWaterAbs: null,
            specifiesMass: null,
            Vam: null,
            RBV: null,
            quantitative: null,
            diametralTractionResistance: null,
            ratioDustAsphalt: null,
        };
        const isNumber = !isNaN(Number(optimumContent));
        const optimumContentFormatted = isNumber ? optimumContent : 0;
        const ponderatedPercentsOfDosage = choosenGranulometryComposition.percentsOfDosage.map((percent) => ((100 - optimumContentFormatted) * percent) / 100);
        confirmGranulometryComposition.ponderatedPercentsOfDosage = ponderatedPercentsOfDosage;
        confirmGranulometryComposition.samplesData = samplesData;
        confirmGranulometryComposition.Gmb = this.calculateGmb3(samplesData);
        confirmGranulometryComposition.Vv = 1 - confirmGranulometryComposition.Gmb / confirmGranulometryComposition.Gmm;
        confirmGranulometryComposition.percentWaterAbs = this.percentageWaterAbsorbed(samplesData);
        confirmGranulometryComposition.specifiesMass = confirmGranulometryComposition.Gmb;
        confirmGranulometryComposition.Vam =
            confirmGranulometryComposition.Vv + (confirmGranulometryComposition.Gmb * optimumContent) / binderSpecificGravity;
        confirmGranulometryComposition.RBV =
            (confirmGranulometryComposition.Gmb * optimumContent) /
                binderSpecificGravity /
                confirmGranulometryComposition.Vam;
        const gmm = confirmGranulometryComposition.Gmm;
        confirmGranulometryComposition.quantitative = ponderatedPercentsOfDosage.map((percent, i) => (gmm * percent * 10) / 1000 / listOfSpecificGravities[i].realSpecificMass);
        confirmGranulometryComposition.quantitative.unshift(gmm * optimumContent * 10);
        let sumdiametralTractionResistance = 0;
        let ndiametralTractionResistance = 0;
        for (let i = 0; i < samplesData.length; i++) {
            if (samplesData[i].diametralTractionResistance !== undefined) {
                sumdiametralTractionResistance += samplesData[i].diametralTractionResistance;
                ndiametralTractionResistance++;
            }
        }
        if (ndiametralTractionResistance !== 0) {
            confirmGranulometryComposition.diametralTractionResistance =
                sumdiametralTractionResistance / ndiametralTractionResistance;
        }
        let passantN200 = 0;
        for (let i = 0; i < porcentagesPassantsN200.length; i++) {
            passantN200 += (porcentagesPassantsN200[i] * choosenGranulometryComposition.percentsOfDosage[i]) / 100;
        }
        confirmGranulometryComposition.ratioDustAsphalt =
            passantN200 /
                ((-(100 - optimumContent) *
                    binderSpecificGravity *
                    (choosenGranulometryComposition.Gse - choosenGranulometryComposition.combinedGsb)) /
                    (choosenGranulometryComposition.Gse * choosenGranulometryComposition.combinedGsb) +
                    optimumContent);
        return confirmGranulometryComposition;
    }
    calculateGmb3(data) {
        data = this.calculateGmbCP(data);
        const Gmb = this.calculateGmb2(data);
        return Gmb;
    }
    calculateGmbCP(data) {
        for (let i = 0; i < data.length; i++) {
            data[i].Gmb =
                (Math.round((data[i].dryMass / (data[i].drySurfaceSaturatedMass - data[i].submergedMass)) * 1e3) / 1e3) *
                    data[i].waterTemperatureCorrection;
        }
        return data;
    }
    calculateGmb2(data) {
        let sumGmb = 0;
        for (let i = 0; i < data.length; i++) {
            sumGmb += data[i].Gmb;
        }
        const Gmb = sumGmb / data.length;
        return Gmb;
    }
    percentageWaterAbsorbed(data) {
        const [averageDryMass, averageSubmergedMass, averageSaturedMass] = this.calculateMassMedia(data);
        const percentWaterAbs = (100 * (averageSaturedMass - averageDryMass)) / (averageSaturedMass - averageSubmergedMass);
        return percentWaterAbs;
    }
    calculateMassMedia(data) {
        let sumDryMass = 0;
        let sumSubmergedMass = 0;
        let saturatedMass = 0;
        for (let i = 0; i < data.length; i++) {
            sumDryMass += data[i].dryMass;
            sumSubmergedMass += data[i].submergedMass;
            saturatedMass += data[i].drySurfaceSaturatedMass;
        }
        const averageDryMass = sumDryMass / data.length;
        const averageSubmergedMass = sumSubmergedMass / data.length;
        const averageSaturedMass = saturatedMass / data.length;
        return [averageDryMass, averageSubmergedMass, averageSaturedMass];
    }
    saveStep11Data(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('save superpave vonfirm compression step on resume-dosage.superpave.service.ts > [body]', {
                    body,
                });
                const { name } = body.confirmationCompressionData;
                const superpaveExists = yield this.superpave_repository.findOne(name, userId);
                const _a = body.confirmationCompressionData, { name: materialName } = _a, confirmationCompressionDataWithoutName = __rest(_a, ["name"]);
                const superpaveWithConfirmationCompressionData = Object.assign(Object.assign({}, superpaveExists._doc), { confirmationCompressionData: confirmationCompressionDataWithoutName });
                yield this.superpaveModel.updateOne({ _id: superpaveExists._doc._id }, superpaveWithConfirmationCompressionData);
                if (superpaveExists._doc.generalData.step < 11) {
                    yield this.superpave_repository.saveStep(superpaveExists, 11);
                }
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
    saveSuperpaveDosage(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('save superpave dosage on resume-dosage.superpave.service.ts > [body]', { body });
                const { name } = body.dosageResume;
                const superpaveExists = yield this.superpave_repository.findOne(name, userId);
                const _a = body.dosageResume, { name: materialName } = _a, superpaveDosageWithoutName = __rest(_a, ["name"]);
                const superpaveWithResumeDosage = Object.assign(Object.assign({}, superpaveExists._doc), { dosageResume: superpaveDosageWithoutName });
                yield this.superpaveModel.updateOne({ _id: superpaveExists._doc._id }, superpaveWithResumeDosage);
                if (superpaveExists._doc.generalData.step < 10) {
                    yield this.superpave_repository.saveStep(superpaveExists, 10);
                }
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
};
exports.ResumeDosage_Superpave_Service = ResumeDosage_Superpave_Service;
exports.ResumeDosage_Superpave_Service = ResumeDosage_Superpave_Service = ResumeDosage_Superpave_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.Superpave.name, database_config_1.DATABASE_CONNECTION.ASPHALT)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        repository_1.SuperpaveRepository])
], ResumeDosage_Superpave_Service);
//# sourceMappingURL=resume-dosage.service.js.map