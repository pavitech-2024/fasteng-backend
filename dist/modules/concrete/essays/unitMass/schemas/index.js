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
exports.UnitMassSchema = exports.UnitMass = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_validator_1 = require("class-validator");
let UnitMass = class UnitMass {
};
exports.UnitMass = UnitMass;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], UnitMass.prototype, "generalData", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], UnitMass.prototype, "step2Data", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], UnitMass.prototype, "result", void 0);
exports.UnitMass = UnitMass = __decorate([
    (0, mongoose_1.Schema)({ collection: 'unitMass' })
], UnitMass);
exports.UnitMassSchema = mongoose_1.SchemaFactory.createForClass(UnitMass);
//# sourceMappingURL=index.js.map