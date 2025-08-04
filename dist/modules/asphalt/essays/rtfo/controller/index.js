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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
var RtfoController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RtfoController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const calc_rtfo_dto_1 = require("../dto/calc-rtfo.dto");
const rtfo_init_dto_1 = require("../dto/rtfo-init.dto");
const service_1 = require("../service");
let RtfoController = RtfoController_1 = class RtfoController {
    constructor(rtfoService) {
        this.rtfoService = rtfoService;
        this.logger = new common_1.Logger(RtfoController_1.name);
    }
    verifyInitRtfo(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('verify init rtfo > [body]');
            const status = yield this.rtfoService.verifyInitRtfo(body);
            return response.status(200).json(status);
        });
    }
    calculateRtfo(body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('calculate rtfo > [body]');
            const rtfo = yield this.rtfoService.calculateRtfo(body);
            if (rtfo.success)
                this.logger.log('calculate rtfo > [success]');
            else
                this.logger.error('calculate rtfo > [error]');
            return rtfo;
        });
    }
    saveEssay(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('save rtfo > [body]');
            const rtfo = yield this.rtfoService.saveEssay(body);
            if (rtfo.success)
                this.logger.log('save rtfo > [success]');
            else
                this.logger.error('save rtfo > [error]');
            return response.status(200).json(rtfo);
        });
    }
};
__decorate([
    (0, common_1.Post)('verify-init'),
    (0, swagger_1.ApiOperation)({ summary: 'Verifica se é possível criar um ensaio de rtfo com os dados enviados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'É possível criar um ensaio de rtfo com os dados enviados.',
        content: { 'application/json': { schema: { example: { success: true } } } },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Não é possível criar um ensaio de rtfo com os dados enviados.',
        content: {
            'application/json': {
                schema: { example: { success: false, error: { message: 'Material Not Found.', status: 400, name: 'NotFound' } } },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao verificar se é possível criar um ensaio de rtfo com os dados enviados.' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, rtfo_init_dto_1.RtfoInitDto]),
    __metadata("design:returntype", Promise)
], RtfoController.prototype, "verifyInitRtfo", null);
__decorate([
    (0, common_1.Post)('calculate-results'),
    (0, swagger_1.ApiOperation)({ summary: 'Calcula os resultados d ensaio de rtfo com os dados enviados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Resultados d ensaio de rtfo calculados com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao calcular os resultados d ensaio de rtfo com os dados enviados.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [calc_rtfo_dto_1.Calc_Rtfo_Dto]),
    __metadata("design:returntype", Promise)
], RtfoController.prototype, "calculateRtfo", null);
__decorate([
    (0, common_1.Post)('save-essay'),
    (0, swagger_1.ApiOperation)({ summary: 'Se possível, salva os dados d ensaio de rtfo no banco de dados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Dados d ensaio de rtfo salvos com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao salvar os dados d ensaio de rtfo no banco de dados.' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RtfoController.prototype, "saveEssay", null);
RtfoController = RtfoController_1 = __decorate([
    (0, swagger_1.ApiTags)('rtfo'),
    (0, common_1.Controller)('asphalt/essays/rtfo'),
    __metadata("design:paramtypes", [service_1.RtfoService])
], RtfoController);
exports.RtfoController = RtfoController;
//# sourceMappingURL=index.js.map