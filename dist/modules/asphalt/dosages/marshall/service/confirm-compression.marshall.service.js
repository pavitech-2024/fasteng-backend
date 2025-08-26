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
var ConfirmCompression_Marshall_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmCompression_Marshall_Service = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const database_config_1 = require("../../../../../infra/mongoose/database.config");
const mongoose_2 = require("mongoose");
const repository_1 = require("../repository");
const schemas_1 = require("../schemas");
const error_handler_1 = require("../../../../../utils/error-handler");
let ConfirmCompression_Marshall_Service = ConfirmCompression_Marshall_Service_1 = class ConfirmCompression_Marshall_Service {
    constructor(marshallRepository, marshallModel) {
        this.marshallRepository = marshallRepository;
        this.marshallModel = marshallModel;
        this.logger = new common_1.Logger(ConfirmCompression_Marshall_Service_1.name);
    }
    confirmSpecificGravity(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('Confirming specific gravity', { body });
                const { method, listOfSpecificGravities, percentsOfDosage, confirmedPercentsOfDosage, optimumContent, gmm, valuesOfSpecificGravity, } = body;
                const formattedPercentsOfDosage = [];
                const ids = new Set();
                Object.keys(percentsOfDosage[0]).forEach((key) => {
                    const id = key.split('_')[1];
                    ids.add(id);
                    const value = percentsOfDosage[0][key];
                    const index = Array.from(ids).indexOf(id);
                    formattedPercentsOfDosage[index] = value;
                });
                if (method === 'DMT') {
                    const denominador = formattedPercentsOfDosage.reduce((acc, percent, i) => acc + confirmedPercentsOfDosage[i] / listOfSpecificGravities[i], 0);
                    const DMT = 100 / (denominador + optimumContent / 1.03);
                    return { result: DMT, type: 'DMT' };
                }
                else {
                    const GMM = gmm !== null && gmm !== void 0 ? gmm : valuesOfSpecificGravity.massOfDrySample /
                        (valuesOfSpecificGravity.massOfDrySample -
                            valuesOfSpecificGravity.massOfContainerWaterSample +
                            valuesOfSpecificGravity.massOfContainerWater);
                    return { result: GMM, type: 'GMM' };
                }
            }
            catch (error) {
                this.logger.error('Error confirming specific gravity', error);
                throw error;
            }
        });
    }
    saveStep8Data(confirmationCompressionData, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('Saving step 8 confirmation compression', { confirmationCompressionData });
                const marshallExists = yield this.marshallRepository.findOne(confirmationCompressionData.name, userId);
                if (!marshallExists)
                    throw new Error('Marshall not found');
                marshallExists.confirmationCompressionData = confirmationCompressionData;
                yield marshallExists.save();
                if (marshallExists.step < 8) {
                    yield this.marshallRepository.saveStep(marshallExists._id, 8);
                }
                return true;
            }
            catch (error) {
                (0, error_handler_1.handleError)(error, 'Error saving step 8 data', true);
                throw error;
            }
        });
    }
};
exports.ConfirmCompression_Marshall_Service = ConfirmCompression_Marshall_Service;
exports.ConfirmCompression_Marshall_Service = ConfirmCompression_Marshall_Service = ConfirmCompression_Marshall_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(schemas_1.Marshall.name, database_config_1.DATABASE_CONNECTION.ASPHALT)),
    __metadata("design:paramtypes", [repository_1.MarshallRepository,
        mongoose_2.Model])
], ConfirmCompression_Marshall_Service);
//# sourceMappingURL=confirm-compression.marshall.service.js.map