import { Injectable, Logger } from "@nestjs/common";
import { AsphaltGranulometryRepository } from "../../../essays/granulometry/repository";
import { AsphaltGranulometry } from "../../../essays/granulometry/schemas";
import { AllSieves } from "../../../../../utils/interfaces";

@Injectable()
export class GranulometryComposition_Superpave_Service {
  private logger = new Logger(GranulometryComposition_Superpave_Service.name)

  constructor(
    private readonly granulometry_repository: AsphaltGranulometryRepository,
  ) { }

  async getGranulometryData(aggregates: { _id: string, name: string}[]) {
    try {

      const granulometry_data: {
        _id: string;
        passants: {}
      }[] = []

      const granulometrys = await this.granulometry_repository.findAll();

      aggregates.forEach(aggregate => {
        const granulometry: AsphaltGranulometry = granulometrys.find(({ generalData }) => {
          const { material } = generalData
          return aggregate._id.toString() === material._id.toString()
        });

        const { passant } = granulometry.results;

        let passants = {}

        passant.forEach(p => {
          passants[p[0]] = p[1]
        })

        console.log(passants)

        granulometry_data.push({
          _id: aggregate._id,
          passants: passants,
        });

      });

      //
      const table_column_headers: string[] = []
      const table_rows = [];

      table_column_headers.push('sieve_label')

      AllSieves.forEach((sieve) => {

        const contains = granulometry_data.some(aggregate => (sieve.label in aggregate.passants))

        if (contains) {
          const aggregates_data = {}
          granulometry_data.forEach(aggregate => {
            const { _id, passants } = aggregate

            // aggregates_data[_id] = {}
            // aggregates_data[_id]['_id'] = _id
            aggregates_data['total_passant_'.concat(_id)] = passants[sieve.label]
            aggregates_data['passant_'.concat(_id)] = null

            // adicionando as colunas à tabela
            if (!table_column_headers.some(header => (header.includes(_id)))) {
              table_column_headers.push('total_passant_'.concat(_id))
              table_column_headers.push('passant_'.concat(_id))
            }
          })
          table_rows.push({ sieve_label: sieve.label, ...aggregates_data })
        }
      })

      this.logger.log(table_rows)
      this.logger.log(table_column_headers)

      const table_data = {
        table_column_headers,
        table_rows
      }
      //

      return table_data

    } catch (error) {
      throw error
    }
  }
}
