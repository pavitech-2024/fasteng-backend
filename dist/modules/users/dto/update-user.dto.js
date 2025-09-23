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
exports.UpdateUserDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class PreferencesDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: 'Idioma preferido do usuário', example: 'pt-BR' }),
    __metadata("design:type", String)
], PreferencesDto.prototype, "language", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ description: 'Número de casas decimais preferido', example: 2 }),
    __metadata("design:type", Number)
], PreferencesDto.prototype, "decimal", void 0);
class UpdateUserDto {
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)({ description: 'ID do usuário', example: '123e4567-e89b-12d3-a456-426614174000' }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)({ each: true }),
    (0, class_transformer_1.Type)(() => Date),
    (0, swagger_1.ApiPropertyOptional)({ description: 'Lista de datas de último login', type: [Date], example: ['2025-08-17T00:00:00Z'] }),
    __metadata("design:type", Array)
], UpdateUserDto.prototype, "lastLoginList", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({ description: 'URL da foto do usuário', example: 'https://example.com/photo.jpg', nullable: true }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "photo", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(3),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, swagger_1.ApiPropertyOptional)({ description: 'Número de conexões do usuário', minimum: 1, maximum: 3, example: 2 }),
    __metadata("design:type", Number)
], UpdateUserDto.prototype, "connections", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => PreferencesDto),
    (0, swagger_1.ApiPropertyOptional)({ description: 'Preferências do usuário', type: PreferencesDto }),
    __metadata("design:type", PreferencesDto)
], UpdateUserDto.prototype, "preferences", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)({ description: 'Nome do usuário', example: 'Maria Clara' }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)({ description: 'Email do usuário', example: 'maria@example.com' }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)({ description: 'Telefone do usuário', example: '+55 81 99999-9999' }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)((obj) => obj.dob !== null && obj.dob !== ''),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === '' || value === null) {
            return null;
        }
        const date = new Date(value);
        return isNaN(date.getTime()) ? null : date;
    }),
    (0, swagger_1.ApiPropertyOptional)({ description: 'Data de nascimento do usuário', type: Date, example: '1990-01-01T00:00:00Z', nullable: true }),
    __metadata("design:type", Date)
], UpdateUserDto.prototype, "dob", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)({ description: 'Versão do documento', example: 0 }),
    __metadata("design:type", Number)
], UpdateUserDto.prototype, "__v", void 0);
//# sourceMappingURL=update-user.dto.js.map