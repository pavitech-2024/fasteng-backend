"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
let AuthMiddleware = class AuthMiddleware {
    use(req, res, next) {
        const ignoredPaths = [
            '/',
            '/favicon.ico',
            '/favicon.png',
            '/auth/login',
            '/auth/refresh-login',
            '/users',
            '/docs/asphalt',
            '/docs/soils',
            '/docs/concrete',
            '/docs/promedina',
            '/app/health-check',
        ];
        if (ignoredPaths.includes(req.path)) {
            return next();
        }
        const token = req.headers['authorization'];
        if (!token) {
            console.warn('[AuthMiddleware] Token not found');
            return res.status(401).json({ message: 'Token not found' });
        }
        try {
            next();
        }
        catch (error) {
            console.error('[AuthMiddleware] Token validation error:', error);
            return res.status(401).json({ message: 'Invalid token' });
        }
    }
};
exports.AuthMiddleware = AuthMiddleware;
exports.AuthMiddleware = AuthMiddleware = __decorate([
    (0, common_1.Injectable)()
], AuthMiddleware);
//# sourceMappingURL=auth.middleware.js.map