import { IsNotEmpty } from "class-validator";

export class ABCPEssaySelectionDto {
    coarseAggregates: string[];
    fineAggregates: string[];
    @IsNotEmpty()
    cements: string[];
}