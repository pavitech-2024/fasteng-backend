import { NotFound } from "./notFound";

export class GranulometryNotFound extends NotFound {
    constructor(value: string) {
        super(`${value}-granulometry`);
    }
}