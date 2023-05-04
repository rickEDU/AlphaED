import { createContext } from 'react';
import { IContext } from './interfaces/interface';


const UserContext = createContext<IContext>({user: null, setUser:()=>{}});
export default UserContext;