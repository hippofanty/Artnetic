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
    case Types.REMOVE_FAVOURITE_WORK:
      const updatedWorks = state.favourites.filter(work => work._id !== action.payload)
      return {
        ...state,
        favourites: updatedWorks,
      }
    case Types.UNSET_FAVOURITE_WORK:
      return {
        ...state,
        favourites: action.payload,
      }
    case Types.SET_APPROVED_ORDERS:
      return {
        ...state,
        approvedOrders: action.payload,
      }
    case Types.GET_APPROVED_ORDERS:
      return {
        ...state,
        
      }
    default:
      return state;
  }
};
