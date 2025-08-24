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
exports.SaveMarshallDosageDTO = exports.BinderTrialDataDTO = exports.BandsOfTemperaturesDTO = exports.TemperatureRangeDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const swagger_2 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class TemperatureRangeDTO {
}
exports.TemperatureRangeDTO = TemperatureRangeDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 150 }),
    __metadata("design:type", Number)
], TemperatureRangeDTO.prototype, "higher", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 140 }),
    __metadata("design:type", Number)
], TemperatureRangeDTO.prototype, "average", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 130 }),
    __metadata("design:type", Number)
], TemperatureRangeDTO.prototype, "lower", void 0);
class BandsOfTemperaturesDTO {
}
exports.BandsOfTemperaturesDTO = BandsOfTemperaturesDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: TemperatureRangeDTO }),
    __metadata("design:type", TemperatureRangeDTO)
], BandsOfTemperaturesDTO.prototype, "machiningTemperatureRange", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: TemperatureRangeDTO }),
    __metadata("design:type", TemperatureRangeDTO)
], BandsOfTemperaturesDTO.prototype, "compressionTemperatureRange", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: TemperatureRangeDTO }),
    __metadata("design:type", TemperatureRangeDTO)
], BandsOfTemperaturesDTO.prototype, "AggregateTemperatureRange", void 0);
class BinderTrialDataDTO {
}
exports.BinderTrialDataDTO = BinderTrialDataDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BinderTrialDataDTO.prototype, "trial", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [Object] }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], BinderTrialDataDTO.prototype, "percentsOfDosage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [Object] }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], BinderTrialDataDTO.prototype, "newPercentOfDosage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: BandsOfTemperaturesDTO }),
    __metadata("design:type", BandsOfTemperaturesDTO)
], BinderTrialDataDTO.prototype, "bandsOfTemperatures", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Binder usado' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], BinderTrialDataDTO.prototype, "binder", void 0);
class SaveMarshallDosageDTO {
}
exports.SaveMarshallDosageDTO = SaveMarshallDosageDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: BinderTrialDataDTO }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => BinderTrialDataDTO),
    __metadata("design:type", BinderTrialDataDTO)
], SaveMarshallDosageDTO.prototype, "data", void 0);
__decorate([
    (0, swagger_2.ApiPropertyOptional)({ description: 'Indica se é apenas uma consulta' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SaveMarshallDosageDTO.prototype, "isConsult", void 0);
//# sourceMappingURL=binder-trial-data.dto.js.map