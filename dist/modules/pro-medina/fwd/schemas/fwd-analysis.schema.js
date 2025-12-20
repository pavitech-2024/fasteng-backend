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
exports.FwdAnalysisSchema = exports.FwdAnalysis = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let FwdAnalysis = class FwdAnalysis {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], FwdAnalysis.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], FwdAnalysis.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)([{
            type: {
                stationNumber: { type: Number, required: true },
                d0: { type: Number, required: true },
                d20: { type: Number, required: true },
                d30: { type: Number, required: true },
                d45: { type: Number, required: true },
                d60: { type: Number, required: true },
                d90: { type: Number, required: true },
                d120: { type: Number, required: true },
                d150: { type: Number, required: true },
                d180: { type: Number, required: true },
                date: { type: Date, required: false },
                airTemperature: { type: Number, required: false },
                pavementTemperature: { type: Number, required: false },
                appliedLoad: { type: Number, required: false }
            }
        }]),
    __metadata("design:type", Array)
], FwdAnalysis.prototype, "samples", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'active', enum: ['active', 'completed'] }),
    __metadata("design:type", String)
], FwdAnalysis.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], FwdAnalysis.prototype, "userId", void 0);
FwdAnalysis = __decorate([
    (0, mongoose_1.Schema)({ collection: 'fwdAnalyses', timestamps: true })
], FwdAnalysis);
exports.FwdAnalysis = FwdAnalysis;
exports.FwdAnalysisSchema = mongoose_1.SchemaFactory.createForClass(FwdAnalysis);
exports.FwdAnalysisSchema.index({ name: 1 });
exports.FwdAnalysisSchema.index({ userId: 1 });
exports.FwdAnalysisSchema.index({ status: 1 });
exports.FwdAnalysisSchema.index({ createdAt: -1 });
//# sourceMappingURL=fwd-analysis.schema.js.map