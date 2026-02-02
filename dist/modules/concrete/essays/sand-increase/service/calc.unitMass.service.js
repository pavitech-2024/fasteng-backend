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
var Calc_UnitMass_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calc_UnitMass_Service = void 0;
const common_1 = require("@nestjs/common");
let Calc_UnitMass_Service = Calc_UnitMass_Service_1 = class Calc_UnitMass_Service {
    constructor() {
        this.logger = new common_1.Logger(Calc_UnitMass_Service_1.name);
    }
    calculateUnitMass(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('calculate sabd-increase unit mass on calc.unit-mass.service.ts > [body]');
                const { containerVolume, containerWeight, tableData } = body;
                const result = calculateUnitMasses(tableData, containerVolume, containerWeight);
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
exports.Calc_UnitMass_Service = Calc_UnitMass_Service;
exports.Calc_UnitMass_Service = Calc_UnitMass_Service = Calc_UnitMass_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], Calc_UnitMass_Service);
function calculateUnitMasses(tableData, containerVolume, containerWeight) {
    const unitMasses = [];
    tableData.forEach(item => {
        if (item.containerWeightSample !== null) {
            const unitMass = (item.containerWeightSample - Number(containerWeight)) / Number(containerVolume);
            unitMasses.push(unitMass);
        }
    });
    return unitMasses;
}
//# sourceMappingURL=calc.unitMass.service.js.map