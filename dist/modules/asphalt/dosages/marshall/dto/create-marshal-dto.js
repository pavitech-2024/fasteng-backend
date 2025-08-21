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
exports.CreateMarshallDTO = void 0;
const marshal_general_data_dto_1 = require("./marshal-general-data.dto");
const swagger_1 = require("@nestjs/swagger");
const marshal_material_data_dto_1 = require("./marshal-material-data.dto");
const granulometry_composition_data_dto_1 = require("./granulometry-composition-data-dto");
const binder_trial_data_dto_1 = require("./binder-trial-data.dto");
const maximum_mixture_density_data_dto_1 = require("./maximum-mixture-density-data.dto");
const volumetric_params_data_dto_1 = require("./volumetric-params-data.dto");
const optinium_binder_content_data_dto_1 = require("./optinium-binder-content-data.dto");
const confirmation_compresion_data_dto_1 = require("./confirmation-compresion-data.dto");
class CreateMarshallDTO {
}
exports.CreateMarshallDTO = CreateMarshallDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ type: marshal_general_data_dto_1.MarshallGeneralDataDTO }),
    __metadata("design:type", marshal_general_data_dto_1.MarshallGeneralDataDTO)
], CreateMarshallDTO.prototype, "generalData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: marshal_material_data_dto_1.MarshallMaterialDataDTO }),
    __metadata("design:type", marshal_material_data_dto_1.MarshallMaterialDataDTO)
], CreateMarshallDTO.prototype, "materialSelectionData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: granulometry_composition_data_dto_1.GranulometryCompositionDataDTO }),
    __metadata("design:type", granulometry_composition_data_dto_1.GranulometryCompositionDataDTO)
], CreateMarshallDTO.prototype, "granulometryCompositionData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: binder_trial_data_dto_1.BinderTrialDataDTO }),
    __metadata("design:type", binder_trial_data_dto_1.BinderTrialDataDTO)
], CreateMarshallDTO.prototype, "binderTrialData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: maximum_mixture_density_data_dto_1.MaximumMixtureDensityDataDTO }),
    __metadata("design:type", maximum_mixture_density_data_dto_1.MaximumMixtureDensityDataDTO)
], CreateMarshallDTO.prototype, "maximumMixtureDensityData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: volumetric_params_data_dto_1.VolumetricParametersDataDTO }),
    __metadata("design:type", volumetric_params_data_dto_1.VolumetricParametersDataDTO)
], CreateMarshallDTO.prototype, "volumetricParametersData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: optinium_binder_content_data_dto_1.OptimumBinderContentDataDTO }),
    __metadata("design:type", optinium_binder_content_data_dto_1.OptimumBinderContentDataDTO)
], CreateMarshallDTO.prototype, "optimumBinderContentData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: confirmation_compresion_data_dto_1.ConfirmationCompressionDataDTO }),
    __metadata("design:type", confirmation_compresion_data_dto_1.ConfirmationCompressionDataDTO)
], CreateMarshallDTO.prototype, "confirmationCompressionData", void 0);
//# sourceMappingURL=create-marshal-dto.js.map