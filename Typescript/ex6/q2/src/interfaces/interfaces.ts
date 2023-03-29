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