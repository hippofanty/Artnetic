// import { ADD_USER } from "../types";
import { Actions, Types } from "../types/index";
import { initialStateCategories, Work } from "../init/index";

export const categoriesReducer = ( state: Work[] = [], action: Actions): Work[] => {
  switch (action.type) {
    case Types.GET_CATEGORIES:
      return action.payload;
    default:
      return state;
  }
};
