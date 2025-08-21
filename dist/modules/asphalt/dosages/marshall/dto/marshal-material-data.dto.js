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
exports.MarshallMaterialDataDTO = exports.AggregateDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class AggregateDTO {
}
exports.AggregateDTO = AggregateDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Brita 1' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AggregateDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'agg123' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AggregateDTO.prototype, "_id", void 0);
class MarshallMaterialDataDTO {
}
exports.MarshallMaterialDataDTO = MarshallMaterialDataDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [AggregateDTO] }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], MarshallMaterialDataDTO.prototype, "aggregates", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Asfalto CA-50' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MarshallMaterialDataDTO.prototype, "binder", void 0);
//# sourceMappingURL=marshal-material-data.dto.js.map