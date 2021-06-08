import { GetOneArtistWorksAction, Types } from "../types/index";
import {  rootState } from "../init";
import { ThunkAction } from "redux-thunk";

export const getOneArtistWorksAC =(id: string): ThunkAction<void, rootState, unknown, GetOneArtistWorksAction> =>
  async (dispatch) => {

    const response = await fetch(`/api/v1/artists/${id}`)
    const result = await response.json();
  
    dispatch({
      type: Types.GET_ONE_ARTIST_WORKS,
      payload: result.works, 
    });
  };
