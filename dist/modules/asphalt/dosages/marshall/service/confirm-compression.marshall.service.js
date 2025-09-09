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
var ConfirmCompression_Marshall_Service_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmCompression_Marshall_Service = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const database_config_1 = require("../../../../../infra/mongoose/database.config");
const mongoose_2 = require("mongoose");
const repository_1 = require("../repository");
const schemas_1 = require("../schemas");
let ConfirmCompression_Marshall_Service = ConfirmCompression_Marshall_Service_1 = class ConfirmCompression_Marshall_Service {
    constructor(marshallModel, marshallRepository) {
        this.marshallModel = marshallModel;
        this.marshallRepository = marshallRepository;
        this.logger = new common_1.Logger(ConfirmCompression_Marshall_Service_1.name);
    }
    confirmSpecificGravity(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('confirming specific gravity on confirm-compression.marshall.service.ts > [body]', { body });
                const { method, listOfSpecificGravities, percentsOfDosage, confirmedPercentsOfDosage, optimumContent, gmm: gmmInput, valuesOfSpecificGravity, } = body;
                let confirmedSpecificGravity;
                let GMM;
                let formattedPercentsOfDosage = [];
                const ids1 = new Set();
                Object.keys(percentsOfDosage[0]).forEach((key) => {
                    const id = key.split('_')[1];
                    ids1.add(id);
                    const value = percentsOfDosage[0][key];
                    const index = Array.from(ids1).indexOf(id);
                    formattedPercentsOfDosage[index] = value;
                });
                if (method === 'DMT') {
                    const denominador = formattedPercentsOfDosage.reduce((acc, percent, i) => (acc += confirmedPercentsOfDosage[i] / listOfSpecificGravities[i]), 0);
                    const DMT = 100 / (denominador + optimumContent / 1.03);
                    confirmedSpecificGravity = {
                        result: DMT,
                        type: 'DMT',
                    };
                    return confirmedSpecificGravity;
                }
                else if (method === 'GMM') {
                    if (gmmInput && gmmInput > 0)
                        GMM = parseFloat(gmmInput);
                    else {
                        const normalize = (val) => typeof val === 'string' ? parseFloat(val.replace(',', '.')) : Number(val);
                        const GMM = normalize(valuesOfSpecificGravity.massOfDrySample) /
                            (normalize(valuesOfSpecificGravity.massOfDrySample) +
                                normalize(valuesOfSpecificGravity.massOfContainerWater) -
                                normalize(valuesOfSpecificGravity.massOfContainerWaterSample));
                        confirmedSpecificGravity = {
                            result: GMM,
                            type: 'GMM',
                        };
                        return confirmedSpecificGravity;
                    }
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    saveStep8Data(body, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.log('save marshall confirmation compression step on confirmation-compression.marshall.service.ts > [body]', {
                    body,
                });
                const { name } = body.confirmationCompressionData;
                const marshallExists = yield this.marshallRepository.findOne(name, userId);
                const _a = body.confirmationCompressionData, { name: materialName } = _a, confirmationCompressionWithoutName = __rest(_a, ["name"]);
                const marshallWithConfirmationCompression = Object.assign(Object.assign({}, marshallExists._doc), { confirmationCompressionData: confirmationCompressionWithoutName });
                yield this.marshallModel.updateOne({ _id: marshallExists._doc._id }, marshallWithConfirmationCompression);
                if (marshallExists._doc.generalData.step < 8) {
                    yield this.marshallRepository.saveStep(marshallExists, 8);
                }
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
};
exports.ConfirmCompression_Marshall_Service = ConfirmCompression_Marshall_Service;
exports.ConfirmCompression_Marshall_Service = ConfirmCompression_Marshall_Service = ConfirmCompression_Marshall_Service_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.Marshall.name, database_config_1.DATABASE_CONNECTION.ASPHALT)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        repository_1.MarshallRepository])
], ConfirmCompression_Marshall_Service);
//# sourceMappingURL=confirm-compression.marshall.service.js.map