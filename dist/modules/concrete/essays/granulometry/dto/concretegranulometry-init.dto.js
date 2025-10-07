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
exports.ConcreteGranulometryInitDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const schemas_1 = require("../../../../../modules/concrete/materials/schemas");
class ConcreteGranulometryInitDto {
}
exports.ConcreteGranulometryInitDto = ConcreteGranulometryInitDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Nome da granulometria de concreto",
        example: "Concrete Granulometry Test 1"
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ConcreteGranulometryInitDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Material usado na granulometria de concreto",
        example: {
            id: "material-123",
            type: "Brita 1",
            origin: "Pedreira XYZ",
            weight: 1200
        }
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", schemas_1.Material)
], ConcreteGranulometryInitDto.prototype, "material", void 0);
//# sourceMappingURL=concretegranulometry-init.dto.js.map