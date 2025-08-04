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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Calc_MoistureContent_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calc_MoistureContent_Service = void 0;
const common_1 = require("@nestjs/common");
let Calc_MoistureContent_Service = Calc_MoistureContent_Service_1 = class Calc_MoistureContent_Service {
    constructor() {
        this.logger = new common_1.Logger(Calc_MoistureContent_Service_1.name);
    }
    calculateMoistureContent(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('calculate sand-increase moisture content on calc.moisture-content.service.ts > [body]');
                const { tableData } = body;
                const result = calculateMoistureContents(tableData);
                return {
                    success: true,
                    result,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
};
Calc_MoistureContent_Service = Calc_MoistureContent_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], Calc_MoistureContent_Service);
exports.Calc_MoistureContent_Service = Calc_MoistureContent_Service;
function calculateMoistureContents(tableData) {
    const moistureContents = [];
    tableData.forEach(data => {
        if (data.dryGrossWeight !== data.capsuleWeight) {
            moistureContents.push(((data.wetGrossWeight - data.dryGrossWeight) / (data.dryGrossWeight - data.capsuleWeight)) * 100);
        }
        else {
            moistureContents.push(0);
        }
    });
    return moistureContents;
}
//# sourceMappingURL=calc.moistureContents.service.js.map