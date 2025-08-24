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
exports.CalculateStep3DTO = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CalculateStep3DTO {
}
exports.CalculateStep3DTO = CalculateStep3DTO;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Banda DNIT', enum: ['A', 'B', 'C'] }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CalculateStep3DTO.prototype, "dnitBands", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Lista de agregados',
        type: [Object]
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], CalculateStep3DTO.prototype, "aggregates", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Porcentagens de entrada para cada agregado',
        type: [Object]
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], CalculateStep3DTO.prototype, "percentageInputs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Linhas da tabela com os passantes',
        type: [Object]
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], CalculateStep3DTO.prototype, "tableRows", void 0);
//# sourceMappingURL=calculate-step-5.dto.js.map