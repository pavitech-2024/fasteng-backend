import { IsNotEmpty } from "class-validator";

export class ABCPEssaySelectionDto {
    @IsNotEmpty()
    coarseAggregate_id: string;
    
    @IsNotEmpty()
    fineAggregate_id: string;
    
    @IsNotEmpty()
    cement_id: string;
}