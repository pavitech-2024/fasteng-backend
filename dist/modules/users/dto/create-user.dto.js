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
exports.InputCreateUserDto = exports.CreateUserDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Identificador único do usuário', example: '123e4567-e89b-12d3-a456-426614174000' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "uuid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lista de datas de último login', type: [Date], example: ['2025-08-17T00:00:00Z'] }),
    __metadata("design:type", Array)
], CreateUserDto.prototype, "lastLoginList", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Número de conexões', example: 2 }),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "connections", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'URL da foto do usuário', example: 'https://example.com/photo.jpg' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "photo", void 0);
class InputCreateUserDto {
}
exports.InputCreateUserDto = InputCreateUserDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: 'Identificador único do usuário', example: '123e4567-e89b-12d3-a456-426614174000' }),
    __metadata("design:type", String)
], InputCreateUserDto.prototype, "uuid", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(3),
    (0, class_transformer_1.Type)(() => Number),
    (0, swagger_1.ApiProperty)({ description: 'Número de conexões do usuário', minimum: 1, maximum: 3, example: 2 }),
    __metadata("design:type", Number)
], InputCreateUserDto.prototype, "connections", void 0);
//# sourceMappingURL=create-user.dto.js.map