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
exports.Calc_GRANULOMETRY_Out = exports.Calc_GRANULOMETRY_Dto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class Calc_GRANULOMETRY_Dto {
}
exports.Calc_GRANULOMETRY_Dto = Calc_GRANULOMETRY_Dto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Dados gerais da granulometria",
        example: {
            material: "Areia Média",
            density: 2.65,
            temperature: 25
        }
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], Calc_GRANULOMETRY_Dto.prototype, "generalData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Dados da segunda etapa da granulometria",
        example: {
            sieve_4_75mm: 45.2,
            sieve_2_36mm: 30.8,
            sieve_1_18mm: 15.0,
            sieve_0_6mm: 5.5,
            pan: 3.5
        }
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], Calc_GRANULOMETRY_Dto.prototype, "step2Data", void 0);
class Calc_GRANULOMETRY_Out {
}
exports.Calc_GRANULOMETRY_Out = Calc_GRANULOMETRY_Out;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Valores acumulados retidos em cada peneira",
        example: [5, 15, 30, 45, 60, 100]
    }),
    __metadata("design:type", Array)
], Calc_GRANULOMETRY_Out.prototype, "accumulated_retained", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Pontos para plotar o gráfico granulométrico",
        example: [[4.75, 95], [2.36, 70], [1.18, 40], [0.6, 20]]
    }),
    __metadata("design:type", Array)
], Calc_GRANULOMETRY_Out.prototype, "graph_data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Percentuais passantes",
        example: [95, 70, 40, 20, 0]
    }),
    __metadata("design:type", Array)
], Calc_GRANULOMETRY_Out.prototype, "passant", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Percentuais retidos",
        example: [5, 25, 30, 20, 20]
    }),
    __metadata("design:type", Array)
], Calc_GRANULOMETRY_Out.prototype, "retained_porcentage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100 }),
    __metadata("design:type", Number)
], Calc_GRANULOMETRY_Out.prototype, "total_retained", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 19 }),
    __metadata("design:type", Number)
], Calc_GRANULOMETRY_Out.prototype, "nominal_diameter", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 12.5 }),
    __metadata("design:type", Number)
], Calc_GRANULOMETRY_Out.prototype, "nominal_size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5.8 }),
    __metadata("design:type", Number)
], Calc_GRANULOMETRY_Out.prototype, "fineness_module", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1.2 }),
    __metadata("design:type", Number)
], Calc_GRANULOMETRY_Out.prototype, "cc", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3.4 }),
    __metadata("design:type", Number)
], Calc_GRANULOMETRY_Out.prototype, "cnu", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0.02 }),
    __metadata("design:type", Number)
], Calc_GRANULOMETRY_Out.prototype, "error", void 0);
//# sourceMappingURL=calc.granulometry.dto.js.map