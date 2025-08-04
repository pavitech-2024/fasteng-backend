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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var ConfirmCompaction_Superpave_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmCompaction_Superpave_Service = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const repository_1 = require("../repository");
const schemas_1 = require("../schemas");
const mongoose_2 = require("@nestjs/mongoose");
const database_config_1 = require("../../../../../infra/mongoose/database.config");
let ConfirmCompaction_Superpave_Service = ConfirmCompaction_Superpave_Service_1 = class ConfirmCompaction_Superpave_Service {
    constructor(superpaveModel, superpaveRepository) {
        this.superpaveModel = superpaveModel;
        this.superpaveRepository = superpaveRepository;
        this.logger = new common_1.Logger(ConfirmCompaction_Superpave_Service_1.name);
    }
    saveConfirmattionCompressionData(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('save superpave confirm compaction step on confirm-compaction.superpave.service.ts > [body]', { body });
                const { name } = body.confirmationCompressionData;
                const superpaveExists = yield this.superpaveRepository.findOne(name, userId);
                const _a = body.confirmationCompressionData, { name: materialName } = _a, confirmCompactionWithoutName = __rest(_a, ["name"]);
                const superpaveWithConfirmCompaction = Object.assign(Object.assign({}, superpaveExists._doc), { confirmationCompressionData: confirmCompactionWithoutName });
                yield this.superpaveModel.updateOne({ _id: superpaveExists._doc._id }, superpaveWithConfirmCompaction);
                if (superpaveExists._doc.generalData.step < 10) {
                    yield this.superpaveRepository.saveStep(superpaveExists, 10);
                }
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
};
ConfirmCompaction_Superpave_Service = ConfirmCompaction_Superpave_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(schemas_1.Superpave.name, database_config_1.DATABASE_CONNECTION.ASPHALT)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        repository_1.SuperpaveRepository])
], ConfirmCompaction_Superpave_Service);
exports.ConfirmCompaction_Superpave_Service = ConfirmCompaction_Superpave_Service;
//# sourceMappingURL=confirm-compaction.service.js.map