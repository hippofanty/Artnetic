import { intitialStateOrders, OrdersState } from '../init';
import { Actions, Types } from '../types';

export const ordersReducer = (
	state: OrdersState = intitialStateOrders,
	action: Actions
): OrdersState => {
	switch (action.type) {
		case Types.GET_APPROVED_ORDERS:
			return {
				...state,
				allApprovedOrders: action.payload,
			};
    case Types.GET_ALL_ORDERS:
      return {
        ...state,
        allOrders: action.payload,
      }
		default:
			return state;
	}
};
