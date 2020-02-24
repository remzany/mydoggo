export class CreateUserDto {
    readonly email: string;
    readonly password: string;
    readonly dogOwner: boolean;
    readonly dogName: string;
    readonly dogBreed: string;
    readonly dogBirthDay: string;
    readonly userTodos: Array<string>;
}

export class UpdateUserDto {
    uid: string;
    dogOwner?: string;
    dogName?: string;
    dogBreed?: string;
    dogBirthDay?: string;
}

export class UpdateTOdo{
    uid: string;
    userTodos?: Array<string>;
}