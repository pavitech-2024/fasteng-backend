export class DataProcessingUtil {
  static filterNonNullVolumetricData(volumetricParametersData: any): any[] {
    const newArray: any[] = [];

    Object.entries(volumetricParametersData).forEach(([key, value]: [string, any[]]) => {
      const allNonNull = value.every((obj: any) => Object.values(obj).every((val: any) => val !== null));
      if (allNonNull) {
        newArray.push({ [key]: value });
      }
    });

    return newArray;
  }

  static calculateAverages(data: any[], fields: string[]): { [key: string]: number } {
    const sums: { [key: string]: number } = {};
    const counts: { [key: string]: number } = {};

    fields.forEach(field => {
      sums[field] = 0;
      counts[field] = 0;
    });

    data.forEach(item => {
      fields.forEach(field => {
        if (item[field] !== 0 && item[field] !== null) {
          sums[field] += item[field];
          counts[field]++;
        }
      });
    });

    const averages: { [key: string]: number } = {};
    fields.forEach(field => {
      averages[field] = counts[field] > 0 ? sums[field] / counts[field] : 0;
    });

    return averages;
  }
}