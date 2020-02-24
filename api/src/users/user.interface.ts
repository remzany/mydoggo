export interface User{
    _id: string,
    email: string,
    dogOwner: boolean,
    dogName: string,
    dogBreed: string,
    dogBirthDay: string,
    userTodos: Array<string>
}