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
exports.MarshallStep3Dto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class AggregateDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: '507f1f77bcf86cd799439012' }),
    __metadata("design:type", String)
], AggregateDto.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Agregado Miúdo' }),
    __metadata("design:type", String)
], AggregateDto.prototype, "name", void 0);
class MarshallStep3Dto {
}
exports.MarshallStep3Dto = MarshallStep3Dto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Banda DNIT',
        example: 'Banda A'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], MarshallStep3Dto.prototype, "dnitBand", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Lista de agregados',
        type: [AggregateDto],
        example: [
            { _id: '507f1f77bcf86cd799439012', name: 'Agregado Miúdo' },
            { _id: '507f1f77bcf86cd799439013', name: 'Agregado Graúdo' }
        ]
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], MarshallStep3Dto.prototype, "aggregates", void 0);
//# sourceMappingURL=step-3-marshall.dto.js.map