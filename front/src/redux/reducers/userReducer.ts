import { initialUserState, UserState } from '../init';
import { Actions, Types } from '../types';

export const userReducer = (
	state: UserState = initialUserState,
	action: Actions
): UserState => {
  switch (action.type) {
    case Types.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuth: true,
      }
    case Types.UNSET_USER:
      return {
        ...state,
        user: action.payload,
        isAuth: false,
      }
    default:
      return state;
  }
};
