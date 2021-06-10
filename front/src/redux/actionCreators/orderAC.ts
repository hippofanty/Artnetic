import { ThunkAction } from 'redux-thunk';
import { Id, OneOrder, rootState } from '../init';
import {
	changeStatusOrders,
	deleteOrders,
	getAllOrders,
	GetApprovedOrders,
	Types,
} from '../types';

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
		const response = await fetch('/api/v1/orders');

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

export const deleteExistedOrders =
	(ordersToDelete: Id[]): ThunkAction<void, rootState, unknown, deleteOrders> =>
	async (dispatch) => {
		const response = await fetch('/api/v1/orders', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ ordersToDelete }),
		});
		if (response.status === 200) {
			const result = await response.json();
			console.log('🚀 ~ file: orderAC.ts ~ line 55 ~ ОТВЕТ DELETE', result);

			dispatch({
				type: Types.DELETE_ORDERS,
				payload: ordersToDelete,
			});
		}
	};

export const changeStatusToOrders =
	(
		ordersToUpdate: Id[]
	): ThunkAction<void, rootState, unknown, changeStatusOrders> =>
	async (dispatch) => {
		const response = await fetch('/api/v1/orders', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ ordersToUpdate }),
		});
		if (response.status === 200) {
			const {updatedOrders} = await response.json();
			console.log(
				'🚀 ~ file: orderAC.ts ~ line 74 ~ changeStatusToOrders ~ ОТВЕТ CHANGE STATUS',
				updatedOrders
			);

			dispatch({
				type: Types.CHANGE_STATUS_ORDERS,
				payload: ordersToUpdate,
			});
		}
	};
