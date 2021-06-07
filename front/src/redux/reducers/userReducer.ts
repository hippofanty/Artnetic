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
    case Types.SET_FAVOURITE_WORK:
      return {
        ...state,
        favourites: action.payload,
      }
    case Types.ADD_FAVOURITE_WORK:
      return {
        ...state,
        favourites: [...state.favourites, action.payload],
      }
    default:
      return state;
  }
};
