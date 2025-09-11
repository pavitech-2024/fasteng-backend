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
var GeneralData_Ddui_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralData_Ddui_Service = void 0;
const common_1 = require("@nestjs/common");
const exceptions_1 = require("../../../../../utils/exceptions");
const repository_1 = require("../repository");
let GeneralData_Ddui_Service = GeneralData_Ddui_Service_1 = class GeneralData_Ddui_Service {
    constructor(dduiRepository) {
        this.dduiRepository = dduiRepository;
        this.logger = new common_1.Logger(GeneralData_Ddui_Service_1.name);
    }
    verifyInitDdui({ name }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('verify init ddui on general-data.ddui.service.ts > [body]');
                const dduiExists = yield this.dduiRepository.findOne({ "generalData.name": name });
                if (dduiExists)
                    throw new exceptions_1.AlreadyExists(`Ddui with name "${name}.`);
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
};
GeneralData_Ddui_Service = GeneralData_Ddui_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.DduiRepository])
], GeneralData_Ddui_Service);
exports.GeneralData_Ddui_Service = GeneralData_Ddui_Service;
//# sourceMappingURL=general-data.ddui.service.js.map