// action creator
import { ThunkAction } from 'redux-thunk';
import { rootState } from '../init';
import {
	addFavouriteWork,
	removeFavouriteWork,
	setFavouriteWorks,
	SetUserAction,
	Types,
  unsetFavouriteWorks,
	UnsetUserAction,
} from '../types/index';

export const login =
	(
		email: string,
		password: string
	): ThunkAction<void, rootState, unknown, SetUserAction> =>
	async (dispatch) => {
		const response = await fetch('/api/v1/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		});

		if (response.status === 200) {
			const result = await response.json();
			console.log(result);
			const { id, username, email, role } = result.existedUser;
			const { token } = result; // либо result.token
			localStorage.setItem('token', token);
			dispatch({
				type: Types.SET_USER,
				payload: { id, username, email, role },
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
		const response = await fetch('/api/v1/auth/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
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
			const { id, username, email, role } = result.newUser;
			const { token } = result; // либо result.token
			localStorage.setItem('token', token);
			dispatch({
				type: Types.SET_USER,
				payload: { id, username, email, role },
			});
		}
	};

export const logout = (): UnsetUserAction => {
	return {
		type: Types.UNSET_USER,
		payload: {
			id: '',
			email: '',
			username: '',
			role: '',
		},
	};
};

export const refreshUser = (
	id: string,
	username: string,
	email: string,
	role: string
): SetUserAction => {
	return {
		type: Types.SET_USER,
		payload: { id, username, email, role },
	};
};

export const addToFavouritesList =
	(id: string): ThunkAction<void, rootState, unknown, addFavouriteWork> =>
	async (dispatch, getState) => {
		const state = getState();
		const response = await fetch(
			`/api/v1/favourites/${state.userState.user.id}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
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
		const response = await fetch(
			`/api/v1/favourites/${userId}`
		);

		if (response.status === 200) {
			const { myFavourites } = await response.json();

			dispatch({
				type: Types.SET_FAVOURITE_WORK,
				payload: myFavourites,
			});
		}
	};

export const logoutFavouriteWorks = ():unsetFavouriteWorks => {
  return {
    type: Types.UNSET_FAVOURITE_WORK,
    payload: [],
  }
}

export const removeFromFavouriteList =
	(id: string): ThunkAction<void, rootState, unknown, removeFavouriteWork> =>
	async (dispatch, getState) => {
		const state = getState();
		const response = await fetch(
			`/api/v1/favourites/${state.userState.user.id}`, {
        method: 'DELETE',
        headers: {
					'Content-Type': 'application/json',
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
      console.log("🚀 ~ file: userActions.ts ~ line 155 ~ УСПЕШНО УДАЛЕНО", result)
    }
	};
