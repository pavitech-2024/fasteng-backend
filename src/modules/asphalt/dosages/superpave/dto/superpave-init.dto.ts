import { IsNotEmpty } from "class-validator";

export class SuperpaveInitDto {
    @IsNotEmpty()
    projectName: string;
}