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
var Calc_Fwd_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calc_Fwd_Service = void 0;
const common_1 = require("@nestjs/common");
const repository_1 = require("../repository");
let Calc_Fwd_Service = Calc_Fwd_Service_1 = class Calc_Fwd_Service {
    constructor(fwdRepository) {
        this.fwdRepository = fwdRepository;
        this.logger = new common_1.Logger(Calc_Fwd_Service_1.name);
    }
    calculateFwd({ fwdStep3 }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dFWD2Db = (dFWD, forca) => {
                    const fwdMicro = (dFWD / 10) * (41 / forca);
                    let fwd;
                    if (fwdMicro > 85) {
                        fwd = 8.964 * Math.pow(fwdMicro - 60 > 0 ? fwdMicro - 60 : 0, 0.715);
                    }
                    else {
                        fwd = 20.645 * Math.pow(fwdMicro - 19 > 0 ? fwdMicro - 19 : 0, 0.351);
                    }
                    return fwd / 10;
                };
                const { spreadsheetData } = fwdStep3;
                let cumulativeArea = 0;
                const deflection = (data, index) => (index === 0 ? 0.0 : ((data[index].d1 + data[index - 1].d1) / 2) * 10);
                const positions = [];
                const newD = spreadsheetData.filter((data, index) => {
                    if (dFWD2Db(data.d1, data.force) > 0) {
                        return data;
                    }
                    positions.push(index);
                });
                const processedData = newD
                    .map((data) => {
                    const obj = {
                        hodometro: data.hodometro,
                        force: data.force,
                    };
                    return Object.keys(data).reduce((acc, key) => {
                        if (String(key)[0] === 'd')
                            return Object.assign(Object.assign({}, acc), { [key]: dFWD2Db(data[key], data.force) });
                        return acc;
                    }, obj);
                })
                    .map((data, index, spreadsheetData) => {
                    const meanDeflection = deflection(spreadsheetData, index);
                    const areaBetweenStationCurves = meanDeflection * (index === 0 ? 0 : data.hodometro - spreadsheetData[index - 1].hodometro);
                    cumulativeArea += areaBetweenStationCurves;
                    return Object.assign(Object.assign({}, data), { meanDeflection,
                        areaBetweenStationCurves,
                        cumulativeArea });
                })
                    .map((data, index, spreadsheetData) => {
                    return Object.assign(Object.assign({}, data), { cumulativeDifference: data.cumulativeArea -
                            (spreadsheetData[spreadsheetData.length - 1].cumulativeArea /
                                spreadsheetData[spreadsheetData.length - 1].hodometro) *
                                data.hodometro });
                });
                const graphData = processedData.map((dado) => [dado.hodometro, dado.cumulativeDifference]);
                return {
                    success: true,
                    result: {
                        processedData,
                        graphData,
                        deletedPositions: positions,
                    },
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
};
Calc_Fwd_Service = Calc_Fwd_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.FwdRepository])
], Calc_Fwd_Service);
exports.Calc_Fwd_Service = Calc_Fwd_Service;
//# sourceMappingURL=calc.fwd.service.js.map