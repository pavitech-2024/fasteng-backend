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
var Calc_ElasticRecovery_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calc_ElasticRecovery_Service = void 0;
const common_1 = require("@nestjs/common");
const repository_1 = require("../../../materials/repository");
const repository_2 = require("../repository");
let Calc_ElasticRecovery_Service = Calc_ElasticRecovery_Service_1 = class Calc_ElasticRecovery_Service {
    constructor(elasticRecoveryRepository, materialRepository) {
        this.elasticRecoveryRepository = elasticRecoveryRepository;
        this.materialRepository = materialRepository;
        this.logger = new common_1.Logger(Calc_ElasticRecovery_Service_1.name);
    }
    calculateElasticRecovery(calcElasticRecoveryDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('calculate elasticRecovery on calc.elasticRecovery.service.ts > [body]');
                const { lengths } = calcElasticRecoveryDto.elasticRecoveryCalc;
                const elasticRecovery = this.calculate(lengths);
                return {
                    success: true,
                    result: {
                        elasticRecovery
                    },
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    calculate(lengths) {
        let sum = 0;
        for (let index = 0; index < lengths.length; index++) {
            let length = lengths[index];
            sum += (((length.stretching_lenght - length.juxtaposition_length) * 100) /
                length.stretching_lenght);
        }
        return Math.round(100 * (sum / lengths.length)) / 100;
    }
};
Calc_ElasticRecovery_Service = Calc_ElasticRecovery_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_2.ElasticRecoveryRepository, repository_1.MaterialsRepository])
], Calc_ElasticRecovery_Service);
exports.Calc_ElasticRecovery_Service = Calc_ElasticRecovery_Service;
//# sourceMappingURL=calc.elasticRecovery.service.js.map