import { deleteWorkAction, Types } from "../types/index";
import { rootState } from "../init";
import { ThunkAction } from "redux-thunk";

export const deleteWorkAC =
  (id: string, getUserID: string): ThunkAction<void, rootState, unknown, deleteWorkAction> =>
  async (dispatch) => {
    const response = await fetch(`/api/v1/works/${id}/${getUserID}`, {
      method: "DELETE",
    });
    const result = await response.json();
    console.log(result.status, "result delete");

    if (result.status === "removed") {
      dispatch({
        type: Types.DELETE_WORK,
        payload: id,
      });
    }
  };
