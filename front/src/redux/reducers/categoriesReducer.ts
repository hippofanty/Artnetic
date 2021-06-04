// import { ADD_USER } from "../types";
import { Actions, Types } from "../types/index";
import { initialStateCategories, Work, WorksState } from "../init/index";

export const categoriesReducer = ( state: WorksState = initialStateCategories, action: Actions): WorksState => {
  switch (action.type) {
    case Types.GET_CATEGORIES:
      return {
        ...state,
        works: action.payload
      };
    default:
      return state;
  }
};
