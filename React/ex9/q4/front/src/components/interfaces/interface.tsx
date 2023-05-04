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

export interface IEasyModal{
    error:string;
}

export interface IProps{
    error: string;
    close: (event:React.MouseEvent<HTMLDivElement>) => void;
}

export interface IContext{
    user: IUser|null;
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}


export interface IFormProps {
    onSubmit: (event: React.FormEvent<HTMLFormElement>, body: IApiRequest) => void;
    id?: string|number;
    erase: boolean;
}