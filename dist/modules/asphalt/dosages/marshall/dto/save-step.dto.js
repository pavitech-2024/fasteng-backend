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
exports.SaveStep8DTO = exports.SaveStep7DTO = exports.SaveStep6DTO = exports.SaveStep5DTO = exports.SaveStep4DTO = exports.SaveStep3DTO = exports.SaveStepDTO = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class SaveStepDTO {
}
exports.SaveStepDTO = SaveStepDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID da dosagem' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SaveStepDTO.prototype, "dosageId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome do step',
        enum: ['generalData', 'materialSelection', 'granulometryComposition', 'binderTrial', 'maximumMixtureDensity', 'volumetricParameters', 'optimumBinderContent', 'confirmationCompression']
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['generalData', 'materialSelection', 'granulometryComposition', 'binderTrial', 'maximumMixtureDensity', 'volumetricParameters', 'optimumBinderContent', 'confirmationCompression']),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SaveStepDTO.prototype, "step", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Dados do step' }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], SaveStepDTO.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID do usuário' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SaveStepDTO.prototype, "userId", void 0);
class SaveStep3DTO {
}
exports.SaveStep3DTO = SaveStep3DTO;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID da dosagem' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SaveStep3DTO.prototype, "dosageId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Dados de composição granulométrica' }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], SaveStep3DTO.prototype, "data", void 0);
class SaveStep4DTO {
}
exports.SaveStep4DTO = SaveStep4DTO;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID da dosagem' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SaveStep4DTO.prototype, "dosageId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Dados do trial do binder' }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], SaveStep4DTO.prototype, "data", void 0);
class SaveStep5DTO {
}
exports.SaveStep5DTO = SaveStep5DTO;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID da dosagem' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SaveStep5DTO.prototype, "dosageId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Dados de densidade máxima da mistura' }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], SaveStep5DTO.prototype, "data", void 0);
class SaveStep6DTO {
}
exports.SaveStep6DTO = SaveStep6DTO;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID da dosagem' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SaveStep6DTO.prototype, "dosageId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Dados de parâmetros volumétricos' }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], SaveStep6DTO.prototype, "data", void 0);
class SaveStep7DTO {
}
exports.SaveStep7DTO = SaveStep7DTO;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID da dosagem' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SaveStep7DTO.prototype, "dosageId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Dados de conteúdo ótimo de binder' }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], SaveStep7DTO.prototype, "data", void 0);
class SaveStep8DTO {
}
exports.SaveStep8DTO = SaveStep8DTO;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID da dosagem' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SaveStep8DTO.prototype, "dosageId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Dados de confirmação da compressão' }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], SaveStep8DTO.prototype, "data", void 0);
//# sourceMappingURL=save-step.dto.js.map