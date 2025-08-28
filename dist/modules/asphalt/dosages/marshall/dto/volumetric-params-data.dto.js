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
exports.SaveVolumetricParametersRequestDTO = exports.SaveVolumetricParametersResponseDTO = exports.VolumetricParametersDataDTO = exports.VolumetricParameterDTO = exports.VolumetricValuesDTO = exports.PointDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class PointDTO {
}
exports.PointDTO = PointDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0.5 }),
    __metadata("design:type", Number)
], PointDTO.prototype, "x", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0.65 }),
    __metadata("design:type", Number)
], PointDTO.prototype, "y", void 0);
class VolumetricValuesDTO {
}
exports.VolumetricValuesDTO = VolumetricValuesDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 12.5 }),
    __metadata("design:type", Number)
], VolumetricValuesDTO.prototype, "aggregateVolumeVoids", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2.45 }),
    __metadata("design:type", Number)
], VolumetricValuesDTO.prototype, "apparentBulkSpecificGravity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 350 }),
    __metadata("design:type", Number)
], VolumetricValuesDTO.prototype, "diametricalCompressionStrength", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 30 }),
    __metadata("design:type", Number)
], VolumetricValuesDTO.prototype, "fluency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2.42 }),
    __metadata("design:type", Number)
], VolumetricValuesDTO.prototype, "maxSpecificGravity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0.04 }),
    __metadata("design:type", Number)
], VolumetricValuesDTO.prototype, "ratioBitumenVoid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 55 }),
    __metadata("design:type", Number)
], VolumetricValuesDTO.prototype, "stability", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 60 }),
    __metadata("design:type", Number)
], VolumetricValuesDTO.prototype, "voidsFilledAsphalt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 8 }),
    __metadata("design:type", Number)
], VolumetricValuesDTO.prototype, "volumeVoids", void 0);
class VolumetricParameterDTO {
}
exports.VolumetricParameterDTO = VolumetricParameterDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5.5 }),
    __metadata("design:type", Number)
], VolumetricParameterDTO.prototype, "asphaltContent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: VolumetricValuesDTO }),
    __metadata("design:type", VolumetricValuesDTO)
], VolumetricParameterDTO.prototype, "values", void 0);
class VolumetricParametersDataDTO {
}
exports.VolumetricParametersDataDTO = VolumetricParametersDataDTO;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Mixture Name' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VolumetricParametersDataDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [PointDTO] }),
    __metadata("design:type", Array)
], VolumetricParametersDataDTO.prototype, "pointsOfCurveDosageRBV", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [PointDTO] }),
    __metadata("design:type", Array)
], VolumetricParametersDataDTO.prototype, "pointsOfCurveDosageVv", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [VolumetricParameterDTO] }),
    __metadata("design:type", Array)
], VolumetricParametersDataDTO.prototype, "volumetricParameters", void 0);
class SaveVolumetricParametersResponseDTO {
}
exports.SaveVolumetricParametersResponseDTO = SaveVolumetricParametersResponseDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], SaveVolumetricParametersResponseDTO.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Volumetric parameters saved successfully' }),
    __metadata("design:type", String)
], SaveVolumetricParametersResponseDTO.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 6 }),
    __metadata("design:type", Number)
], SaveVolumetricParametersResponseDTO.prototype, "step", void 0);
class SaveVolumetricParametersRequestDTO {
}
exports.SaveVolumetricParametersRequestDTO = SaveVolumetricParametersRequestDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: VolumetricParametersDataDTO }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", VolumetricParametersDataDTO)
], SaveVolumetricParametersRequestDTO.prototype, "volumetricParametersData", void 0);
//# sourceMappingURL=volumetric-params-data.dto.js.map