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
exports.SaveAbcpDto = exports.Calc_ABCP_Dto = void 0;
const class_validator_1 = require("class-validator");
class Calc_ABCP_Dto {
}
exports.Calc_ABCP_Dto = Calc_ABCP_Dto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], Calc_ABCP_Dto.prototype, "generalData", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], Calc_ABCP_Dto.prototype, "materialSelectionData", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], Calc_ABCP_Dto.prototype, "essaySelectionData", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], Calc_ABCP_Dto.prototype, "insertParamsData", void 0);
class SaveAbcpDto {
}
exports.SaveAbcpDto = SaveAbcpDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], SaveAbcpDto.prototype, "generalData", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], SaveAbcpDto.prototype, "materialSelectionData", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], SaveAbcpDto.prototype, "essaySelectionData", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], SaveAbcpDto.prototype, "insertParamsData", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], SaveAbcpDto.prototype, "results", void 0);
//# sourceMappingURL=abcp-calculate-results.dto.js.map