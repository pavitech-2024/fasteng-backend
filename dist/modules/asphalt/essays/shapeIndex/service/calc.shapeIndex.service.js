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
var Calc_SHAPEINDEX_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calc_SHAPEINDEX_Service = void 0;
const common_1 = require("@nestjs/common");
const repository_1 = require("../repository");
const repository_2 = require("../../../../../modules/asphalt/materials/repository");
let Calc_SHAPEINDEX_Service = Calc_SHAPEINDEX_Service_1 = class Calc_SHAPEINDEX_Service {
    constructor(shapeIndexRepository, materialRepository) {
        this.shapeIndexRepository = shapeIndexRepository;
        this.materialRepository = materialRepository;
        this.logger = new common_1.Logger(Calc_SHAPEINDEX_Service_1.name);
    }
    calculateShapeIndex({ step2Data }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('calculate shapeIndex on calc.shapeIndex.service.ts > [body]');
                const { method, total_mass, graduation, circular_sieves_table_data, sieves_table_data, reads_table_data } = step2Data;
                const shape_index = method === 'pachymeter'
                    ? this.pachymeterShapeIndex(total_mass, sieves_table_data, reads_table_data)
                    : this.circularSieveShapeIndex(total_mass, graduation, circular_sieves_table_data);
                const alerts = [];
                if (shape_index < 0.5) {
                    alerts.push("shapeIndex.warning.minimum_value");
                }
                return {
                    success: true,
                    result: {
                        shape_index,
                        alerts,
                    },
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
    pachymeterShapeIndex(total_mass, sieves_table_data, reads_table_data) {
        let shape_index = 0;
        sieves_table_data.forEach((sieve, index) => {
            if (sieve.grains_count > 0) {
                const fi = (sieve.retained_mass * 100) / total_mass;
                const reads = reads_table_data.filter((read, index) => (read.sieve === sieve.label));
                const sumShapeIndex = this.pachymeterSumSieve(reads);
                const shapeIndexData = sumShapeIndex / sieve.grains_count;
                shape_index += fi * (shapeIndexData / 100);
            }
        });
        return shape_index;
    }
    pachymeterSumSieve(reads) {
        let sum = 0;
        reads.forEach((read) => {
            sum += read.length / read.thickness;
        });
        return sum;
    }
    circularSieveShapeIndex(total_mass, graduation, sieves_table_data) {
        let n;
        switch (graduation) {
            case 'A':
                n = 4;
                break;
            case 'B':
                n = 3;
                break;
            case 'C':
                n = 3;
                break;
            case 'D':
                n = 2;
                break;
            default:
                n = 0;
                break;
        }
        let sumSieve = this.circularSieveSumSieve(sieves_table_data);
        const shape_index = n > 0
            ? (sumSieve.sum1 + (0.5 * sumSieve.sum2)) / (100 * n)
            : 0;
        return shape_index;
    }
    circularSieveSumSieve(sieves_table_data) {
        let sum1 = 0;
        let sum2 = 0;
        sieves_table_data.forEach((sieve) => {
            sum1 += sieve.sieve1;
            sum2 += sieve.sieve2;
        });
        return { sum1, sum2 };
    }
};
Calc_SHAPEINDEX_Service = Calc_SHAPEINDEX_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.ShapeIndexRepository, repository_2.MaterialsRepository])
], Calc_SHAPEINDEX_Service);
exports.Calc_SHAPEINDEX_Service = Calc_SHAPEINDEX_Service;
//# sourceMappingURL=calc.shapeIndex.service.js.map