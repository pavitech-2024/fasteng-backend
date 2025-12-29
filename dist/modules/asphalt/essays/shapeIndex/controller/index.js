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
var ShapeIndexController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShapeIndexController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const service_1 = require("../service");
const calc_shapeIndex_dto_1 = require("../dto/calc.shapeIndex.dto");
const shapeIndex_init_dto_1 = require("../dto/shapeIndex-init.dto");
let ShapeIndexController = ShapeIndexController_1 = class ShapeIndexController {
    constructor(shapeIndexService) {
        this.shapeIndexService = shapeIndexService;
        this.logger = new common_1.Logger(ShapeIndexController_1.name);
    }
    verifyInitShapeIndex(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('verify init shapeIndex > [body]');
            const status = yield this.shapeIndexService.verifyInitShapeIndex(body);
            return response.status(200).json(status);
        });
    }
    calculateShapeIndex(body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('calculate shapeIndex > [body]');
            const shapeIndex = yield this.shapeIndexService.calculateShapeIndex(body);
            if (shapeIndex.success)
                this.logger.log('calculate shapeIndex > [success]');
            else
                this.logger.error('calculate shapeIndex > [error]');
            return shapeIndex;
        });
    }
    saveEssay(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('save essay > [body]');
            const shapeIndex = yield this.shapeIndexService.saveEssay(body);
            if (shapeIndex.success)
                this.logger.log('save shapeIndex essay > [success]');
            else
                this.logger.error('save shapeIndex essay > [error]');
            return response.status(200).json(shapeIndex);
        });
    }
};
__decorate([
    (0, common_1.Post)('verify-init'),
    (0, swagger_1.ApiOperation)({ summary: 'Verifica se é possível criar uma SHAPEINDEX com os dados enviados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'É possível criar uma SHAPEINDEX com os dados enviados.',
        content: { 'application/json': { schema: { example: { success: true } } } },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Não é possível criar uma SHAPEINDEX com os dados enviados.',
        content: {
            'application/json': {
                schema: { example: { success: false, error: { message: 'Sample Not Found.', status: 400, name: 'NotFound' } } },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao verificar se é possível criar uma SHAPEINDEX com os dados enviados.' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, shapeIndex_init_dto_1.ShapeIndexInitDto]),
    __metadata("design:returntype", Promise)
], ShapeIndexController.prototype, "verifyInitShapeIndex", null);
__decorate([
    (0, common_1.Post)('calculate-results'),
    (0, swagger_1.ApiOperation)({ summary: 'Calcula os resultados da SHAPEINDEX com os dados enviados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Resultados da SHAPEINDEX calculados com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao calcular os resultados da SHAPEINDEX com os dados enviados.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [calc_shapeIndex_dto_1.Calc_SHAPEINDEX_Dto]),
    __metadata("design:returntype", Promise)
], ShapeIndexController.prototype, "calculateShapeIndex", null);
__decorate([
    (0, common_1.Post)('save-essay'),
    (0, swagger_1.ApiOperation)({ summary: 'Se possível, salva os dados da SHAPEINDEX no banco de dados.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Dados da SHAPEINDEX salvos com sucesso.',
        content: { 'application/json': { schema: { example: { success: true, data: 'essay data' } } } },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Não foi possível salvar os dados da SHAPEINDEX no banco de dados.',
        content: {
            'application/json': {
                schema: {
                    example: {
                        success: false,
                        error: { message: 'SHAPEINDEX with name "SHAPEINDEX 1" from user "user 1"', status: 400, name: 'AlreadyExists' },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao salvar os dados da SHAPEINDEX no banco de dados.' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ShapeIndexController.prototype, "saveEssay", null);
ShapeIndexController = ShapeIndexController_1 = __decorate([
    (0, swagger_1.ApiTags)('shapeIndex'),
    (0, common_1.Controller)('asphalt/essays/shapeIndex'),
    __metadata("design:paramtypes", [service_1.ShapeIndexService])
], ShapeIndexController);
exports.ShapeIndexController = ShapeIndexController;
//# sourceMappingURL=index.js.map