"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GranulometryNotFound = void 0;
const notFound_1 = require("./notFound");
class GranulometryNotFound extends notFound_1.NotFound {
    constructor(value) {
        super(`${value}-granulometry`);
    }
}
exports.GranulometryNotFound = GranulometryNotFound;
//# sourceMappingURL=granulometryNotFound.js.map