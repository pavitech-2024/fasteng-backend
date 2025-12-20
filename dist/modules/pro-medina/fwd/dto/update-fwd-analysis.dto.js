"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFwdAnalysisDto = void 0;
const openapi = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
const create_fwd_analysis_dto_1 = require("./create-fwd-analysis.dto");
class UpdateFwdAnalysisDto extends (0, mapped_types_1.PartialType)(create_fwd_analysis_dto_1.CreateFwdAnalysisDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateFwdAnalysisDto = UpdateFwdAnalysisDto;
//# sourceMappingURL=update-fwd-analysis.dto.js.map