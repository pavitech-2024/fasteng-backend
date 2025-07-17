export declare class PageQueryFilter {
    limit?: number;
    page?: number;
}
export declare class NeedCountQueryFilter extends PageQueryFilter {
    need_count?: boolean;
}
export declare class CommonQueryFilter extends NeedCountQueryFilter {
    show?: any;
    filter?: any;
    sort?: any;
}
