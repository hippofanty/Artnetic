import { getWorksAction, Types } from "../types/index";
import { Category, rootState } from "../init";
import { ThunkAction } from "redux-thunk";

export const getWorksAC =
  (category: Category): ThunkAction<void, rootState, unknown, getWorksAction> =>
  async (dispatch) => {

    const response = await fetch(`/api/v1/categories/${category}`)
    const result = await response.json();    

    dispatch({
      type: Types.GET_CATEGORIES,
      payload: result.works, //не categories
    });
  };
