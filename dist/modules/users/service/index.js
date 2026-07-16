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
var UsersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const repository_1 = require("../repository");
const exceptions_1 = require("../../../utils/exceptions");
const password_1 = require("../../../utils/password");
let UsersService = UsersService_1 = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
        this.logger = new common_1.Logger(UsersService_1.name);
    }
    createUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ uuid, connections, lastLoginList, photo, name, email, phone, dob, password }) {
            try {
                if (yield this.usersRepository.findOne({ _id: uuid }))
                    throw new exceptions_1.AlreadyExists('User');
                const passwordHash = password ? (0, password_1.hashPassword)(password) : null;
                return this.usersRepository.create({
                    _id: uuid,
                    connections,
                    lastLoginList,
                    photo,
                    name: name !== null && name !== void 0 ? name : '',
                    email: email !== null && email !== void 0 ? email : '',
                    phone: phone !== null && phone !== void 0 ? phone : '',
                    dob: dob !== null && dob !== void 0 ? dob : new Date(),
                    password: passwordHash,
                    preferences: {
                        language: 'pt-BR',
                        decimal: 2,
                    },
                });
            }
            catch (error) {
                this.logger.error(`error on create user > [error]: ${error}`);
                throw error;
            }
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.usersRepository.findOne({ _id: id });
                if (!user)
                    throw new exceptions_1.NotFound('User');
                return user;
            }
            catch (error) {
                this.logger.error(`error on get user > [error]: ${error}`);
                throw error;
            }
        });
    }
    updateUser(id, updateUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield this.usersRepository.findOne({ _id: id });
                if (!existingUser)
                    throw new exceptions_1.NotFound('User');
                const { photo, name, email, phone, dob, preferences } = updateUserDto;
                if (photo)
                    existingUser.photo = photo;
                if (name)
                    existingUser.name = name;
                if (email)
                    existingUser.email = email;
                if (phone)
                    existingUser.phone = phone;
                if (dob)
                    existingUser.dob = new Date(dob);
                if (preferences)
                    existingUser.preferences = preferences;
                return yield this.usersRepository.findOneAndUpdate({ _id: id }, existingUser);
            }
            catch (error) {
                this.logger.error(`Error updating user: ${error}`);
                throw error;
            }
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.usersRepository.findOne({ _id: id });
                if (!user)
                    throw new exceptions_1.NotFound('User');
                return this.usersRepository.findOneAndDelete({ _id: id });
            }
            catch (error) {
                this.logger.error(`error on delete user > [error]: ${error}`);
                throw error;
            }
        });
    }
    resetPassword(id, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield this.usersRepository.findOne({ _id: id });
                if (!existingUser) {
                    throw new exceptions_1.NotFound('User');
                }
                const passwordHash = (0, password_1.hashPassword)(newPassword);
                existingUser.password = passwordHash;
                const updatedUser = yield this.usersRepository.findOneAndUpdate({ _id: id }, existingUser);
                this.logger.log(`password reset for user: ${id}`);
                return updatedUser;
            }
            catch (error) {
                this.logger.error(`error on reset password > [error]: ${error}`);
                throw error;
            }
        });
    }
    completeUserData(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield this.usersRepository.findOne({ _id: id });
                if (!existingUser)
                    throw new exceptions_1.NotFound('User');
                const passwordHash = (0, password_1.hashPassword)(data.password);
                existingUser.email = data.email;
                existingUser.name = data.name;
                existingUser.password = passwordHash;
                const updatedUser = yield this.usersRepository.findOneAndUpdate({ _id: id }, existingUser);
                this.logger.log(`✅ Dados completados para usuário: ${id}`);
                return updatedUser;
            }
            catch (error) {
                this.logger.error(`❌ Erro ao completar dados: ${error}`);
                throw error;
            }
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = UsersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.UsersRepository])
], UsersService);
//# sourceMappingURL=index.js.map