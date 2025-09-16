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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schemas_1 = require("../schemas");
const database_config_1 = require("../../../infra/mongoose/database.config");
let UsersRepository = class UsersRepository {
    constructor(userModel) {
        this.userModel = userModel;
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdUser = new this.userModel(Object.assign(Object.assign({}, user), { createdAt: new Date() }));
            return createdUser.save();
        });
    }
    findOne(userFilterQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userModel.findOne(userFilterQuery);
        });
    }
    findOneAndUpdate(userFilterQuery, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userModel.findOneAndUpdate(userFilterQuery, user, {
                new: true,
            });
        });
    }
    findOneAndDelete(userFilterQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userModel.findByIdAndDelete(userFilterQuery);
        });
    }
    updateUserLastLogin(user) {
        user.lastLoginList.length >= user.connections && user.lastLoginList.shift();
        user.lastLoginList.push(new Date());
    }
};
UsersRepository = __decorate([
    __param(0, (0, mongoose_1.InjectModel)(schemas_1.User.name, database_config_1.DATABASE_CONNECTION.COMMON)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersRepository);
exports.UsersRepository = UsersRepository;
//# sourceMappingURL=index.js.map