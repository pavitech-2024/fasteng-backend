import { Document } from 'mongoose';
export interface IBaseRepository<T> {
    findOne(id: string): Promise<Document<unknown, {}, T> & T & {
        _id: string;
    }>;
    findOneByQuery(query: any): Promise<Document<unknown, {}, T> & T & {
        _id: string;
    }>;
    save(entity: any): Promise<Document<unknown, {}, T> & T & {
        _id: string;
    }>;
    update(id: string, updateData: any): Promise<Document<unknown, {}, T> & T & {
        _id: string;
    }>;
}
