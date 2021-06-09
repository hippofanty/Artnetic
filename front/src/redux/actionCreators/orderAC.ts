import { ThunkAction } from 'redux-thunk';
import { rootState } from '../init';
import { getAllOrders, GetApprovedOrders, Types } from '../types';

export const getAllApprovedOrders =
	(): ThunkAction<void, rootState, unknown, GetApprovedOrders> =>
	async (dispatch) => {
		const response = await fetch('/api/v1/orders/approved');

		if (response.status === 200) {
			const { allApprovedOrders } = await response.json();
			console.log(
				'🚀 ~ file: userActions.ts ~ line 191 ~ ПРИНИМАЕМ APPROVED ЗАКАЗЫ',
				allApprovedOrders
			);

			dispatch({
				type: Types.GET_APPROVED_ORDERS,
				payload: allApprovedOrders,
			});
		}
	};

export const getExistedOrders =
	(): ThunkAction<void, rootState, unknown, getAllOrders> =>
	async (dispatch) => {
		const response = await fetch('/api/v1/orders/');

		if (response.status === 200) {
			const { allOrders } = await response.json();
			console.log(
				'🚀 ~ file: orderAC.ts ~ line 33 ~ getAllOrders ~ ПРИНИМАЕМ ВСЕ ЗАКАЗЫ',
				allOrders
			);

			dispatch({
				type: Types.GET_ALL_ORDERS,
				payload: allOrders,
			});
		}
	};
