import { IsNotEmpty } from "class-validator";

export class ABCPInitDto {
    @IsNotEmpty()
    name: string;
}