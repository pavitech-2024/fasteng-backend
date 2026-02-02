"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFound = void 0;
const common_1 = require("@nestjs/common");
class NotFound extends common_1.HttpException {
    constructor(value) {
        super(`${value}-not-found`, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.NotFound = NotFound;
//# sourceMappingURL=notFound.js.map