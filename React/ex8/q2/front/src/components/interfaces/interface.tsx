export interface IApiRequest{
    id?: string| number;
    name?:string;
    email: string;
    password: string;
}

export interface IApiResponse {
    message: string;
    data: IUser|null;
    error: string[]|null[];
}
export interface IUser {
    id: number|string;
    email: string;
}