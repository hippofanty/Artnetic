import { Actions, Types } from "../types/index";
import { initialStateWork, OneWorkState } from "../init/index";

export const workReducer = ( state: OneWorkState = initialStateWork, action: Actions): OneWorkState => {
  switch (action.type) {
    case Types.GET_WORK:      
      
      return {
        work: action.payload
      };
    default:
      return state;
  }
};
