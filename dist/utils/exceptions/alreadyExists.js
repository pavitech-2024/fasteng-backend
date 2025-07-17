"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlreadyExists = void 0;
const common_1 = require("@nestjs/common");
class AlreadyExists extends common_1.HttpException {
    constructor(value) {
        super({
            statusCode: common_1.HttpStatus.CONFLICT,
            message: `${value} already exists`,
            error: 'Conflict',
        }, common_1.HttpStatus.CONFLICT);
    }
}
exports.AlreadyExists = AlreadyExists;
//# sourceMappingURL=alreadyExists.js.map