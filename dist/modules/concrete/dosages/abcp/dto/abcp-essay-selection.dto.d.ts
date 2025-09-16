type AggregateData = {
    id: string;
    type: string;
};
type CementData = {
    id: string;
    type: string;
};
export declare class ABCPEssaySelectionDto {
    coarseAggregate: AggregateData;
    fineAggregate: AggregateData;
    cement: CementData;
}
export {};
