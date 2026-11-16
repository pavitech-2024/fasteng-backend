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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const exceptions_1 = require("@nestjs/common/exceptions");
const repository_1 = require("../../users/repository");
const utils_1 = require("../../../utils");
const password_1 = require("../../../utils/password");
let AuthService = AuthService_1 = class AuthService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
        this.logger = new common_1.Logger(AuthService_1.name);
        this.tokenService = new utils_1.Token();
    }
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.usersRepository.findOne({ email: data.email });
                this.logger.debug(`login attempt for email=${data.email}, userFound=${!!user}`);
                if (!user) {
                    this.logger.warn(`login failed: user not found for email=${data.email}`);
                    throw new exceptions_1.UnauthorizedException('Usuário não encontrado');
                }
                if (!user.password) {
                    this.logger.warn(`login failed: user has no password set for email=${data.email}`);
                    throw new exceptions_1.UnauthorizedException('Credenciais inválidas');
                }
                if (!(0, password_1.verifyPassword)(data.password, user.password)) {
                    this.logger.warn(`login failed: invalid password for email=${data.email}`);
                    throw new exceptions_1.UnauthorizedException('Credenciais inválidas');
                }
                yield this.usersRepository.updateUserLastLogin(user);
                const token = this.tokenService.createToken({
                    planName: 'INTERNAL',
                    email: user.email,
                    name: user.name,
                    userId: user._id,
                    lastLogin: user.lastLoginList[user.lastLoginList.length - 1],
                }, '10h');
                return {
                    statusCode: 200,
                    token,
                    user,
                    name: user.name,
                    email: user.email,
                    planName: 'INTERNAL',
                };
            }
            catch (error) {
                this.logger.error(`error on login: ${error}`);
                throw error;
            }
        });
    }
    refreshLogin(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id, token } = data;
                const user = yield this.usersRepository.findOne({ _id });
                if (!user)
                    throw new exceptions_1.UnauthorizedException('Usuário não encontrado');
                if (!this.tokenService.verifyToken(token))
                    throw new exceptions_1.UnauthorizedException('Usuário com token inválido');
                yield this.usersRepository.updateUserLastLogin(user);
                const newToken = this.tokenService.createToken({
                    planName: 'INTERNAL',
                    email: user.email,
                    name: user.name,
                    userId: user._id,
                    lastLogin: new Date(),
                }, '10h');
                return {
                    statusCode: 200,
                    token: newToken,
                    user,
                    name: user.name,
                    planName: 'INTERNAL',
                    email: user.email,
                };
            }
            catch (error) {
                this.logger.error(`error on refreshLogin: ${error}`);
                throw error;
            }
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_1.UsersRepository])
], AuthService);
//# sourceMappingURL=index.js.map