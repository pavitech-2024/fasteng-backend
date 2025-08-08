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
var MaterialsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialsService = void 0;
const common_1 = require("@nestjs/common");
const repository_1 = require("../repository");
const exceptions_1 = require("../../../../utils/exceptions");
const get_essays_by_material_service_1 = require("./get-essays-by-material.service");
const repository_2 = require("../../essays/fwd/repository");
const repository_3 = require("../../essays/igg/repository");
const repository_4 = require("../../essays/rtcd/repository");
const repository_5 = require("../../essays/ddui/repository");
let MaterialsService = MaterialsService_1 = class MaterialsService {
    constructor(materialsRepository, getEssaysByMaterial_Service, fwdRepository, iggRepository, rtcdRepository, dduiRepository) {
        this.materialsRepository = materialsRepository;
        this.getEssaysByMaterial_Service = getEssaysByMaterial_Service;
        this.fwdRepository = fwdRepository;
        this.iggRepository = iggRepository;
        this.rtcdRepository = rtcdRepository;
        this.dduiRepository = dduiRepository;
        this.logger = new common_1.Logger(MaterialsService_1.name);
    }
    createMaterial(material, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.materialsRepository.findOne({ name: material.name, userId }))
                throw new exceptions_1.AlreadyExists(`Material with name "${material.name}"`);
            const createdMaterial = yield this.materialsRepository.create(Object.assign(Object.assign({}, material), { createdAt: new Date(), userId }));
            return createdMaterial;
        });
    }
    getMaterial(materialId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const material = yield this.materialsRepository.findOne({ _id: materialId });
                if (!material)
                    throw new exceptions_1.NotFound('Material');
                const essays = yield this.getEssaysByMaterial_Service.getEssaysByMaterial(material);
                return { material, essays };
            }
            catch (error) {
                this.logger.error(`error on get material > [error]: ${error}`);
                throw error;
            }
        });
    }
    getSelectedMaterialsById(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const materialIds = Array.from(new Set(ids.split(',').map((id) => id.trim())));
            try {
                const materials = yield this.materialsRepository.findSelectedById(materialIds);
                const essaysPromises = materials.map((material) => this.getEssaysByMaterial_Service.getEssaysByMaterial(material));
                const essays = yield Promise.all(essaysPromises);
                return { materials, essays };
            }
            catch (error) {
                this.logger.error(`error on get materials and essays by id > [error]: ${error}`);
                throw error;
            }
        });
    }
    getAllMaterialsList(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const materials = yield this.materialsRepository.findByType({ $in: ['filler', 'CAP', 'asphaltBinder', 'coarseAggregate', 'fineAggregate'] }, userId);
                const fwdEssays = yield this.fwdRepository.findAllByUserId(userId);
                const iggEssays = yield this.iggRepository.findAllByUserId(userId);
                const rtcdEssays = yield this.rtcdRepository.findAllByUserId(userId);
                const dduiEssays = yield this.dduiRepository.findAllByUserId(userId);
                return {
                    materials,
                    fwdEssays,
                    iggEssays,
                    rtcdEssays,
                    dduiEssays
                };
            }
            catch (error) {
                this.logger.error(`error on get all materials > [error]: ${error}`);
                throw error;
            }
        });
    }
    getAllMaterials(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const materials = yield this.materialsRepository.findByType({ $in: ['filler', 'CAP', 'asphaltBinder', 'coarseAggregate', 'fineAggregate'] }, userId);
                return materials;
            }
            catch (error) {
                this.logger.error(`error on get all materials > [error]: ${error}`);
                throw error;
            }
        });
    }
    updateMaterial(material) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const materialToUpdate = yield this.materialsRepository.findOne({ _id: material._id });
                if (!materialToUpdate)
                    throw new exceptions_1.NotFound('Material');
                return this.materialsRepository.findOneAndUpdate({ _id: material._id }, material);
            }
            catch (error) {
                this.logger.error(`error on update material > [error]: ${error}`);
                throw error;
            }
        });
    }
    deleteMaterial(materialId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const material = yield this.materialsRepository.findOne({ _id: materialId });
                if (!material)
                    throw new exceptions_1.NotFound('Material');
                return this.materialsRepository.findOneAndDelete({ _id: materialId });
            }
            catch (error) {
                this.logger.error(`error on delete material > [error]: ${error}`);
                throw error;
            }
        });
    }
};
exports.MaterialsService = MaterialsService;
exports.MaterialsService = MaterialsService = MaterialsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.MaterialsRepository,
        get_essays_by_material_service_1.GetEssaysByMaterial_Service,
        repository_2.FwdRepository,
        repository_3.IggRepository,
        repository_4.RtcdRepository,
        repository_5.DduiRepository])
], MaterialsService);
//# sourceMappingURL=index.js.map