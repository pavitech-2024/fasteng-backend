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
exports.DescriptionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const sieveDto_1 = require("./sieveDto");
class DescriptionDto {
}
exports.DescriptionDto = DescriptionDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Pedreira XYZ' }),
    __metadata("design:type", String)
], DescriptionDto.prototype, "source", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Maria Clara' }),
    __metadata("design:type", String)
], DescriptionDto.prototype, "responsible", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => sieveDto_1.sieveDto }),
    __metadata("design:type", sieveDto_1.sieveDto)
], DescriptionDto.prototype, "maxDiammeter", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Granito' }),
    __metadata("design:type", String)
], DescriptionDto.prototype, "aggregateNature", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2025-08-20' }),
    __metadata("design:type", String)
], DescriptionDto.prototype, "boughtDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2025-08-21' }),
    __metadata("design:type", String)
], DescriptionDto.prototype, "recieveDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2025-08-18' }),
    __metadata("design:type", String)
], DescriptionDto.prototype, "extractionDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2025-08-19' }),
    __metadata("design:type", String)
], DescriptionDto.prototype, "collectionDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['CAP 30/45', 'CAP 50/70', 'CAP 85/100', 'CAP 150/200'] }),
    __metadata("design:type", String)
], DescriptionDto.prototype, "classification_CAP", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: ['AMP 50/65', 'AMP 55/75', 'AMP 60/85', 'AMP 65/90'] }),
    __metadata("design:type", String)
], DescriptionDto.prototype, "classification_AMP", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Material em boas condições' }),
    __metadata("design:type", String)
], DescriptionDto.prototype, "observation", void 0);
//# sourceMappingURL=descriptionDto.js.map