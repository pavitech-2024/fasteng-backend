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
var AuthController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../dto");
const refresh_login_user_dto_1 = require("../dto/refresh-login-user.dto");
const service_1 = require("../service");
let AuthController = AuthController_1 = class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.logger = new common_1.Logger(AuthController_1.name);
    }
    login(body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`logging user with params > [body]`);
            const data = yield this.authService.login({
                email: body.email,
                password: body.password,
            });
            if (data.statusCode === 200)
                this.logger.log(`user logged with success`);
            return data;
        });
    }
    refreshLogin(body) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.log(`logging user with params > [body]`);
            const data = yield this.authService.refreshLogin(body);
            if (data.statusCode === 200)
                this.logger.log(`user logged with success`);
            return data;
        });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: 'Faz login no sistema' }),
    (0, swagger_1.ApiBody)({ type: dto_1.InputLoginUserDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Login realizado com sucesso', type: dto_1.OutputLoginUserDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Credenciais inválidas' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.InputLoginUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('refresh-login'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({
        summary: 'Faz login automático no sistema utilizando um possivel token válido',
    }),
    (0, swagger_1.ApiBody)({ type: refresh_login_user_dto_1.InputRefreshLoginDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Token renovado com sucesso', type: dto_1.OutputLoginUserDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Token inválido ou expirado' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_login_user_dto_1.InputRefreshLoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshLogin", null);
exports.AuthController = AuthController = AuthController_1 = __decorate([
    (0, common_1.Controller)('auth'),
    (0, swagger_1.ApiTags)('auth'),
    __metadata("design:paramtypes", [service_1.AuthService])
], AuthController);
//# sourceMappingURL=index.js.map