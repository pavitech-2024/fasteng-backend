import { IsNotEmpty } from "class-validator";

export class MarshallInitDto {
    @IsNotEmpty()
    projectName: string;
}