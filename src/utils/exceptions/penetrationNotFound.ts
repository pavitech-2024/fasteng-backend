import { NotFound } from "./notFound";

export class PenetrationNotFound extends NotFound {
  constructor(value: string) {
      super(`${value}-penetration`);
  }
}