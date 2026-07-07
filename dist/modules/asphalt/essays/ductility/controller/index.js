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
var DuctilityController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuctilityController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const service_1 = require("../service");
const calc_ductility_dto_1 = require("../dto/calc.ductility.dto");
const ductility_init_dto_1 = require("../dto/ductility-init.dto");
let DuctilityController = DuctilityController_1 = class DuctilityController {
    constructor(ductilityService) {
        this.ductilityService = ductilityService;
        this.logger = new common_1.Logger(DuctilityController_1.name);
    }
    verifyInitDuctility(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = yield this.ductilityService.verifyInitDuctility(body);
            return response.status(200).json(status);
        });
    }
    calculateDuctility(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const ductility = yield this.ductilityService.calculateDuctility(body);
            return ductility;
        });
    }
    saveEssay(response, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const ductility = yield this.ductilityService.saveEssay(body);
            return response.status(200).json(ductility);
        });
    }
    getEssaysByUser(userId, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const essays = yield this.ductilityService.getAllEssaysByUser(userId);
            return response.status(200).json({
                success: true,
                data: essays,
                count: essays.length
            });
        });
    }
    getEssaysByMaterial(materialId, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const essays = yield this.ductilityService.getAllEssaysByMaterial(materialId);
            return response.status(200).json({
                success: true,
                data: essays,
                count: essays.length
            });
        });
    }
    debugGetAllEssays(response) {
        return __awaiter(this, void 0, void 0, function* () {
            const essays = yield this.ductilityService.getAllEssays();
            const formattedEssays = essays.map(essay => {
                var _a, _b, _c, _d, _e, _f;
                return ({
                    id: essay._id,
                    name: (_a = essay.generalData) === null || _a === void 0 ? void 0 : _a.name,
                    userId: (_b = essay.generalData) === null || _b === void 0 ? void 0 : _b.userId,
                    materialId: (_d = (_c = essay.generalData) === null || _c === void 0 ? void 0 : _c.material) === null || _d === void 0 ? void 0 : _d._id,
                    materialName: (_f = (_e = essay.generalData) === null || _e === void 0 ? void 0 : _e.material) === null || _f === void 0 ? void 0 : _f.name,
                    results: essay.results
                });
            });
            return response.status(200).json({
                total: essays.length,
                essays: formattedEssays
            });
        });
    }
    getEssayById(id, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const essay = yield this.ductilityService.getEssayById(id);
            if (!essay) {
                return response.status(404).json({
                    success: false,
                    error: `Essay with ID ${id} not found`
                });
            }
            return response.status(200).json({
                success: true,
                data: essay
            });
        });
    }
};
exports.DuctilityController = DuctilityController;
__decorate([
    (0, common_1.Post)('verify-init'),
    (0, swagger_1.ApiOperation)({ summary: 'Verifica se é possível criar uma DUCTILITY com os dados enviados.' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ductility_init_dto_1.DuctilityInitDto]),
    __metadata("design:returntype", Promise)
], DuctilityController.prototype, "verifyInitDuctility", null);
__decorate([
    (0, common_1.Post)('calculate-results'),
    (0, swagger_1.ApiOperation)({ summary: 'Calcula os resultados da DUCTILITY com os dados enviados.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [calc_ductility_dto_1.Calc_DUCTILITY_Dto]),
    __metadata("design:returntype", Promise)
], DuctilityController.prototype, "calculateDuctility", null);
__decorate([
    (0, common_1.Post)('save-essay'),
    (0, swagger_1.ApiOperation)({ summary: 'Se possível, salva os dados da DUCTILITY no banco de dados.' }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DuctilityController.prototype, "saveEssay", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Busca todos os ensaios de ductilidade do usuário' }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DuctilityController.prototype, "getEssaysByUser", null);
__decorate([
    (0, common_1.Get)('material/:materialId'),
    (0, swagger_1.ApiOperation)({ summary: 'Busca todos os ensaios de ductilidade por material' }),
    __param(0, (0, common_1.Param)('materialId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DuctilityController.prototype, "getEssaysByMaterial", null);
__decorate([
    (0, common_1.Get)('debug/all'),
    (0, swagger_1.ApiOperation)({ summary: 'DEBUG: Lista todos os ensaios de ductilidade' }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DuctilityController.prototype, "debugGetAllEssays", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Busca um ensaio de ductilidade específico por ID' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DuctilityController.prototype, "getEssayById", null);
exports.DuctilityController = DuctilityController = DuctilityController_1 = __decorate([
    (0, swagger_1.ApiTags)('ductility'),
    (0, common_1.Controller)('asphalt/essays/ductility'),
    __metadata("design:paramtypes", [service_1.DuctilityService])
], DuctilityController);
//# sourceMappingURL=index.js.map