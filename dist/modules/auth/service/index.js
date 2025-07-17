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
const axios_1 = require("axios");
const repository_1 = require("../../users/repository");
const utils_1 = require("../../../utils");
let AuthService = AuthService_1 = class AuthService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
        this.logger = new common_1.Logger(AuthService_1.name);
        this.tokenService = new utils_1.Token();
    }
    roxConnection(url, axiosMethod, config, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roxResponse = yield axios_1.default[axiosMethod](url, data, config);
                if (!roxResponse)
                    throw new exceptions_1.UnauthorizedException('Erro ao conectar com a Rox');
                if (roxResponse.data.response_code !== '200 OK')
                    throw new exceptions_1.UnauthorizedException('Usuário não encontrado (Rox)');
                const roxUser = roxResponse.data.data;
                if (roxUser.plan_status !== 'ACTIVE')
                    throw new exceptions_1.UnauthorizedException('Usuário com plano inativo');
                return roxUser;
            }
            catch (error) {
                this.logger.error(`error on rox connection: ${error}`);
                throw error;
            }
        });
    }
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roxUser = yield this.roxConnection('https://fastengapp.com.br/minhaconta/api/auth', 'post', null, data);
                const user = yield this.usersRepository.findOne({ _id: roxUser.uuid });
                if (!user)
                    throw new exceptions_1.UnauthorizedException('Usuário não encontrado');
                yield this.usersRepository.updateUserLastLogin(user);
                const token = this.tokenService.createToken({
                    planName: roxUser.plan_name,
                    email: roxUser.email,
                    name: roxUser.name,
                    userId: roxUser.uuid,
                    lastLogin: user.lastLoginList[user.lastLoginList.length - 1],
                }, '10h');
                return {
                    statusCode: 200,
                    token,
                    user,
                    name: roxUser.name,
                    email: roxUser.email,
                    planName: roxUser.plan_name,
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
                const { _id } = data;
                let { token } = data;
                const user = yield this.usersRepository.findOne({ _id });
                if (!user)
                    throw new exceptions_1.UnauthorizedException('Usuário não encontrado');
                const roxUser = yield this.roxConnection(`https://fastengapp.com.br/minhaconta/api/user/${_id}`, 'get', null, {
                    headers: {
                        Accept: 'application/json',
                        Authorization: 'Bearer pZcbMoog4bSjWZYGP2GM1FMyjj4o96ZjtYeDJdRsPus3bwNcWklR0HnO0CFm',
                    },
                });
                if (!this.tokenService.verifyToken(token))
                    throw new exceptions_1.UnauthorizedException('Usuário com token inválido');
                else {
                    token = this.tokenService.createToken({
                        planName: roxUser.plan_name,
                        email: roxUser.email,
                        name: roxUser.name,
                        userId: roxUser.uuid,
                        lastLogin: new Date(),
                    }, '10h');
                    yield this.usersRepository.updateUserLastLogin(user);
                    return {
                        statusCode: 200,
                        token,
                        user,
                        name: roxUser.name,
                        planName: roxUser.plan_name,
                        email: roxUser.email,
                    };
                }
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