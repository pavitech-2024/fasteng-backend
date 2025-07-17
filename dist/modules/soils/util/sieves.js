"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSieveValue = void 0;
const interfaces_1 = require("../../../utils/interfaces");
const getSieveValue = (label) => interfaces_1.AllSieves.find((sieve) => sieve.label === label).value;
exports.getSieveValue = getSieveValue;
//# sourceMappingURL=sieves.js.map