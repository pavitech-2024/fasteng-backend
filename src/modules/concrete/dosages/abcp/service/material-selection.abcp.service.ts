import { Logger } from "@nestjs/common";
import { ABCPRepository } from "../repository";

export class MaterialSelection_ABCP_Service {
    private logger = new Logger(MaterialSelection_ABCP_Service.name)

    constructor(
        private readonly abcpRepository: ABCPRepository,
    ) {}
}