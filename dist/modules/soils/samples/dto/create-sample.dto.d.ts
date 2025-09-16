export declare class CreateSampleDto {
    name: string;
    userId: string;
    type: 'inorganicSoil' | 'organicSoil' | 'pavementLayer';
    construction?: string;
    snippet?: string;
    provenance?: string;
    stake?: string;
    layer?: string;
    depth?: number;
    exd?: string;
    collectionDate: string;
    description?: string;
}
