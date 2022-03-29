import { useEffect, useReducer } from "react";
import { getUserLocation } from "../../helpers";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./PlacesReducer";
import { searchApi } from "../../apis";

export interface PlacesState {
  isLoading: boolean;
  userLocation?: [ number, number ],
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined
}

interface Props {
  children: JSX.Element | JSX.Element[]
}


export const PlacesProvider = ({ children }: Props) => {

  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

  useEffect(() => {
    getUserLocation()
        .then( lngLat => dispatch({ type: 'setUserLocation', payload: lngLat }) )
  }, []);

  const searchPlacesByTerm = async( query: string ) => {
    if ( query.length === 0 ) return []; //TODO: clear state
    if ( !state.userLocation ) throw new Error('The ubication not existe');

    const resp = await searchApi.get(`/${ query }.json`, {
      params: {
        proximity: state.userLocation.join(',')
      }
    });

    console.log(resp.data);

    return resp.data;
  }

  return (
    <PlacesContext.Provider value={{
      ...state,

      // Methods
      searchPlacesByTerm
    }}>
      { children }
    </PlacesContext.Provider>
  )
}
