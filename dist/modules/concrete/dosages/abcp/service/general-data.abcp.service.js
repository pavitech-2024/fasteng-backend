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
var GeneralData_ABCP_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralData_ABCP_Service = void 0;
const common_1 = require("@nestjs/common");
const index_1 = require("../repository/index");
const exceptions_1 = require("../../../../../utils/exceptions");
let GeneralData_ABCP_Service = GeneralData_ABCP_Service_1 = class GeneralData_ABCP_Service {
    constructor(abcpRepository) {
        this.abcpRepository = abcpRepository;
        this.logger = new common_1.Logger(GeneralData_ABCP_Service_1.name);
    }
    verifyInitABCP(abcp, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('verify init abcp on general-data.abcp.service.ts > [body]');
                const { name } = abcp;
                const abcpExists = yield this.abcpRepository.findOne(name, userId);
                if (abcpExists)
                    throw new exceptions_1.AlreadyExists('name');
                const createdPartialAbcp = yield this.abcpRepository.createPartialAbcp(abcp, userId);
                yield this.abcpRepository.saveStep(createdPartialAbcp._doc, 1);
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
};
GeneralData_ABCP_Service = GeneralData_ABCP_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [index_1.ABCPRepository])
], GeneralData_ABCP_Service);
exports.GeneralData_ABCP_Service = GeneralData_ABCP_Service;
//# sourceMappingURL=general-data.abcp.service.js.map