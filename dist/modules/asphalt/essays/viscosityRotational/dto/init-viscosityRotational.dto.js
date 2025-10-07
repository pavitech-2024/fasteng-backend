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
exports.ViscosityRotationalInitDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class ViscosityRotationalInitDto {
}
exports.ViscosityRotationalInitDto = ViscosityRotationalInitDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nome do ensaio de viscosidade rotacional',
        example: 'Viscosity Rotational Test 1',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ViscosityRotationalInitDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Material utilizado no ensaio de viscosidade rotacional',
        example: {
            id: 'material-123',
            type: 'CAP 50/70',
            origin: 'Refinaria XYZ',
            viscosity: 85,
            density: 1.03,
        },
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], ViscosityRotationalInitDto.prototype, "material", void 0);
//# sourceMappingURL=init-viscosityRotational.dto.js.map