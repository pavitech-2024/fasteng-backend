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
var Calc_DUCTILITY_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calc_DUCTILITY_Service = void 0;
const common_1 = require("@nestjs/common");
const repository_1 = require("../repository");
const repository_2 = require("../../../../../modules/asphalt/materials/repository");
let Calc_DUCTILITY_Service = Calc_DUCTILITY_Service_1 = class Calc_DUCTILITY_Service {
    constructor(ductilityRepository, materialRepository) {
        this.ductilityRepository = ductilityRepository;
        this.materialRepository = materialRepository;
        this.logger = new common_1.Logger(Calc_DUCTILITY_Service_1.name);
    }
    calculateDuctility({ step2Data }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('calculate ductility on calc.ductility.service.ts > [body]');
                const { first_rupture_length, second_rupture_length, third_rupture_length } = step2Data;
                const ruptures = [];
                if (first_rupture_length) {
                    ruptures.push(first_rupture_length);
                }
                if (second_rupture_length) {
                    ruptures.push(second_rupture_length);
                }
                if (third_rupture_length) {
                    ruptures.push(third_rupture_length);
                }
                this.logger.debug(ruptures);
                let sum = ruptures.reduce((sum, length) => (sum += length));
                this.logger.debug(sum);
                const result_rupture_length = sum / ruptures.length;
                if (Number.isNaN(result_rupture_length)) {
                    return {
                        success: false,
                        result: null
                    };
                }
                return {
                    success: true,
                    result: {
                        ductility: result_rupture_length,
                    }
                };
            }
            catch (error) {
                return {
                    success: false,
                    result: null
                };
            }
        });
    }
};
Calc_DUCTILITY_Service = Calc_DUCTILITY_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.DuctilityRepository, repository_2.MaterialsRepository])
], Calc_DUCTILITY_Service);
exports.Calc_DUCTILITY_Service = Calc_DUCTILITY_Service;
//# sourceMappingURL=calc.ductility.service.js.map