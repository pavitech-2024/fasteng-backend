import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Marshall } from "../schemas";

export class MarshallInitDto {

    @IsOptional()
    @IsString()
    _id?: string

    @IsNotEmpty()
    generalData: Marshall['generalData']
}