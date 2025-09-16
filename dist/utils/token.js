"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
class Token {
    constructor() {
        this.config = new config_1.ConfigService();
        this.logger = new common_1.Logger();
    }
    createToken(data, expiresIn) {
        try {
            this.logger.log(`create token with [data], to expires in ${expiresIn}`);
            this.value = (0, jsonwebtoken_1.sign)(data, this.config.get('TOKEN_SECRET'), { expiresIn: expiresIn });
            return this.value;
        }
        catch (error) {
            this.logger.error(`error on createToken: ${error}`);
            throw error;
        }
    }
    verifyToken(token) {
        try {
            this.logger.log(`verify token with [token]`);
            return (0, jsonwebtoken_1.verify)(token, this.config.get('TOKEN_SECRET'));
        }
        catch (error) {
            this.logger.error(`error on verifyToken: ${error}`);
            throw error;
        }
    }
}
exports.Token = Token;
//# sourceMappingURL=token.js.map