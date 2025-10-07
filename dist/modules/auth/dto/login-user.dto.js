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
exports.OutputLoginUserDto = exports.InputLoginUserDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const schemas_1 = require("../../users/schemas");
class InputLoginUserDto {
}
exports.InputLoginUserDto = InputLoginUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'E-mail do usuário',
        example: 'user@email.com',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], InputLoginUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Senha do usuário',
        example: '123456',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], InputLoginUserDto.prototype, "password", void 0);
class OutputLoginUserDto {
}
exports.OutputLoginUserDto = OutputLoginUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 200 }),
    __metadata("design:type", Number)
], OutputLoginUserDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI...' }),
    __metadata("design:type", String)
], OutputLoginUserDto.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Objeto de usuário retornado',
        type: () => schemas_1.User,
    }),
    __metadata("design:type", schemas_1.User)
], OutputLoginUserDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user@email.com' }),
    __metadata("design:type", String)
], OutputLoginUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'João da Silva' }),
    __metadata("design:type", String)
], OutputLoginUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Plano Premium' }),
    __metadata("design:type", String)
], OutputLoginUserDto.prototype, "planName", void 0);
//# sourceMappingURL=login-user.dto.js.map