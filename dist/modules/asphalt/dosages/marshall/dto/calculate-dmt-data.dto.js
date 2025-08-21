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
exports.CalculateDmtDataDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const index_of_misses_specific_gravity_dto_1 = require("./index-of-misses-specific-gravity.dto");
const aggregate_item_dto_1 = require("./aggregate-item.dto");
class CalculateDmtDataDTO {
}
exports.CalculateDmtDataDTO = CalculateDmtDataDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Índices de massas específicas faltantes',
        type: [index_of_misses_specific_gravity_dto_1.IndexOfMissesSpecificGravityDTO],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => index_of_misses_specific_gravity_dto_1.IndexOfMissesSpecificGravityDTO),
    __metadata("design:type", Array)
], CalculateDmtDataDTO.prototype, "indexesOfMissesSpecificGravity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Massas específicas faltantes por material',
        example: { material_1: 2.65, material_2: 2.70 },
    }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CalculateDmtDataDTO.prototype, "missingSpecificGravity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Percentuais de dosagem por material',
        example: [[25, 26, 27, 28, 29], [75, 74, 73, 72, 71]],
    }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CalculateDmtDataDTO.prototype, "percentsOfDosage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Lista de agregados',
        type: [aggregate_item_dto_1.AggregateItemDTO],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => aggregate_item_dto_1.AggregateItemDTO),
    __metadata("design:type", Array)
], CalculateDmtDataDTO.prototype, "aggregates", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Teor de ligante do ensaio',
        example: 5.0,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CalculateDmtDataDTO.prototype, "trial", void 0);
//# sourceMappingURL=calculate-dmt-data.dto.js.map