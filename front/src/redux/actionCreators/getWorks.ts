import { getWorksAction, Types } from "../types/index";
import { Category, State } from "../init";
import { ThunkAction } from "redux-thunk";

export const getWorksAC =
  (category: Category): ThunkAction<void, State, unknown, getWorksAction> =>
  async (dispatch) => {

    const response = await fetch(`/api/v1/categories/${category}`)
    const result = await response.json();
    console.log(result, 'result');
    

    dispatch({
      type: Types.GET_CATEGORIES,
      payload: result, //не categories
    });
  };
