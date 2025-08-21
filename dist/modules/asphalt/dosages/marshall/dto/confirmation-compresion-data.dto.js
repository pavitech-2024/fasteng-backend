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
exports.ConfirmationCompressionDataDTO = exports.RiceTestDTO = exports.OptimumBinderConfirmationDTO = exports.ConfirmationVolumetricParametersDTO = exports.ConfirmationVolumetricParameterDTO = exports.ConfirmedSpecificGravityDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const volumetric_params_data_dto_1 = require("./volumetric-params-data.dto");
class ConfirmedSpecificGravityDTO {
}
exports.ConfirmedSpecificGravityDTO = ConfirmedSpecificGravityDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2.42 }),
    __metadata("design:type", Number)
], ConfirmedSpecificGravityDTO.prototype, "result", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'normal' }),
    __metadata("design:type", String)
], ConfirmedSpecificGravityDTO.prototype, "type", void 0);
class ConfirmationVolumetricParameterDTO extends volumetric_params_data_dto_1.VolumetricParameterDTO {
}
exports.ConfirmationVolumetricParameterDTO = ConfirmationVolumetricParameterDTO;
class ConfirmationVolumetricParametersDTO {
}
exports.ConfirmationVolumetricParametersDTO = ConfirmationVolumetricParametersDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [volumetric_params_data_dto_1.PointDTO] }),
    __metadata("design:type", Array)
], ConfirmationVolumetricParametersDTO.prototype, "pointsOfCurveDosageRBV", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [volumetric_params_data_dto_1.PointDTO] }),
    __metadata("design:type", Array)
], ConfirmationVolumetricParametersDTO.prototype, "pointsOfCurveDosageVv", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ConfirmationVolumetricParameterDTO] }),
    __metadata("design:type", Array)
], ConfirmationVolumetricParametersDTO.prototype, "volumetricParameters", void 0);
class OptimumBinderConfirmationDTO {
}
exports.OptimumBinderConfirmationDTO = OptimumBinderConfirmationDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], OptimumBinderConfirmationDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100 }),
    __metadata("design:type", Number)
], OptimumBinderConfirmationDTO.prototype, "diammeter", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50 }),
    __metadata("design:type", Number)
], OptimumBinderConfirmationDTO.prototype, "height", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 200 }),
    __metadata("design:type", Number)
], OptimumBinderConfirmationDTO.prototype, "dryMass", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 180 }),
    __metadata("design:type", Number)
], OptimumBinderConfirmationDTO.prototype, "submergedMass", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 205 }),
    __metadata("design:type", Number)
], OptimumBinderConfirmationDTO.prototype, "drySurfaceSaturatedMass", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 60 }),
    __metadata("design:type", Number)
], OptimumBinderConfirmationDTO.prototype, "stability", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 30 }),
    __metadata("design:type", Number)
], OptimumBinderConfirmationDTO.prototype, "fluency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 350 }),
    __metadata("design:type", Number)
], OptimumBinderConfirmationDTO.prototype, "diametricalCompressionStrength", void 0);
class RiceTestDTO {
}
exports.RiceTestDTO = RiceTestDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '5.5%' }),
    __metadata("design:type", String)
], RiceTestDTO.prototype, "teor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100 }),
    __metadata("design:type", Number)
], RiceTestDTO.prototype, "massOfDrySample", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 120 }),
    __metadata("design:type", Number)
], RiceTestDTO.prototype, "massOfContainerWaterSample", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50 }),
    __metadata("design:type", Number)
], RiceTestDTO.prototype, "massOfContainerWater", void 0);
class ConfirmationCompressionDataDTO {
}
exports.ConfirmationCompressionDataDTO = ConfirmationCompressionDataDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2.4 }),
    __metadata("design:type", Number)
], ConfirmationCompressionDataDTO.prototype, "dmt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'normal' }),
    __metadata("design:type", String)
], ConfirmationCompressionDataDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2.45 }),
    __metadata("design:type", Number)
], ConfirmationCompressionDataDTO.prototype, "gmm", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: ConfirmedSpecificGravityDTO }),
    __metadata("design:type", ConfirmedSpecificGravityDTO)
], ConfirmationCompressionDataDTO.prototype, "confirmedSpecificGravity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: ConfirmationVolumetricParametersDTO }),
    __metadata("design:type", ConfirmationVolumetricParametersDTO)
], ConfirmationCompressionDataDTO.prototype, "confirmedVolumetricParameters", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [OptimumBinderConfirmationDTO] }),
    __metadata("design:type", Array)
], ConfirmationCompressionDataDTO.prototype, "optimumBinder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: RiceTestDTO }),
    __metadata("design:type", RiceTestDTO)
], ConfirmationCompressionDataDTO.prototype, "riceTest", void 0);
//# sourceMappingURL=confirmation-compresion-data.dto.js.map