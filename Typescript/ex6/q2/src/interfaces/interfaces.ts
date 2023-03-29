export interface APIResponse<T> {
    data: T,
    error: Array<string>
}
export interface IUserData {
    id: number,
    email: string,
    name: string
}
export interface LoginData {
    id: number
}
export interface IConection{
    text: string,
    values: Array<string>
}
export interface IData{
    name: string,
    email: string,
    password: string
}