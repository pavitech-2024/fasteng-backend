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
exports.Calc_AsphaltGranulometry_Out = exports.Calc_AsphaltGranulometry_Dto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class Calc_AsphaltGranulometry_Dto {
}
exports.Calc_AsphaltGranulometry_Dto = Calc_AsphaltGranulometry_Dto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Dados gerais da granulometria",
        example: {
            material: "Asfalto A",
            density: 2.65,
            temperature: 150
        }
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], Calc_AsphaltGranulometry_Dto.prototype, "generalData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Dados da segunda etapa",
        example: {
            sieve_1: 10.5,
            sieve_2: 25.3,
            sieve_3: 40.1
        }
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], Calc_AsphaltGranulometry_Dto.prototype, "step2Data", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Indica se é método Superpave",
        example: true
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], Calc_AsphaltGranulometry_Dto.prototype, "isSuperpave", void 0);
class Calc_AsphaltGranulometry_Out {
}
exports.Calc_AsphaltGranulometry_Out = Calc_AsphaltGranulometry_Out;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Acumulado retido em cada peneira",
        example: [["Sieve 3/8", 25], ["Sieve No.4", 40]]
    }),
    __metadata("design:type", Array)
], Calc_AsphaltGranulometry_Out.prototype, "accumulated_retained", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Dados para o gráfico",
        example: [[4.75, 60], [2.36, 45]]
    }),
    __metadata("design:type", Array)
], Calc_AsphaltGranulometry_Out.prototype, "graph_data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Passante em cada peneira",
        example: [["Sieve 3/8", 75], ["Sieve No.4", 60]]
    }),
    __metadata("design:type", Array)
], Calc_AsphaltGranulometry_Out.prototype, "passant", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Porcentagem retida",
        example: [["Sieve 3/8", 25], ["Sieve No.4", 40]]
    }),
    __metadata("design:type", Array)
], Calc_AsphaltGranulometry_Out.prototype, "retained_porcentage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Porcentagem passante",
        example: [["Sieve 3/8", 75], ["Sieve No.4", 60]]
    }),
    __metadata("design:type", Array)
], Calc_AsphaltGranulometry_Out.prototype, "passant_porcentage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100 }),
    __metadata("design:type", Number)
], Calc_AsphaltGranulometry_Out.prototype, "total_retained", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 19 }),
    __metadata("design:type", Number)
], Calc_AsphaltGranulometry_Out.prototype, "nominal_diameter", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 12.5 }),
    __metadata("design:type", Number)
], Calc_AsphaltGranulometry_Out.prototype, "nominal_size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5.8 }),
    __metadata("design:type", Number)
], Calc_AsphaltGranulometry_Out.prototype, "fineness_module", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1.2 }),
    __metadata("design:type", Number)
], Calc_AsphaltGranulometry_Out.prototype, "cc", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3.4 }),
    __metadata("design:type", Number)
], Calc_AsphaltGranulometry_Out.prototype, "cnu", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0.02 }),
    __metadata("design:type", Number)
], Calc_AsphaltGranulometry_Out.prototype, "error", void 0);
//# sourceMappingURL=asphalt.calc.granulometry.dto.js.map