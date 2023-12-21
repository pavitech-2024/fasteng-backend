import { IsNotEmpty } from "class-validator";

export class ABCPEssaySelectionDto {
    @IsNotEmpty()
    coarseAggregate_id: any;
    
    @IsNotEmpty()
    fineAggregate_id: any;
    
    @IsNotEmpty()
    cement_id: any;
}