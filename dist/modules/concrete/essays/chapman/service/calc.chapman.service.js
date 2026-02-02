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
var Calc_CHAPMAN_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calc_CHAPMAN_Service = void 0;
const common_1 = require("@nestjs/common");
let Calc_CHAPMAN_Service = Calc_CHAPMAN_Service_1 = class Calc_CHAPMAN_Service {
    constructor() {
        this.logger = new common_1.Logger(Calc_CHAPMAN_Service_1.name);
    }
    calculateChapman(_a) {
        return __awaiter(this, arguments, void 0, function* ({ step2Data }) {
            try {
                this.logger.log('calculate chapman on calc.chapman.service.ts > [body]');
                const result = 500 / (step2Data.displaced_volume - 200);
                return {
                    success: true,
                    result: {
                        m_e: result,
                    },
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
};
exports.Calc_CHAPMAN_Service = Calc_CHAPMAN_Service;
exports.Calc_CHAPMAN_Service = Calc_CHAPMAN_Service = Calc_CHAPMAN_Service_1 = __decorate([
    (0, common_1.Injectable)()
], Calc_CHAPMAN_Service);
//# sourceMappingURL=calc.chapman.service.js.map