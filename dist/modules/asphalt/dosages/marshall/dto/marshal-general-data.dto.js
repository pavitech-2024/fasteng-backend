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
exports.MarshallGeneralDataDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class MarshallGeneralDataDTO {
}
exports.MarshallGeneralDataDTO = MarshallGeneralDataDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user123', description: 'ID do usuário' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MarshallGeneralDataDTO.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ensaios Superpave', description: 'Nome do ensaio' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MarshallGeneralDataDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Lab X', description: 'Laboratório responsável' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MarshallGeneralDataDTO.prototype, "laboratory", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'João', description: 'Operador responsável' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MarshallGeneralDataDTO.prototype, "operator", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Carlos', description: 'Calculista' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MarshallGeneralDataDTO.prototype, "calculist", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'bearing', enum: ['bearing', 'bonding'] }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(['bearing', 'bonding']),
    __metadata("design:type", String)
], MarshallGeneralDataDTO.prototype, "objective", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'A', enum: ['A', 'B', 'C'] }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(['A', 'B', 'C']),
    __metadata("design:type", String)
], MarshallGeneralDataDTO.prototype, "dnitBand", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Descrição do ensaio' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MarshallGeneralDataDTO.prototype, "description", void 0);
//# sourceMappingURL=marshal-general-data.dto.js.map