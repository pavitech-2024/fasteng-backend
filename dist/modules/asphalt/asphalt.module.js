"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsphaltModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const database_config_1 = require("../../infra/mongoose/database.config");
const materials_module_1 = require("./materials/materials.module");
const schemas_1 = require("./materials/schemas");
const schemas_2 = require("./essays/rtcd/schemas");
const rtcd_module_1 = require("./essays/rtcd/rtcd.module");
const sandEquivalent_module_1 = require("./essays/sandEquivalent/sandEquivalent.module");
const schemas_3 = require("./essays/sandEquivalent/schemas");
const schemas_4 = require("./essays/specifyMass/schemas");
const specifyMass_module_1 = require("./essays/specifyMass/specifyMass.module");
const schemas_5 = require("./essays/flashPoint/schemas");
const flashPoint_module_1 = require("./essays/flashPoint/flashPoint.module");
const schemas_6 = require("./essays/ductility/schemas");
const ductility_module_1 = require("./essays/ductility/ductility.module");
const schemas_7 = require("./essays/angularity/schemas");
const angularity_module_1 = require("./essays/angularity/angularity.module");
const schemas_8 = require("./essays/shapeIndex/schemas");
const shapeIndex_module_1 = require("./essays/shapeIndex/shapeIndex.module");
const schemas_9 = require("./essays/elongatedParticles/schemas");
const elongatedParticles_module_1 = require("./essays/elongatedParticles/elongatedParticles.module");
const schemas_10 = require("./essays/rtfo/schemas");
const rtfo_module_1 = require("./essays/rtfo/rtfo.module");
const schemas_11 = require("./essays/granulometry/schemas");
const granulometry_module_1 = require("./essays/granulometry/granulometry.module");
const schemas_12 = require("./essays/penetration/schemas");
const penetration_module_1 = require("./essays/penetration/penetration.module");
const schemas_13 = require("./essays/adhesiveness/schemas");
const adhesiveness_module_1 = require("./essays/adhesiveness/adhesiveness.module");
const abrasion_module_1 = require("./essays/abrasion/abrasion.module");
const schemas_14 = require("./essays/abrasion/schemas");
const sayboltFurol_module_1 = require("./essays/sayboltFurol/sayboltFurol.module");
const schemas_15 = require("./essays/sayboltFurol/schemas");
const schemas_16 = require("./essays/softeningPoint/schemas");
const softeningPoint_module_1 = require("./essays/softeningPoint/softeningPoint.module");
const schemas_17 = require("./essays/ddui/schemas");
const ddui_module_1 = require("./essays/ddui/ddui.module");
const schema_1 = require("./essays/elasticRecovery/schema");
const elasticRecovery_module_1 = require("./essays/elasticRecovery/elasticRecovery.module");
const viscosityRotational_module_1 = require("./essays/viscosityRotational/viscosityRotational.module");
const schemas_18 = require("./essays/viscosityRotational/schemas");
const schemas_19 = require("./dosages/marshall/schemas");
const marshall_module_1 = require("./dosages/marshall/marshall.module");
const superpave_module_1 = require("./dosages/superpave/superpave.module");
const igg_module_1 = require("./essays/igg/igg.module");
const schemas_20 = require("./essays/igg/schemas");
const schema_2 = require("./essays/fwd/schema");
const fwd_module_1 = require("./essays/fwd/fwd.module");
const schemas_21 = require("./dosages/superpave/schemas");
const Models = [
    { name: schemas_1.Material.name, schema: schemas_1.MaterialSchema },
    { name: schemas_10.Rtfo.name, schema: schemas_10.RtfoSchema },
    { name: schemas_2.Rtcd.name, schema: schemas_2.RtcdSchema },
    { name: schemas_11.AsphaltGranulometry.name, schema: schemas_11.AsphaltGranulometrySchema },
    { name: schemas_12.Penetration.name, schema: schemas_12.PenetrationSchema },
    { name: schemas_14.Abrasion.name, schema: schemas_14.AbrasionSchema },
    { name: schemas_4.SpecifyMass.name, schema: schemas_4.SpecifyMassSchema },
    { name: schemas_5.FlashPoint.name, schema: schemas_5.FlashPointSchema },
    { name: schemas_6.Ductility.name, schema: schemas_6.DuctilitySchema },
    { name: schemas_7.Angularity.name, schema: schemas_7.AngularitySchema },
    { name: schemas_13.Adhesiveness.name, schema: schemas_13.AdhesivenessSchema },
    { name: schemas_3.SandEquivalent.name, schema: schemas_3.SandEquivalentSchema },
    { name: schemas_15.SayboltFurol.name, schema: schemas_15.SayboltFurolSchema },
    { name: schemas_16.SofteningPoint.name, schema: schemas_16.SofteningPointSchema },
    { name: schemas_17.Ddui.name, schema: schemas_17.DduiSchema },
    { name: schemas_8.ShapeIndex.name, schema: schemas_8.ShapeIndexSchema },
    { name: schemas_9.ElongatedParticles.name, schema: schemas_9.ElongatedParticlesSchema },
    { name: schema_1.ElasticRecovery.name, schema: schema_1.ElasticRecoverySchema },
    { name: schemas_18.ViscosityRotational.name, schema: schemas_18.ViscosityRotationalSchema },
    { name: schemas_19.Marshall.name, schema: schemas_19.MarshallSchema },
    { name: schemas_21.Superpave.name, schema: schemas_21.SuperpaveSchema },
    { name: schemas_20.Igg.name, schema: schemas_20.IggSchema },
    { name: schema_2.Fwd.name, schema: schema_2.FwdSchema },
    { name: schemas_21.Superpave.name, schema: schemas_21.SuperpaveSchema },
];
const Modules = [
    materials_module_1.MaterialsModule,
    rtfo_module_1.RtfoModule,
    rtcd_module_1.RtcdModule,
    granulometry_module_1.AsphaltGranulometryModule,
    penetration_module_1.PenetrationModule,
    abrasion_module_1.AbrasionModule,
    specifyMass_module_1.SpecifyMassModule,
    flashPoint_module_1.FlashPointModule,
    ductility_module_1.DuctilityModule,
    adhesiveness_module_1.AdhesivenessModule,
    angularity_module_1.AngularityModule,
    sandEquivalent_module_1.SandEquivalentModule,
    sayboltFurol_module_1.SayboltFurolModule,
    softeningPoint_module_1.SofteningPointModule,
    ddui_module_1.DduiModule,
    shapeIndex_module_1.ShapeIndexModule,
    elongatedParticles_module_1.ElongatedParticlesModule,
    elasticRecovery_module_1.ElasticRecoveryModule,
    viscosityRotational_module_1.ViscosityRotationalModule,
    marshall_module_1.MarshallModule,
    superpave_module_1.SuperpaveModule,
    igg_module_1.IggModule,
    fwd_module_1.FwdModule,
    superpave_module_1.SuperpaveModule,
];
let AsphaltModule = class AsphaltModule {
};
exports.AsphaltModule = AsphaltModule;
exports.AsphaltModule = AsphaltModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature(Models, database_config_1.DATABASE_CONNECTION.ASPHALT), ...Modules],
        exports: [mongoose_1.MongooseModule, ...Modules],
    })
], AsphaltModule);
//# sourceMappingURL=asphalt.module.js.map