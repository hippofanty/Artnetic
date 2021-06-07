// import { ADD_USER } from "../types";
import { Actions, Types } from "../types/index";
import { initialStateCategories, WorksState } from "../init/index";

export const categoriesReducer = ( state: WorksState = initialStateCategories, action: Actions): WorksState => {
  switch (action.type) {
    case Types.GET_CATEGORIES:
      return {
        ...state,
        works: action.payload
      };
      case Types.DELETE_WORK: 

      const updatedWorks = state.works.filter(works => works._id !== action.payload)
      return {
        ...state,
        works: updatedWorks,
      }
    default:
      return state;
  }
};
