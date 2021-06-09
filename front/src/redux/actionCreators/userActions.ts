// action creator
import { ThunkAction } from "redux-thunk";
// import { rootState, Subscriptions } from "../init";
import { rootState } from "../init";
import {
  addFavouriteWork,
  removeFavouriteWork,
  SetApprovedOrders,
  SetAvatarAction,
  setFavouriteWorks,
  // SetSubscriptionsAction,
  SetUserAction,
  Types,
  unsetFavouriteWorks,
  UnsetUserAction,
} from "../types/index";

export const login =
  (
    email: string,
    password: string
  ): ThunkAction<void, rootState, unknown, SetUserAction> =>
  async (dispatch) => {
    const response = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (response.status === 200) {
      const result = await response.json();
      console.log(result.existedUser, "resuuuuuuuuuuuult");

      const {
        id,
        username,
        email,
        role,
        firstname,
        lastname,
        phone,
        about,
        company,
      } = result.existedUser;
      const { token } = result; // либо result.token
      localStorage.setItem("token", token);
      dispatch({
        type: Types.SET_USER,
        payload: {
          id,
          username,
          email,
          role,
          firstname,
          lastname,
          phone,
          about,
          company,
        },
      });
    }
  };

export const signup =
  (
    username: string,
    email: string,
    password: string,
    role: string
  ): ThunkAction<void, rootState, unknown, SetUserAction> =>
  async (dispatch) => {
    const response = await fetch("/api/v1/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        role,
      }),
    });

    if (response.status === 200) {
      const result = await response.json();
      const { id, username, email, role, avatar } = result.newUser;
      const { token } = result; // либо result.token
      localStorage.setItem("token", token);
      dispatch({
        type: Types.SET_USER,
        payload: { id, username, email, role, avatar },
      });
    }
  };

export const logout = (): UnsetUserAction => {
  return {
    type: Types.UNSET_USER,
    payload: {
      id: "",
      email: "",
      username: "",
      role: "",
      avatar: "",
      phone: "",
      firstname: "",
      lastname: "",
      company: "",
      about: "",
    },
  };
};

export const refreshUser = (
  id: string,
  username: string,
  email: string,
  role: string,
  avatar?: string,
  phone?: string,
  firstname?: string,
  lastname?: string,
  company?: string,
  about?: string
): SetUserAction => {
  return {
    type: Types.SET_USER,
    payload: {
      id,
      username,
      email,
      role,
      avatar,
      phone,
      firstname,
      lastname,
      company,
      about,
    },
  };
};

export const addToFavouritesList =
  (id: string): ThunkAction<void, rootState, unknown, addFavouriteWork> =>
  async (dispatch, getState) => {
    const state = getState();
    const response = await fetch(
      `/api/v1/favourites/${state.userState.user.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          workId: id,
        }),
      }
    );

    if (response.status === 200) {
      const { updatedFavourites } = await response.json();

      dispatch({
        type: Types.ADD_FAVOURITE_WORK,
        payload: updatedFavourites,
      });
    }
  };

export const getFavouriteWorksFromBd =
  (userId: string): ThunkAction<void, rootState, unknown, setFavouriteWorks> =>
  async (dispatch, getState) => {
    const state = getState();
    const response = await fetch(`/api/v1/favourites/${userId}`);

    if (response.status === 200) {
      const { myFavourites } = await response.json();

      dispatch({
        type: Types.SET_FAVOURITE_WORK,
        payload: myFavourites,
      });
    }
  };

export const logoutFavouriteWorks = (): unsetFavouriteWorks => {
  return {
    type: Types.UNSET_FAVOURITE_WORK,
    payload: [],
  };
};

export const removeFromFavouriteList =
  (id: string): ThunkAction<void, rootState, unknown, removeFavouriteWork> =>
  async (dispatch, getState) => {
    const state = getState();
    const response = await fetch(
      `/api/v1/favourites/${state.userState.user.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          workId: id,
        }),
      }
    );

    if (response.status === 200) {
      const result = await response.json();

      dispatch({
        type: Types.REMOVE_FAVOURITE_WORK,
        payload: id,
      });
      console.log(
        "🚀 ~ file: userActions.ts ~ line 155 ~ УСПЕШНО УДАЛЕНО",
        result
      );
    }
  };

export const setApprovedOrdersAC =
  (userId: string): ThunkAction<void, rootState, unknown, SetApprovedOrders> =>
  async (dispatch, getState) => {
    if (userId !== "") {
      const response = await fetch(`/api/v1/users/${userId}/orders`);

      if (response.status === 200) {
        const { approvedOrders } = await response.json();
        console.log(
          "🚀 ~ file: userActions.ts ~ line 191 ~ ПРИНИМАЕМ ЗАКАЗЫ",
          approvedOrders
        );

        dispatch({
          type: Types.SET_APPROVED_ORDERS,
          payload: approvedOrders,
        });
      }
    }
  };
export const setAvatarAC =
  (
    userId: string,
    avatar: string | undefined,
  ): ThunkAction<void, rootState, unknown, SetAvatarAction> =>
  async (dispatch) => {
    if (userId !== "") {
      const response = await fetch(`/api/v1/users/edit/avatar/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatar,
        }),
      });
      
      const result = await response.json();
      console.log(result, result.status, 'result, result.status');
      if (result.status === "200") {
        console.log('dispatch');
        console.log('before avatar dispatch', avatar);
        
        dispatch({
          type: Types.SET_AVATAR,
          payload: avatar,
        });
      }
    }
  };
// export const setSubscriptionsAC =
//   (
//     userId: string,
//     // subscriptions: Subscriptions[],
//     // subscriptions: string[],
//     // subscriptions: string[],
//     subscriptions: [],
//   ): ThunkAction<void, rootState, unknown, SetSubscriptionsAction> =>
//   async (dispatch) => {
//     if (userId !== "") {
//       const response = await fetch(`/api/v1/users//subscription/${userId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           subscriptions,
//         }),
//       });
      
//       const result = await response.json();
//       console.log(result, result.status, 'subscriptions result, result.status');
//       if (result.status === "200") {
//         dispatch({
//           type: Types.SET_SUBSCRIPTIONS,
//           payload: subscriptions,
//         });
//       }
//     }
//   };
