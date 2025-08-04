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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonQueryFilter = exports.NeedCountQueryFilter = exports.PageQueryFilter = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class PageQueryFilter {
    constructor() {
        this.limit = 25;
        this.page = 0;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of items to be returned',
        default: 25,
        required: false,
    }),
    (0, class_transformer_1.Transform)(element => element &&
        element.value &&
        Number(element.value) >= 0 &&
        Number(element.value) <= 25
        ? Number(element.value)
        : 25),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PageQueryFilter.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Page number to be returned',
        default: 1,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(element => element && element.value && Number(element.value) > 0
        ? Number(element.value) - 1
        : 0),
    __metadata("design:type", Number)
], PageQueryFilter.prototype, "page", void 0);
exports.PageQueryFilter = PageQueryFilter;
class NeedCountQueryFilter extends PageQueryFilter {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_transformer_1.Transform)(({ value }) => Boolean(value)),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], NeedCountQueryFilter.prototype, "need_count", void 0);
exports.NeedCountQueryFilter = NeedCountQueryFilter;
class CommonQueryFilter extends NeedCountQueryFilter {
    constructor() {
        super(...arguments);
        this.filter = [];
        this.sort = [];
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)((element) => JSON.parse(element.value)),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Object)
], CommonQueryFilter.prototype, "show", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)((element) => JSON.parse(element.value)),
    __metadata("design:type", Object)
], CommonQueryFilter.prototype, "filter", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)((element) => JSON.parse(element.value)),
    __metadata("design:type", Object)
], CommonQueryFilter.prototype, "sort", void 0);
exports.CommonQueryFilter = CommonQueryFilter;
//# sourceMappingURL=queryFilter.js.map