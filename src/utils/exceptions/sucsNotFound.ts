import { NotFound } from "./notFound";

export class SucsNotFound extends NotFound {
    constructor(value: string) {
        super(`${value}-sucs`);
    }
}