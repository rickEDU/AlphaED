export interface APIResponse<T> {
    data: T,
    error: Array<string>
}
export interface IDataAPI {
    id: number | string,
    email: string,
    name: string
}
export interface IResponseLogin {
    id: number
}
export interface IConection{
    text: string,
    values: Array<string|number>
}
export interface IData{
    name: string,
    email: string,
    password?: string
}
export interface IDataLogin{
    id:string|number,
    email: string,
    password: string
}