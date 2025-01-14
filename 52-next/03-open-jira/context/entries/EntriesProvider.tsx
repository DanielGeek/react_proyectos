import React, { useEffect, useReducer } from 'react';

import { useSnackbar } from 'notistack';

import { entriesApi } from '../../apis';
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';

interface Props {
    children?: React.ReactNode;
}
export interface EntriesState {
    entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: [],
}

export const EntriesProvider:React.FC<Props> = ({ children }) => {

 const [state, dispatch] = useReducer( entriesReducer, ENTRIES_INITIAL_STATE);
 const { enqueueSnackbar } = useSnackbar();

 const addNewEntry = async( description: string ) => {

  const { data } = await entriesApi.post<Entry>('/entries', { description });
  dispatch({ type: '[Entry] Add-Entry', payload: data });

 }

 const updateEntry = async( { _id, description, status }: Entry, showSnackbar = false ) => {

  try {
    const { data } = await entriesApi.put<Entry>(`/entries/${ _id }`, { description, status });
    dispatch({ type: '[Entry] Entry-Updated', payload: data });

    if ( showSnackbar )
        enqueueSnackbar('Updated entry', {
          variant: 'success',
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }
        })

  } catch (error) {
    console.log({ error });
  }

 }

 const refreshEntries = async() => {
    const { data } = await entriesApi.get<Entry[]>('/entries');
    dispatch({ type: '[Entry] Refresh-Data', payload: data });
 }

 useEffect(() => {
  refreshEntries();
 }, [])


 return (
   <EntriesContext.Provider value={{
     ...state,

     // Methos
     addNewEntry,
     updateEntry,
   }}>
     { children }
   </EntriesContext.Provider>
 )
}