import { getMyWorksAction, Types } from "../types/index";
import {  rootState } from "../init";
import { ThunkAction } from "redux-thunk";

export const getMyWorksAC =(id: string): ThunkAction<void, rootState, unknown, getMyWorksAction> =>
  async (dispatch) => {

    const response = await fetch(`/api/v1/works/${id}`)
    const result = await response.json();    

    dispatch({
      type: Types.GET_MY_WORKS,
      payload: result.works, 
    });
  };
