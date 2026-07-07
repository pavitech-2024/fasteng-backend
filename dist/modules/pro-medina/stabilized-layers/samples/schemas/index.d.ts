import { HydratedDocument } from 'mongoose';
export type StabilizedLayers_SamplesDocument = HydratedDocument<StabilizedLayers_Sample>;
export type StabilizedLayersGeneralData = {
    name: string;
    tipoSecao: string;
    faseMonitoramento: string;
    liberacaoTrafico: string;
    utilizadaMedina: string;
    utilizadaLvec: string;
    dadosConfirmadosICT: string;
    observations?: string;
    iriPreReabilitacao: string;
    atPreReabilitacao: string;
    fresagem: string;
    espessuraFresagem: string;
    intervencaoBase: string;
    sami: string;
    pinturaLigacao: string;
    imprimacao: string;
    dataUltimaAtualizacao: string;
    tempoServicoAnos: string;
    tempoServicoMeses: string;
    local: string;
    municipioEstado: string;
    extensao: string;
    velocidadeDiretriz: string;
    kmInicial: string;
    kmFinal: string;
    inicioEstaca: string;
    inicioMetros: string;
    fimEstaca: string;
    fimMetros: string;
    altitudeMedia: string;
    numeroFaixas: string;
    faixaMonitorada: string;
    larguraFaixa: string;
    latitudeI: string;
    longitudeI: string;
    latitudeF: string;
    longitudeF: string;
    structuralComposition: {
        id: number;
        layer: string;
        material: string;
        thickness: string;
    }[];
    imagemEstrutural: string;
    dataImagens: string;
};
export type StabilizedLayersStep2Data = {
    layers: {
        id: string;
        title: string;
        teorCimento: string;
        rt: string;
        rtcd: string;
        rcs: string;
        faixaGranulometrica: string;
        massaEspecifica: string;
        umidadeOtima: string;
        energiaCompactacao: string;
        ei: string;
        ef: string;
        constanteA: string;
        constanteB: string;
        k1: string;
        k2: string;
    }[];
    observations: string;
};
export declare class StabilizedLayers_Sample {
    _id: string;
    generalData: StabilizedLayersGeneralData;
    step2Data: StabilizedLayersStep2Data;
}
export declare const StabilizedLayers_SampleSchema: import("mongoose").Schema<StabilizedLayers_Sample, import("mongoose").Model<StabilizedLayers_Sample, any, any, any, import("mongoose").Document<unknown, any, StabilizedLayers_Sample> & StabilizedLayers_Sample & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, StabilizedLayers_Sample, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<StabilizedLayers_Sample>> & import("mongoose").FlatRecord<StabilizedLayers_Sample> & Required<{
    _id: string;
}>>;
