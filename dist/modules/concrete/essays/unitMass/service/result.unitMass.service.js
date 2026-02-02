"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result_UnitMass_Service = void 0;
const common_1 = require("@nestjs/common");
let Result_UnitMass_Service = class Result_UnitMass_Service {
    calculateUnitMass(_a) {
        return __awaiter(this, arguments, void 0, function* ({ step2Data }) {
            try {
                const result = (step2Data.containerWeight + step2Data.sampleContainerWeight) / step2Data.containerVolume;
                return {
                    success: true,
                    result: {
                        result: result,
                    },
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
};
exports.Result_UnitMass_Service = Result_UnitMass_Service;
exports.Result_UnitMass_Service = Result_UnitMass_Service = __decorate([
    (0, common_1.Injectable)()
], Result_UnitMass_Service);
//# sourceMappingURL=result.unitMass.service.js.map