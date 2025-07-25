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
exports.step2Data_Service = void 0;
const common_1 = require("@nestjs/common");
let step2Data_Service = class step2Data_Service {
    verifyStep2DataUnitMass(_a) {
        return __awaiter(this, arguments, void 0, function* ({ containerVolume, containerWeight, sampleContainerWeight }) {
            try {
                if (containerVolume && containerWeight && containerVolume + containerWeight >= sampleContainerWeight) {
                    return true;
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
};
exports.step2Data_Service = step2Data_Service;
exports.step2Data_Service = step2Data_Service = __decorate([
    (0, common_1.Injectable)()
], step2Data_Service);
//# sourceMappingURL=step2Data.unitMass.service.js.map