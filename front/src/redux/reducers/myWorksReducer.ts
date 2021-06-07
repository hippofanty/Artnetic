import { Actions, Types } from "../types/index";
import { initialStateMyWorks, MyWorksState } from "../init/index";

export const myWorksReducer = ( state: MyWorksState = initialStateMyWorks, action: Actions): MyWorksState => {
  switch (action.type) {
    case Types.GET_MY_WORKS:
      return {
        ...state,
        myWorks: action.payload
      };
      case Types.DELETE_WORK: 

      const updatedWorks = state.myWorks.filter(works => works._id !== action.payload)
      return {
        ...state,
        myWorks: updatedWorks,
      }
      case Types.ADD_MY_WORK:
        return {
          ...state,
          myWorks: [...state.myWorks, action.payload]
        }
    default:
      return state;
  }
};
