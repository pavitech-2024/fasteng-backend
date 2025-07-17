"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SucsNotFound = void 0;
const notFound_1 = require("./notFound");
class SucsNotFound extends notFound_1.NotFound {
    constructor(value) {
        super(`${value}-sucs`);
    }
}
exports.SucsNotFound = SucsNotFound;
//# sourceMappingURL=sucsNotFound.js.map