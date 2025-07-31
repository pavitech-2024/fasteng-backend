declare class PreferencesDto {
    language: string;
    decimal: number;
}
export declare class UpdateUserDto {
    _id?: string;
    lastLoginList?: Date[];
    photo?: string | null;
    connections?: number;
    preferences?: PreferencesDto;
    name?: string;
    email?: string;
    phone?: string;
    dob?: Date | null;
    __v?: number;
}
export {};
