import { getOneWorkAction, Types } from "../types/index";
import { Id, rootState } from "../init";
import { ThunkAction } from "redux-thunk";

export const getOneWorkAC =
  (id: Id): ThunkAction<void, rootState, unknown, getOneWorkAction> =>
  async (dispatch) => {

    const response = await fetch(`/api/v1/categories/works/${id}`)
    const {work} = await response.json();
    
    dispatch({
      type: Types.GET_WORK,
      payload: work, // Получаем одну работу
    });
  };
