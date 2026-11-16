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
exports.IggAnalysisSchema = exports.IggAnalysis = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let DefectCount = class DefectCount {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], DefectCount.prototype, "code", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], DefectCount.prototype, "count", void 0);
DefectCount = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], DefectCount);
const DefectCountSchema = mongoose_1.SchemaFactory.createForClass(DefectCount);
let PavementStation = class PavementStation {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], PavementStation.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PavementStation.prototype, "stationNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PavementStation.prototype, "section", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], PavementStation.prototype, "tri", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], PavementStation.prototype, "tre", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [DefectCountSchema], default: [] }),
    __metadata("design:type", Array)
], PavementStation.prototype, "defects", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], PavementStation.prototype, "date", void 0);
PavementStation = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], PavementStation);
const PavementStationSchema = mongoose_1.SchemaFactory.createForClass(PavementStation);
let IggAnalysis = class IggAnalysis {
};
exports.IggAnalysis = IggAnalysis;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], IggAnalysis.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], IggAnalysis.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], IggAnalysis.prototype, "road", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], IggAnalysis.prototype, "section", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], IggAnalysis.prototype, "subtrack", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], IggAnalysis.prototype, "pavementType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], IggAnalysis.prototype, "evaluationDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [PavementStationSchema], default: [] }),
    __metadata("design:type", Array)
], IggAnalysis.prototype, "stations", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], IggAnalysis.prototype, "results", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'draft', enum: ['draft', 'completed'] }),
    __metadata("design:type", String)
], IggAnalysis.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], IggAnalysis.prototype, "userId", void 0);
exports.IggAnalysis = IggAnalysis = __decorate([
    (0, mongoose_1.Schema)({ collection: 'iggAnalyses', timestamps: true })
], IggAnalysis);
exports.IggAnalysisSchema = mongoose_1.SchemaFactory.createForClass(IggAnalysis);
exports.IggAnalysisSchema.index({ name: 1 });
exports.IggAnalysisSchema.index({ userId: 1 });
exports.IggAnalysisSchema.index({ status: 1 });
exports.IggAnalysisSchema.index({ createdAt: -1 });
//# sourceMappingURL=igg-analysis.schema.js.map