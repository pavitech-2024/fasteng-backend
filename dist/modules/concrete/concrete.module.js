"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcreteModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const database_config_1 = require("../../infra/mongoose/database.config");
const materials_module_1 = require("./materials/materials.module");
const schemas_1 = require("./materials/schemas");
const sand_increase_module_1 = require("./essays/sand-increase/sand-increase.module");
const schema_1 = require("./essays/sand-increase/schema");
const champan_module_1 = require("./essays/chapman/champan.module");
const schemas_2 = require("./essays/chapman/schemas");
const schemas_3 = require("./essays/granulometry/schemas");
const granulometry_module_1 = require("./essays/granulometry/granulometry.module");
const unitMass_module_1 = require("./essays/unitMass/unitMass.module");
const schemas_4 = require("./essays/unitMass/schemas");
const schemas_5 = require("./dosages/abcp/schemas");
const abcp_module_1 = require("./dosages/abcp/abcp.module");
const schemas_6 = require("./essays/coarseAggregate/schemas");
const coarseAggregate_module_1 = require("./essays/coarseAggregate/coarseAggregate.module");
const rc_module_1 = require("./essays/rc/rc.module");
const schemas_7 = require("./essays/rc/schemas");
const schemas_8 = require("./essays/rt/schemas");
const rt_module_1 = require("./essays/rt/rt.module");
const Models = [
    { name: schemas_1.Material.name, schema: schemas_1.MaterialSchema },
    { name: schema_1.SandIncrease.name, schema: schema_1.SandIncreaseSchema },
    { name: schemas_1.Material.name, schema: schemas_1.MaterialSchema },
    { name: schemas_2.Chapman.name, schema: schemas_2.ChapmanSchema },
    { name: schemas_3.Granulometry.name, schema: schemas_3.GranulometrySchema },
    { name: schemas_4.UnitMass.name, schema: schemas_4.UnitMassSchema },
    { name: schemas_6.CoarseAggregateSpecificMass.name, schema: schemas_6.CoarseAggregateSpecificMassSchema },
    { name: schemas_5.ABCP.name, schema: schemas_5.ABCPSchema },
    { name: schemas_7.RC.name, schema: schemas_7.RCSchema },
    { name: schemas_8.RT.name, schema: schemas_8.RTSchema },
];
const Modules = [
    materials_module_1.MaterialsModule,
    sand_increase_module_1.SandIncreaseModule,
    champan_module_1.ChapmanModule,
    granulometry_module_1.ConcreteGranulometryModule,
    unitMass_module_1.UnitMassModule,
    coarseAggregate_module_1.CoarseAggregateModule,
    abcp_module_1.ABCPModule,
    rc_module_1.ConcreteRcModule,
    rt_module_1.ConcreteRtModule,
];
let ConcreteModule = class ConcreteModule {
};
ConcreteModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature(Models, database_config_1.DATABASE_CONNECTION.CONCRETE), ...Modules],
        exports: [mongoose_1.MongooseModule, ...Modules],
    })
], ConcreteModule);
exports.ConcreteModule = ConcreteModule;
//# sourceMappingURL=concrete.module.js.map