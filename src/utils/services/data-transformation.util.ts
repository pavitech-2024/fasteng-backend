import { AllSieves } from "utils/interfaces";
export class DataTransformationUtil {
  static transformGranulometryData(granulometrys: any[], aggregates: { _id: string; name: string }[]) {
    return aggregates.map(aggregate => {
      const granulometry = granulometrys.find(({ generalData }) => 
        aggregate._id.toString() === generalData.material._id.toString()
      );

      const passants = {};
      granulometry?.step2Data.passant?.forEach(p => {
        passants[p.sieve_label] = p.passant;
      });

      return {
        _id: aggregate._id,
        passants
      };
    });
  }

  static generateTableStructure(granulometryData: any[]) {
    const tableColumnHeaders: string[] = ['sieve_label'];
    const tableRows = [];

    AllSieves.forEach(sieve => {
      const contains = granulometryData.some(aggregate => sieve.label in aggregate.passants);
      
      if (contains) {
        const aggregatesData = {};
        granulometryData.forEach(aggregate => {
          const { _id, passants } = aggregate;
          aggregatesData[`total_passant_${_id}`] = passants[sieve.label];
          aggregatesData[`passant_${_id}`] = null;

          if (!tableColumnHeaders.some(header => header.includes(_id))) {
            tableColumnHeaders.push(`total_passant_${_id}`);
            tableColumnHeaders.push(`passant_${_id}`);
          }
        });
        tableRows.push({ sieve_label: sieve.label, ...aggregatesData });
      }
    });

    return { tableColumnHeaders, tableRows };
  }
}