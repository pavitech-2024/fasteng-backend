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
exports.MaximumMixtureDensityDataDTO = exports.MaxSpecificGravityDTO = exports.MaxSpecificGravityResultDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class MaxSpecificGravityResultDTO {
}
exports.MaxSpecificGravityResultDTO = MaxSpecificGravityResultDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2.3 }),
    __metadata("design:type", Number)
], MaxSpecificGravityResultDTO.prototype, "lessOne", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2.35 }),
    __metadata("design:type", Number)
], MaxSpecificGravityResultDTO.prototype, "lessHalf", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2.4 }),
    __metadata("design:type", Number)
], MaxSpecificGravityResultDTO.prototype, "normal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2.45 }),
    __metadata("design:type", Number)
], MaxSpecificGravityResultDTO.prototype, "plusHalf", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2.5 }),
    __metadata("design:type", Number)
], MaxSpecificGravityResultDTO.prototype, "plusOne", void 0);
class MaxSpecificGravityDTO {
}
exports.MaxSpecificGravityDTO = MaxSpecificGravityDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: MaxSpecificGravityResultDTO }),
    __metadata("design:type", MaxSpecificGravityResultDTO)
], MaxSpecificGravityDTO.prototype, "result", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ASTM D2041' }),
    __metadata("design:type", String)
], MaxSpecificGravityDTO.prototype, "method", void 0);
class MaximumMixtureDensityDataDTO {
}
exports.MaximumMixtureDensityDataDTO = MaximumMixtureDensityDataDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: MaxSpecificGravityDTO }),
    __metadata("design:type", MaxSpecificGravityDTO)
], MaximumMixtureDensityDataDTO.prototype, "maxSpecificGravity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [Number] }),
    __metadata("design:type", Array)
], MaximumMixtureDensityDataDTO.prototype, "listOfSpecificGravities", void 0);
//# sourceMappingURL=maximum-mixture-density-data.dto.js.map