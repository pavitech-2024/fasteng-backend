// src/modules/fwd-analysis/dto/update-fwd-analysis.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateFwdAnalysisDto } from './create-fwd-analysis.dto';

export class UpdateFwdAnalysisDto extends PartialType(CreateFwdAnalysisDto) {}