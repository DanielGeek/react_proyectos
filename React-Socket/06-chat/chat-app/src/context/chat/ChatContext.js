import React, { createContext, useReducer } from 'react';
import { chatReducer } from './chatReducer';

export const ChatContext = createContext();

const initialState = {
  uid: '', // UID user to send message
  activeChat: null,
  users: [], // All users from bd
  messages: [], // chat selected
}

export const ChatProvider = ({ children }) => {

  const [ chatState, dispatch ] = useReducer(chatReducer, initialState);

  return (
        <ChatContext.Provider value={{
          msg: 'Hola Mundo'
        }}>
          { children }
        </ChatContext.Provider>
      )
}