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
var InsertParams_ABCP_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertParams_ABCP_Service = void 0;
const common_1 = require("@nestjs/common");
const repository_1 = require("../repository");
const mongoose_1 = require("@nestjs/mongoose");
const database_config_1 = require("../../../../../infra/mongoose/database.config");
const mongoose_2 = require("mongoose");
const schemas_1 = require("../schemas");
let InsertParams_ABCP_Service = InsertParams_ABCP_Service_1 = class InsertParams_ABCP_Service {
    constructor(abcpModel, abcpRepository) {
        this.abcpModel = abcpModel;
        this.abcpRepository = abcpRepository;
        this.logger = new common_1.Logger(InsertParams_ABCP_Service_1.name);
    }
    saveInsertParams(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('save abcp insert Params step on insert-params.abcp.service.ts > [body]', { body });
                const { name } = body.insertParamsData;
                const abcpExists = yield this.abcpRepository.findOne(name, userId);
                const _a = body.insertParamsData, { name: paramsName } = _a, paramsDataWithoutName = __rest(_a, ["name"]);
                const abcpWithParams = Object.assign(Object.assign({}, abcpExists._doc), { insertParamsData: paramsDataWithoutName });
                yield this.abcpModel.updateOne({ "_id": abcpExists._id }, abcpWithParams);
                yield this.abcpRepository.saveStep(abcpExists._doc, 4);
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
};
exports.InsertParams_ABCP_Service = InsertParams_ABCP_Service;
exports.InsertParams_ABCP_Service = InsertParams_ABCP_Service = InsertParams_ABCP_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.ABCP.name, database_config_1.DATABASE_CONNECTION.CONCRETE)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        repository_1.ABCPRepository])
], InsertParams_ABCP_Service);
//# sourceMappingURL=insert-params.abcp.service.js.map