import { Injectable } from "@nestjs/common";
import { CompressionRepository } from "../repository";


@Injectable()
export class CompressionService {
  constructor(
    private readonly compressionRepository: CompressionRepository,
  ) {}
}