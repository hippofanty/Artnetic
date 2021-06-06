import { Actions, Types } from "../types/index";
import { initialStateMyWorks, MyWorksState } from "../init/index";

export const myWorksReducer = ( state: MyWorksState = initialStateMyWorks, action: Actions): MyWorksState => {
  switch (action.type) {
    case Types.GET_MY_WORKS:
      return {
        ...state,
        myWorks: action.payload
      };
    default:
      return state;
  }
};
