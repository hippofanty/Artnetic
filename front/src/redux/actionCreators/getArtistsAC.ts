import { getArtistsAction, Types } from "../types/index";
import {  rootState } from "../init";
import { ThunkAction } from "redux-thunk";

export const getArtistsAC =(): ThunkAction<void, rootState, unknown, getArtistsAction> =>
  async (dispatch) => {

    const response = await fetch(`/api/v1/artists/`)
    const result = await response.json();    

    dispatch({
      type: Types.GET_ARTISTS,
      payload: result.artistsArray, 
    });
  };
