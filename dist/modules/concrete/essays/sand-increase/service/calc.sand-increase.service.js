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
var Calc_SandIncrease_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calc_SandIncrease_Service = void 0;
const common_1 = require("@nestjs/common");
const leastSquaresRegression_1 = require("../../../../../utils/leastSquaresRegression");
let Calc_SandIncrease_Service = Calc_SandIncrease_Service_1 = class Calc_SandIncrease_Service {
    constructor() {
        this.logger = new common_1.Logger(Calc_SandIncrease_Service_1.name);
    }
    calculateSandIncrease(calc_SandIncreaseDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('calculate sand-increase on calc.sand-increase.service.ts > [body]');
                const result = {
                    unitMasses: [],
                    moistureContent: [],
                    swellings: [],
                    curve: [[0, 0]],
                    retaR: [[0, 0]],
                    retaS: [[0, 0]],
                    retaT: [[0, 0]],
                    retaU: [[0, 0]],
                    averageCoefficient: 0,
                    criticalHumidity: 0,
                };
                const findedUnitMasses = calc_SandIncreaseDto.unitMassDeterminationData.tableData.map((item) => item.unitMass);
                const findedContents = calc_SandIncreaseDto.humidityFoundData.map((item) => item.moistureContent);
                const dryUnitMass = calc_SandIncreaseDto.unitMassDeterminationData.tableData[0].unitMass;
                let swellings = [];
                for (let i = 0; i < findedUnitMasses.length; i++) {
                    if (findedUnitMasses[i] !== 0) {
                        const swelling = (dryUnitMass / findedUnitMasses[i]) * ((100 + findedContents[i]) / 100);
                        swellings.push(swelling);
                    }
                    else {
                        swellings.push(null);
                    }
                }
                result.swellings = swellings;
                const g = graphLines(findedContents, swellings);
                result.unitMasses = findedUnitMasses;
                result.moistureContent = findedContents;
                result.curve = g.curve;
                result.retaR = g.retaR;
                result.retaS = g.retaS;
                result.retaT = g.retaT;
                result.retaU = g.retaU;
                result.averageCoefficient = g.averageCoefficient;
                result.criticalHumidity = g.criticalHumidity;
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
exports.Calc_SandIncrease_Service = Calc_SandIncrease_Service;
exports.Calc_SandIncrease_Service = Calc_SandIncrease_Service = Calc_SandIncrease_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], Calc_SandIncrease_Service);
function graphLines(listaDeX, listaDeY) {
    console.log('Lista X>', listaDeX, 'Lista Y>', listaDeY);
    const coeficiente = (0, leastSquaresRegression_1.regression)(listaDeX, listaDeY, 3);
    console.log('coeficiente->', coeficiente);
    const a = coeficiente[3] * 3;
    const b = coeficiente[2] * 2;
    const c = coeficiente[1];
    const PontosDaCurva = listaDeX.map(value => {
        const y = (Math.pow(value, 3)) * coeficiente[3] + (Math.pow(value, 2)) * coeficiente[2] + value * coeficiente[1] + coeficiente[0];
        return [value, y];
    });
    const raiz1 = (-1 * b + Math.sqrt((Math.pow(b, 2)) - 4 * a * c)) / (2 * a);
    const raiz2 = (-1 * b - Math.sqrt((Math.pow(b, 2)) - 4 * a * c)) / (2 * a);
    const yDaRaiz1 = coeficiente[3] * Math.pow(raiz1, 3) + coeficiente[2] * Math.pow(raiz1, 2) + raiz1 * coeficiente[1] + coeficiente[0];
    const yDaRaiz2 = coeficiente[3] * Math.pow(raiz2, 3) + coeficiente[2] * Math.pow(raiz2, 2) + raiz2 * coeficiente[1] + coeficiente[0];
    const segundaDerivadaDaRaiz1 = 2 * a * raiz1 + b;
    const segundaDerivadaDaRaiz2 = 2 * a * raiz2 + b;
    let pontoMaximo;
    if (raiz1 > listaDeX[listaDeX.length - 1]) {
        pontoMaximo = [raiz2, yDaRaiz2];
    }
    else if (raiz2 > listaDeX[listaDeX.length - 1]) {
        pontoMaximo = [raiz1, yDaRaiz1];
    }
    else if (segundaDerivadaDaRaiz1 < segundaDerivadaDaRaiz2) {
        pontoMaximo = [raiz1, yDaRaiz1];
    }
    else {
        pontoMaximo = [raiz2, yDaRaiz2];
    }
    const retaR = pontoMaximo[1];
    const PontosDaRetaR = [[0, retaR], [pontoMaximo[0], retaR], [listaDeX[listaDeX.length - 1], retaR]];
    console.log('reta R:', PontosDaRetaR);
    const inclinacaoRetaS = (pontoMaximo[1] - listaDeY[0]) / (pontoMaximo[0] - listaDeX[0]);
    const retaS = [inclinacaoRetaS, listaDeY[0]];
    const PontosDaRetaS = [[listaDeX[0], listaDeY[0]], pontoMaximo];
    const novaRaiz1 = (-1 * coeficiente[2] + Math.sqrt((Math.pow(coeficiente[2], 2)) - 4 * coeficiente[3] * (coeficiente[1] - inclinacaoRetaS))) / (2 * coeficiente[3]);
    const novaRaiz2 = (-1 * coeficiente[2] - Math.sqrt((Math.pow(coeficiente[2], 2)) - 4 * coeficiente[3] * (coeficiente[1] - inclinacaoRetaS))) / (2 * coeficiente[3]);
    const yDaNovaRaiz1 = coeficiente[3] * Math.pow(novaRaiz1, 3) + coeficiente[2] * Math.pow(novaRaiz1, 2) + novaRaiz1 * coeficiente[1] + coeficiente[0];
    const yDaNovaRaiz2 = coeficiente[3] * Math.pow(novaRaiz2, 3) + coeficiente[2] * Math.pow(novaRaiz2, 2) + novaRaiz2 * coeficiente[1] + coeficiente[0];
    const segundaDerivadaDaNovaRaiz1 = 2 * a * novaRaiz1 + b;
    const segundaDerivadaDaNovaRaiz2 = 2 * a * novaRaiz2 + b;
    let pontoTangente;
    if (segundaDerivadaDaNovaRaiz1 < segundaDerivadaDaNovaRaiz2) {
        pontoTangente = [novaRaiz1, yDaNovaRaiz1];
    }
    else {
        pontoTangente = [novaRaiz2, yDaNovaRaiz2];
    }
    const retaT = [inclinacaoRetaS, (-1 * pontoTangente[0] * inclinacaoRetaS + pontoTangente[1])];
    console.log('reta T:', retaT);
    const PontosDaRetaT = [[0, retaT[1]], pontoTangente];
    const retaU = (pontoMaximo[1] - retaT[1]) / retaT[0];
    const yDoPontoB = coeficiente[2] * Math.pow(retaU, 2) + retaU * coeficiente[1] + coeficiente[0];
    const PontosDaRetaU = [[retaU, 0], [retaU, yDoPontoB], [retaU, retaR]];
    console.log('reta U:', PontosDaRetaU);
    const coeficienteDeInchamento = (pontoMaximo[1] + yDoPontoB) / 2;
    console.log('coeficiente de inchamento: ', coeficienteDeInchamento);
    const graphLinesResult = {
        averageCoefficient: coeficienteDeInchamento,
        curve: PontosDaCurva,
        criticalHumidity: retaU,
        retaR: PontosDaRetaR,
        retaS: PontosDaRetaS,
        retaT: PontosDaRetaT,
        retaU: PontosDaRetaU,
    };
    return graphLinesResult;
}
//# sourceMappingURL=calc.sand-increase.service.js.map