import { Document } from 'mongoose';
export type IggAnalysisDocument = IggAnalysis & Document;
declare class DefectCount {
    code: string;
    count: number;
}
declare class PavementStation {
    id: number;
    stationNumber: string;
    section: string;
    tri: number;
    tre: number;
    defects: DefectCount[];
    date?: string;
}
export declare class IggAnalysis {
    name: string;
    description?: string;
    road: string;
    section: string;
    subtrack?: string;
    pavementType: string;
    evaluationDate: string;
    stations: PavementStation[];
    results?: {
        generalData: Record<string, unknown>;
        statistics: {
            flechas_TRI: {
                media: number;
                variancia: number;
            };
            flechas_TRE: {
                media: number;
                variancia: number;
            };
            F: number;
            FV: number;
            frequencias_absolutas: Record<number, number>;
            frequencias_relativas: Record<number, number>;
            IGI_tipos: Record<number, number>;
            IGI_F: number;
            IGI_FV: number;
            IGG: number;
            classificacao: string;
            cor_classificacao: string;
            estacao_critica: any;
            total_defeitos: number;
            composicao_igg: {
                fator: string;
                valor: number;
                tipo?: number;
            }[];
            total_estacoes: number;
        };
    };
    status: string;
    userId?: string;
}
export declare const IggAnalysisSchema: import("mongoose").Schema<IggAnalysis, import("mongoose").Model<IggAnalysis, any, any, any, Document<unknown, any, IggAnalysis> & IggAnalysis & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IggAnalysis, Document<unknown, {}, import("mongoose").FlatRecord<IggAnalysis>> & import("mongoose").FlatRecord<IggAnalysis> & {
    _id: import("mongoose").Types.ObjectId;
}>;
export {};
