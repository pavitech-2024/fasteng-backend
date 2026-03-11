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
exports.Save_SandIncreaseDto = exports.Calc_MoistureContentDto = exports.Calc_UnitMassDto = exports.Calc_SandIncrease_Dto = void 0;
const class_validator_1 = require("class-validator");
class Calc_SandIncrease_Dto {
}
exports.Calc_SandIncrease_Dto = Calc_SandIncrease_Dto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], Calc_SandIncrease_Dto.prototype, "sandIncreaseGeneralData", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(obj => obj.step === 1),
    __metadata("design:type", Object)
], Calc_SandIncrease_Dto.prototype, "unitMassDeterminationData", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(obj => obj.step === 2),
    __metadata("design:type", Object)
], Calc_SandIncrease_Dto.prototype, "humidityFoundData", void 0);
class Calc_UnitMassDto {
}
exports.Calc_UnitMassDto = Calc_UnitMassDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Calc_UnitMassDto.prototype, "containerVolume", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Calc_UnitMassDto.prototype, "containerWeight", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], Calc_UnitMassDto.prototype, "tableData", void 0);
class Calc_MoistureContentDto {
}
exports.Calc_MoistureContentDto = Calc_MoistureContentDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], Calc_MoistureContentDto.prototype, "tableData", void 0);
class Save_SandIncreaseDto {
}
exports.Save_SandIncreaseDto = Save_SandIncreaseDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], Save_SandIncreaseDto.prototype, "generalData", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], Save_SandIncreaseDto.prototype, "unitMassDeterminationData", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], Save_SandIncreaseDto.prototype, "humidityFoundData", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], Save_SandIncreaseDto.prototype, "results", void 0);
//# sourceMappingURL=calc.sand-increase.dto.js.map