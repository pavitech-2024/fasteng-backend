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
exports.OptimumBinderContentDataDTO = exports.ExpectedParametersDTO = exports.OptimumBinderDTO = exports.CurveDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class CurveDTO {
}
exports.CurveDTO = CurveDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0.5 }),
    __metadata("design:type", Number)
], CurveDTO.prototype, "a", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0.2 }),
    __metadata("design:type", Number)
], CurveDTO.prototype, "b", void 0);
class OptimumBinderDTO {
}
exports.OptimumBinderDTO = OptimumBinderDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [Number] }),
    __metadata("design:type", Array)
], OptimumBinderDTO.prototype, "confirmedPercentsOfDosage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: CurveDTO }),
    __metadata("design:type", CurveDTO)
], OptimumBinderDTO.prototype, "curveRBV", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: CurveDTO }),
    __metadata("design:type", CurveDTO)
], OptimumBinderDTO.prototype, "curveVv", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5.3 }),
    __metadata("design:type", Number)
], OptimumBinderDTO.prototype, "optimumContent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [Object] }),
    __metadata("design:type", Array)
], OptimumBinderDTO.prototype, "pointsOfCurveDosage", void 0);
class ExpectedParametersDTO {
}
exports.ExpectedParametersDTO = ExpectedParametersDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2.4 }),
    __metadata("design:type", Number)
], ExpectedParametersDTO.prototype, "Gmb", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 65 }),
    __metadata("design:type", Number)
], ExpectedParametersDTO.prototype, "RBV", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 7 }),
    __metadata("design:type", Number)
], ExpectedParametersDTO.prototype, "Vam", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 12 }),
    __metadata("design:type", Number)
], ExpectedParametersDTO.prototype, "Vv", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2.45 }),
    __metadata("design:type", Number)
], ExpectedParametersDTO.prototype, "newMaxSpecificGravity", void 0);
class OptimumBinderContentDataDTO {
}
exports.OptimumBinderContentDataDTO = OptimumBinderContentDataDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: OptimumBinderDTO }),
    __metadata("design:type", OptimumBinderDTO)
], OptimumBinderContentDataDTO.prototype, "optimumBinder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Object }),
    __metadata("design:type", Object)
], OptimumBinderContentDataDTO.prototype, "expectedParameters", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Object }),
    __metadata("design:type", Object)
], OptimumBinderContentDataDTO.prototype, "graphics", void 0);
//# sourceMappingURL=optinium-binder-content-data.dto.js.map