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
exports.UpdateAsphaltMaterialDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_asphalt_material_dto_1 = require("./create-asphalt-material.dto");
const swagger_1 = require("@nestjs/swagger");
class UpdateAsphaltMaterialDto extends (0, mapped_types_1.PartialType)(create_asphalt_material_dto_1.CreateAsphaltMaterialDto) {
}
exports.UpdateAsphaltMaterialDto = UpdateAsphaltMaterialDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Nome do material', example: 'Brita 1 Atualizada' }),
    __metadata("design:type", String)
], UpdateAsphaltMaterialDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: ['coarseAggregate', 'fineAggregate', 'filler', 'asphaltBinder', 'CAP', 'other'],
        description: 'Tipo do material',
        example: 'coarseAggregate'
    }),
    __metadata("design:type", String)
], UpdateAsphaltMaterialDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => create_asphalt_material_dto_1.DescriptionDto, description: 'Informações adicionais do material' }),
    __metadata("design:type", create_asphalt_material_dto_1.DescriptionDto)
], UpdateAsphaltMaterialDto.prototype, "description", void 0);
//# sourceMappingURL=update-asphalt-materialDto.js.map