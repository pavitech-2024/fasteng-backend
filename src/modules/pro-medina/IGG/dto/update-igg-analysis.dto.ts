import { PartialType } from '@nestjs/mapped-types';
import { CreateIggAnalysisDto } from './create-igg-analysis.dto';

export class UpdateIggAnalysisDto extends PartialType(CreateIggAnalysisDto) {}