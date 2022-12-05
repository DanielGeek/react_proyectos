import { FC, useReducer } from 'react';
import { AuthContext, authReducer } from './';
import Cookies from 'js-cookie';

import { tesloApi } from '../../api';
import { IUser } from '../../interfaces';

interface Props {
    children?: React.ReactNode;
}
export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined
}

export const AuthProvider:FC<Props> = ({ children }) => {

 const [state, dispatch] = useReducer( authReducer, AUTH_INITIAL_STATE );

 const loginUser = async( email: string, password: string ): Promise<boolean> => {

    try {
      const { data } = await tesloApi.post('/user/login', { email, password });
      const { token, user } = data;
      Cookies.set('token', token );
      dispatch({ type: '[Auth] - Login', payload: user });
      return true;
    } catch (error) {
        return false;
    }
 }

 return (
   <AuthContext.Provider value={{
       ...state,

       // Methods
       loginUser
   }}>
     { children }
   </AuthContext.Provider>
 )
}