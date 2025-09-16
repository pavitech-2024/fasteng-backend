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
var ChosenCurvePercentages_Superpave_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChosenCurvePercentages_Superpave_Service = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const database_config_1 = require("../../../../../infra/mongoose/database.config");
const mongoose_2 = require("mongoose");
const repository_1 = require("../repository");
const schemas_1 = require("../schemas");
let ChosenCurvePercentages_Superpave_Service = ChosenCurvePercentages_Superpave_Service_1 = class ChosenCurvePercentages_Superpave_Service {
    constructor(superpaveModel, superpave_repository) {
        this.superpaveModel = superpaveModel;
        this.superpave_repository = superpave_repository;
        this.logger = new common_1.Logger(ChosenCurvePercentages_Superpave_Service_1.name);
    }
    getChosenCurvePercentsData(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log({ body }, 'start calculate step 5 gmm data > [service]');
                const { curve: choosenGranulometryComposition, trafficVolume, percentsOfDosage } = body;
                let porcentageAggregate = [];
                let returnScreen7 = {};
                const formattedGranulomtryComposition = Object.keys(choosenGranulometryComposition).reduce((acc, key) => {
                    const newKey = key.replace(/Lower|Average|Higher/g, '');
                    acc[newKey] = choosenGranulometryComposition[key];
                    return acc;
                }, {});
                let formattedPercentsOfDosage = [];
                Object.values(percentsOfDosage).forEach((e) => formattedPercentsOfDosage.push(Number(e)));
                const listOfPlis = [
                    formattedGranulomtryComposition.expectedPli - 0.5,
                    formattedGranulomtryComposition.expectedPli,
                    formattedGranulomtryComposition.expectedPli + 0.5,
                    formattedGranulomtryComposition.expectedPli + 1,
                ];
                for (let i = 0; i < formattedPercentsOfDosage.length; i++) {
                    porcentageAggregate.push([]);
                    porcentageAggregate[i].push(((100 - listOfPlis[0]) * formattedPercentsOfDosage[i]) / 100);
                    porcentageAggregate[i].push(((100 - listOfPlis[1]) * formattedPercentsOfDosage[i]) / 100);
                    porcentageAggregate[i].push(((100 - listOfPlis[2]) * formattedPercentsOfDosage[i]) / 100);
                    porcentageAggregate[i].push(((100 - listOfPlis[3]) * formattedPercentsOfDosage[i]) / 100);
                    porcentageAggregate[i].reverse();
                }
                returnScreen7 = {
                    porcentageAggregate,
                    listOfPlis,
                    trafficVolume,
                };
                return returnScreen7;
            }
            catch (error) {
                throw error;
            }
        });
    }
    savePercentsOfChosenCurveData(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('save superpave chosen curve percentages step on chosen-curve-percentages.superpave.service.ts > [body]', { body });
                const { name } = body.chosenCurvePercentagesData;
                const superpaveExists = yield this.superpave_repository.findOne(name, userId);
                const _a = body.chosenCurvePercentagesData, { name: materialName } = _a, chosenCurvePercentagesWithoutName = __rest(_a, ["name"]);
                const superpaveWithChosenCurvePercentages = Object.assign(Object.assign({}, superpaveExists._doc), { chosenCurvePercentagesData: chosenCurvePercentagesWithoutName });
                yield this.superpaveModel.updateOne({ _id: superpaveExists._doc._id }, superpaveWithChosenCurvePercentages);
                if (superpaveExists._doc.generalData.step < 9) {
                    yield this.superpave_repository.saveStep(superpaveExists, 9);
                }
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
};
ChosenCurvePercentages_Superpave_Service = ChosenCurvePercentages_Superpave_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.Superpave.name, database_config_1.DATABASE_CONNECTION.ASPHALT)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        repository_1.SuperpaveRepository])
], ChosenCurvePercentages_Superpave_Service);
exports.ChosenCurvePercentages_Superpave_Service = ChosenCurvePercentages_Superpave_Service;
//# sourceMappingURL=chosen-curves-percentages.service.js.map