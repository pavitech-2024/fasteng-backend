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
exports.GranulometryCompositionDataDTO = exports.TableDataDTO = exports.TableRowDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class TableRowDTO {
}
exports.TableRowDTO = TableRowDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Sieve 3/8"' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TableRowDTO.prototype, "sieve_label", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'row123' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TableRowDTO.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '95%' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TableRowDTO.prototype, "total_passant", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '5%' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TableRowDTO.prototype, "passant", void 0);
class TableDataDTO {
}
exports.TableDataDTO = TableDataDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [TableRowDTO] }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], TableDataDTO.prototype, "table_rows", void 0);
class GranulometryCompositionDataDTO {
}
exports.GranulometryCompositionDataDTO = GranulometryCompositionDataDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [TableDataDTO] }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], GranulometryCompositionDataDTO.prototype, "table_data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [Object] }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], GranulometryCompositionDataDTO.prototype, "percentageInputs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [Number] }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], GranulometryCompositionDataDTO.prototype, "sumOfPercents", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Object }),
    __metadata("design:type", Object)
], GranulometryCompositionDataDTO.prototype, "dnitBands", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [Object] }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], GranulometryCompositionDataDTO.prototype, "pointsOfCurve", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [Object] }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], GranulometryCompositionDataDTO.prototype, "percentsOfMaterials", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [Object] }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], GranulometryCompositionDataDTO.prototype, "graphData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Composição Granulométrica' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GranulometryCompositionDataDTO.prototype, "name", void 0);
//# sourceMappingURL=granulometry-composition-data-dto.js.map