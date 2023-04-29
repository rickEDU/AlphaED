import { createContext } from 'react';
import { IUser } from './interfaces/interface';

// React.Dispatch<React.SetStateAction<IUser|null>>
interface IContext{
    user: IUser|null;
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

const UserContext = createContext<IContext>({user: null, setUser:()=>{}});
export default UserContext;