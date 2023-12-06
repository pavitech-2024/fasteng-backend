import { Injectable, Logger } from "@nestjs/common";
import { AsphaltGranulometryRepository } from "../../../../../modules/asphalt/essays/granulometry/repository";
import { AsphaltGranulometry } from "../../../../../modules/asphalt/essays/granulometry/schemas";

@Injectable()
export class GranulometryComposition_Marshall_Service {
  private logger = new Logger(GranulometryComposition_Marshall_Service.name)

  constructor(
    private readonly granulometry_repository: AsphaltGranulometryRepository,
  ) { }

  async getGranulometryData(aggregates: string[]) {
    try {

      const granulometry_data: {
        _id: string;
        passants: {}
      }[] = []

      const granulometrys = await this.granulometry_repository.findAll();

      aggregates.forEach(aggregate => {
        const granulometry: AsphaltGranulometry = granulometrys.find(({ generalData }) => {
          const { material } = generalData
          return aggregate.toString() === material._id.toString()
        });

        const { passant } = granulometry.results;

        let passants = {}

        passant.forEach( p => {
          passants[p[0]] = p[1]
        })

        console.log(passants)

        granulometry_data.push({
          _id: aggregate,
          passants: passants,
        });

      });

      return granulometry_data
      
    } catch (error) {
      throw error
    }
  }
}