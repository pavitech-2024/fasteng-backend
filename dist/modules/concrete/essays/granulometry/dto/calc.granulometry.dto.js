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
exports.Calc_CONCRETEGRANULOMETRY_Dto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class Calc_CONCRETEGRANULOMETRY_Dto {
}
exports.Calc_CONCRETEGRANULOMETRY_Dto = Calc_CONCRETEGRANULOMETRY_Dto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Dados gerais da granulometria (ex: tipo de material, data, massa total etc.)',
        example: {
            material: 'Brita 1',
            date: '2025-10-07',
            total_weight: 1200,
            operator: 'Maria Clara',
        },
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], Calc_CONCRETEGRANULOMETRY_Dto.prototype, "generalData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Dados da segunda etapa do ensaio (ex: peneiras e massas retidas)',
        example: {
            sieves: [9.5, 4.8, 2.4, 1.2, 0.6],
            retained_weights: [150, 320, 400, 250, 80],
        },
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], Calc_CONCRETEGRANULOMETRY_Dto.prototype, "step2Data", void 0);
//# sourceMappingURL=calc.granulometry.dto.js.map