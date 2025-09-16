"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PenetrationNotFound = void 0;
const notFound_1 = require("./notFound");
class PenetrationNotFound extends notFound_1.NotFound {
    constructor(value) {
        super(`${value}-penetration`);
    }
}
exports.PenetrationNotFound = PenetrationNotFound;
//# sourceMappingURL=penetrationNotFound.js.map