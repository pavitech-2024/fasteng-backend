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
var MaterialsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialsController = void 0;
const common_1 = require("@nestjs/common");
const service_1 = require("../service");
const swagger_1 = require("@nestjs/swagger");
const create_concrete_material_dto_1 = require("../dto/create-concrete-material.dto");
const user_decorator_1 = require("../../../../config/decorators/user.decorator");
const schemas_1 = require("../schemas");
let MaterialsController = MaterialsController_1 = class MaterialsController {
    constructor(materialsService) {
        this.materialsService = materialsService;
        this.logger = new common_1.Logger(MaterialsController_1.name);
    }
    createMaterial(material, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log('create material > [body]');
            const createdMaterial = yield this.materialsService.createMaterial(material, userId);
            if (createdMaterial)
                this.logger.log(`material created > [id]: ${createdMaterial._id}`);
            return createdMaterial;
        });
    }
    getAllByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`get all materials by user id > [id]: ${userId}`);
            return this.materialsService.getAllMaterials(userId).then(materials => ([{
                    materials: materials,
                }]));
        });
    }
    getMaterialById(materialId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`get material by id > [id]: ${materialId}`);
            return this.materialsService.getMaterial(materialId);
        });
    }
    updateMaterialById(materialId, material) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`update material by id > [id]: ${materialId}`);
            return this.materialsService.updateMaterial(material);
        });
    }
    deleteMaterialById(materialId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`delete material by id > [id]: ${materialId}`);
            return this.materialsService.deleteMaterial(materialId);
        });
    }
};
exports.MaterialsController = MaterialsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Cria um material no banco de dados.' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Material criado com sucesso!' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Erro ao criar material!' }),
    (0, swagger_1.ApiBody)({ type: create_concrete_material_dto_1.CreateConcreteMaterialDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_concrete_material_dto_1.CreateConcreteMaterialDto, String]),
    __metadata("design:returntype", Promise)
], MaterialsController.prototype, "createMaterial", null);
__decorate([
    (0, common_1.Get)('all/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Retorna todos os materiais do banco de dados de um usuário.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Materiais encontrados com sucesso!' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Usuário não encontrado!' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MaterialsController.prototype, "getAllByUserId", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Retorna um material do banco de dados.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Material encontrado com sucesso!' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Material não encontrado!' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MaterialsController.prototype, "getMaterialById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualiza um material do banco de dados.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Material atualizado com sucesso!' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Material não encontrado!' }),
    (0, swagger_1.ApiBody)({ type: create_concrete_material_dto_1.CreateConcreteMaterialDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, schemas_1.Material]),
    __metadata("design:returntype", Promise)
], MaterialsController.prototype, "updateMaterialById", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Deleta um material do banco de dados.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Material deletado com sucesso!' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Material não encontrado!' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MaterialsController.prototype, "deleteMaterialById", null);
exports.MaterialsController = MaterialsController = MaterialsController_1 = __decorate([
    (0, swagger_1.ApiTags)('materials'),
    (0, common_1.Controller)('concrete/materials'),
    __metadata("design:paramtypes", [service_1.MaterialsService])
], MaterialsController);
//# sourceMappingURL=index.js.map