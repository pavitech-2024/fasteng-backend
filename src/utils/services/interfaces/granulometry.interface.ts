export interface GranulometryData {
  _id: string;
  passants: Record<string, number>;
}

export interface TableData {
  tableColumnHeaders: string[];
  tableRows: any[];
}

export interface DNITBand {
  higher: number[];
  lower: number[];
}

export interface Projection {
  label: string;
  value: string;
}