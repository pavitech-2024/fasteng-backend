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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FwdAnalysisController = void 0;
const common_1 = require("@nestjs/common");
const fwd_service_1 = require("../services/fwd.service");
const create_fwd_dto_1 = require("../dto/create.fwd.dto");
let FwdAnalysisController = class FwdAnalysisController {
    constructor(FwdService) {
        this.FwdService = FwdService;
    }
    create(createFwdAnalysisDto) {
        return this.FwdService.create(createFwdAnalysisDto);
    }
    findAll() {
        console.log('teste');
        return this.FwdService.findAll();
    }
    findOne(id) {
        return this.FwdService.findOne(id);
    }
    update(id, updateFwdAnalysisDto) {
        return this.FwdService.update(id, updateFwdAnalysisDto);
    }
    remove(id) {
        return this.FwdService.remove(id);
    }
    processAnalysis(id) {
        return this.FwdService.processAnalysis(id);
    }
};
exports.FwdAnalysisController = FwdAnalysisController;
__decorate([
    (0, common_1.Post)('save'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_fwd_dto_1.CreateFwdAnalysisDto]),
    __metadata("design:returntype", void 0)
], FwdAnalysisController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FwdAnalysisController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FwdAnalysisController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], FwdAnalysisController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FwdAnalysisController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/process'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FwdAnalysisController.prototype, "processAnalysis", null);
exports.FwdAnalysisController = FwdAnalysisController = __decorate([
    (0, common_1.Controller)('fwd-analysis'),
    __metadata("design:paramtypes", [fwd_service_1.FwdService])
], FwdAnalysisController);
//# sourceMappingURL=fwd.controller.js.map