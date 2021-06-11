import { intitialStateOrders, OneOrder, OrdersState } from '../init';
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
			};
		case Types.DELETE_ORDERS:
			return {
				...state,
				allOrders: state.allOrders.filter(
					(item) => !action.payload.includes(item._id)
				),
			};
		case Types.CHANGE_STATUS_ORDERS:

			return {
				...state,
				allOrders: state.allOrders.map((order) => {
					if (action.payload.includes(order._id)) {
						return { ...order, status: 'Approved' };
					} else {
						return order;
					}
				}),
			};
		default:
			return state;
	}
};
