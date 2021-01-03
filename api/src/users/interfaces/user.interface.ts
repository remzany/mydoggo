import { Document } from 'mongoose';

export interface User extends Document {
    readonly username: string;
    readonly first_name: string;
    readonly last_name: string;
    readonly password: string;
    readonly email: string;
    readonly avatar: string;
    readonly bio: string;
    readonly dogName: string;
    readonly dogBreed: string;
    readonly todos: Array<string>;
}