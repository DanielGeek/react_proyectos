import React, { createContext, useCallback, useContext, useState } from "react";
import { fetchWithOutToken, fetchWithToken } from '../helpers/fetch';
import { ChatContext } from './../context/chat/ChatContext';
import { types } from './../types/types';

export const AuthContext = createContext();

const initialState = {
    uid: null,
    checking: true,
    logged: false,
    name: null,
    email: null,
};

export const AuthProvider = ({ children }) => {

  const [ auth, setAuth ] = useState(initialState);
  const { dispatch } = useContext( ChatContext );

  const login = async ( email, password ) => {

    const resp = await fetchWithOutToken('login', { email, password }, 'POST');

    if( resp.ok ) {
      localStorage.setItem('token', resp.token );
      const { user } = resp;

      setAuth({
        uid: user.uid,
        checking: false,
        logged: true,
        name: user.name,
        email: user.email,
      });

    }

    return resp.ok;

  }

  const register = async(name, email, password) => {

    const resp = await fetchWithOutToken('login/new', { name, email, password }, 'POST');

    if( resp.ok ) {
      localStorage.setItem('token', resp.token );
      const { user } = resp;

      setAuth({
        uid: user.uid,
        checking: false,
        logged: true,
        name: user.name,
        email: user.email,
      });

      return true;
    }

    return resp.msg;

  }

  const verifyToken = useCallback( async() => {
    const token = localStorage.getItem('token');

    if( !token ) {
      setAuth({
          uid: null,
          checking: false,
          logged: false,
          name: null,
          email: null,
      })

      return false
    }

    const resp = await fetchWithToken('login/renew');
    if( resp.ok ) {
      localStorage.setItem('token', resp.token );
      const { user } = resp;

      setAuth({
        uid: user.uid,
        checking: false,
        logged: true,
        name: user.name,
        email: user.email,
      });

      return true;
    } else {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });

      return false;
    }

  }, [])

  const logout = () => {
      localStorage.removeItem('token');

      dispatch({ type: types.closedSession});

      setAuth({
        checking: false,
        logged: false,
      });
  };

  return (
    <AuthContext.Provider value={{
        auth,
        login,
        register,
        verifyToken,
        logout,
    }}>
      { children }
    </AuthContext.Provider>
  )
}