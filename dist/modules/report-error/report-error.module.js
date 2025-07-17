"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportErrorModule = void 0;
const common_1 = require("@nestjs/common");
const report_error_controller_1 = require("./report-error.controller");
const report_error_service_1 = require("./report-error.service");
let ReportErrorModule = class ReportErrorModule {
};
exports.ReportErrorModule = ReportErrorModule;
exports.ReportErrorModule = ReportErrorModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [report_error_controller_1.ReportErrorController],
        providers: [report_error_service_1.ReportErrorService],
        exports: [report_error_service_1.ReportErrorService],
    })
], ReportErrorModule);
//# sourceMappingURL=report-error.module.js.map