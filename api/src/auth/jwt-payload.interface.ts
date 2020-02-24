export interface JwtPayload {
    email: string;
    dogOwner?: boolean;
    _id?: string;
    dogName?: string;
    dogBreed?: string;
    userTodos?: Array<string>;
}