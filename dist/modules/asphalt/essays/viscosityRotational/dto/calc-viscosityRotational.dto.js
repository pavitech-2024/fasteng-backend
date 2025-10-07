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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calc_ViscosityRotational_Out = exports.Calc_ViscosityRotational_Dto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class Calc_ViscosityRotational_Dto {
}
exports.Calc_ViscosityRotational_Dto = Calc_ViscosityRotational_Dto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Dados gerais do ensaio de viscosidade rotacional',
        example: {
            operator: 'Maria Clara',
            date: '2025-10-07',
            equipment: 'Brookfield DV-II+ Pro',
            sampleMass: 500,
        },
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], Calc_ViscosityRotational_Dto.prototype, "generalData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Dados específicos de viscosidade rotacional',
        example: {
            temperatures: [135, 145, 155, 165, 175],
            viscosities: [450, 380, 310, 260, 220],
            spindleSpeed: 20,
        },
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], Calc_ViscosityRotational_Dto.prototype, "viscosityRotational", void 0);
class Calc_ViscosityRotational_Out {
}
exports.Calc_ViscosityRotational_Out = Calc_ViscosityRotational_Out;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Gráfico gerado (base64 ou URL)',
        example: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
    }),
    __metadata("design:type", String)
], Calc_ViscosityRotational_Out.prototype, "graph", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Faixa de temperatura de usinagem',
        example: { higher: 170, lower: 150, average: 160 },
    }),
    __metadata("design:type", Object)
], Calc_ViscosityRotational_Out.prototype, "machiningTemperatureRange", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Faixa de temperatura de compactação',
        example: { higher: 160, lower: 140, average: 150 },
    }),
    __metadata("design:type", Object)
], Calc_ViscosityRotational_Out.prototype, "compressionTemperatureRange", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Faixa de temperatura do agregado',
        example: { higher: 180, lower: 160, average: 170 },
    }),
    __metadata("design:type", Object)
], Calc_ViscosityRotational_Out.prototype, "aggregateTemperatureRange", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Pontos da curva de viscosidade',
        example: [
            [135, 450],
            [145, 380],
            [155, 310],
            [165, 260],
            [175, 220],
        ],
    }),
    __metadata("design:type", Array)
], Calc_ViscosityRotational_Out.prototype, "curvePoints", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Equação da curva de viscosidade',
        example: { aIndex: 12000, bIndex: -3.2 },
    }),
    __metadata("design:type", Object)
], Calc_ViscosityRotational_Out.prototype, "equation", void 0);
//# sourceMappingURL=calc-viscosityRotational.dto.js.map