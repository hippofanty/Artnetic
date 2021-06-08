import { ThunkAction } from "redux-thunk";
import { rootState } from "../init";
import { GetApprovedOrders, Types } from "../types";



export const getAllApprovedOrders =
(): ThunkAction<void, rootState, unknown, GetApprovedOrders> =>
async (dispatch) => {
  const response = await fetch(
    '/api/v1/orders'
  );

  if (response.status === 200) {
    const { allApprovedOrders } = await response.json();
    console.log(
      '🚀 ~ file: userActions.ts ~ line 191 ~ ПРИНИМАЕМ ЗАКАЗЫ',
      allApprovedOrders
    );

    dispatch({
      type: Types.GET_APPROVED_ORDERS,
      payload: allApprovedOrders,
    })
  }
};

