import { initialState, State } from '../init';
import { Actions, Types } from '../types';

export const userReducer = (
	state: State = initialState,
	action: Actions
): State => {
  switch (action.type) {
    case Types.SET_USER:
      return {
        ...state,
        user: action.payload,
      }
    default:
      return state;
  }
};
