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
exports.CalculateDmtDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CalculateDmtDTO {
}
exports.CalculateDmtDTO = CalculateDmtDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Porcentagens de dosagem por material', type: [[Number]] }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CalculateDmtDTO.prototype, "percentsOfDosage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Agregados utilizados na mistura', type: [String] }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CalculateDmtDTO.prototype, "aggregates", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Índices de gravidade específica que faltam', type: [String] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CalculateDmtDTO.prototype, "indexesOfMissesSpecificGravity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Gravidade específica faltante para materiais', type: Object }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CalculateDmtDTO.prototype, "missingSpecificGravity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Trial number' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CalculateDmtDTO.prototype, "trial", void 0);
//# sourceMappingURL=calculate-step-5-dmt-data.dto.js.map