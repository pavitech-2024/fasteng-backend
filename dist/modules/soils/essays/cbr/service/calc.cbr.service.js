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
var Calc_CBR_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calc_CBR_Service = void 0;
const common_1 = require("@nestjs/common");
const repository_1 = require("../repository");
const repository_2 = require("../../../samples/repository");
let Calc_CBR_Service = Calc_CBR_Service_1 = class Calc_CBR_Service {
    constructor(cbrRepository, sampleRepository) {
        this.cbrRepository = cbrRepository;
        this.sampleRepository = sampleRepository;
        this.logger = new common_1.Logger(Calc_CBR_Service_1.name);
    }
    calculateCbr(_a) {
        return __awaiter(this, arguments, void 0, function* ({ step2Data, expansionData }) {
            try {
                this.logger.log('calculate cbr on calc.cbr.service.ts > [body]');
                const { ring_constant, cylinder_height, extended_reads } = step2Data;
                const deflectometer_reads = expansionData.map(({ deflectometer_read }) => deflectometer_read);
                const cbrs = {
                    2: null,
                    4: null,
                    6: null,
                    8: null,
                    10: null,
                };
                const measured_pressure = extended_reads.map(({ extended_read }) => extended_read * ring_constant);
                measured_pressure.map((pressure, index) => {
                    if (index === 3)
                        pressure !== 0 ? (cbrs[2] = (pressure / 70.31) * 100) : (cbrs[2] = null);
                    if (index === 5)
                        pressure !== 0 ? (cbrs[4] = (pressure / 105.46) * 100) : (cbrs[4] = null);
                    if (index === 6)
                        pressure !== 0 ? (cbrs[6] = (pressure / 131.58) * 100) : (cbrs[6] = null);
                    if (index === 7)
                        pressure !== 0 ? (cbrs[8] = (pressure / 161.71) * 100) : (cbrs[8] = null);
                    if (index === 8)
                        pressure !== 0 ? (cbrs[10] = (pressure / 182.8) * 100) : (cbrs[10] = null);
                });
                const cbr = cbrs[2] > cbrs[4] ? cbrs[2] : cbrs[4];
                const penetrations_pol = extended_reads.map(({ pol }) => pol);
                const cbr_graph = [];
                measured_pressure.forEach((pressure, index) => {
                    pressure !== 0 ? cbr_graph.push([Number(penetrations_pol[index]), pressure]) : null;
                });
                const free_expansion = ((deflectometer_reads[1] - deflectometer_reads[0]) / cylinder_height) * 100;
                return {
                    success: true,
                    result: {
                        measured_pressure,
                        cbr,
                        cbrs,
                        cbr_graph,
                        free_expansion,
                    },
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
};
exports.Calc_CBR_Service = Calc_CBR_Service;
exports.Calc_CBR_Service = Calc_CBR_Service = Calc_CBR_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.CbrRepository, repository_2.SamplesRepository])
], Calc_CBR_Service);
//# sourceMappingURL=calc.cbr.service.js.map