
export interface IUser {
    _id?: string;
    username: string;
    password: string;
    items?: string[]
}

export interface IUserInputDTO {
    username: string;
    password: string;
}
