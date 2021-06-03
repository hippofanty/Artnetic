// action creator
import { ThunkAction } from 'redux-thunk';
import { rootState } from '../init';
import { SetUserAction, Types, UnsetUserAction } from '../types/index';

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
      const { id, username, email } = result.existedUser;
      const { token } = result; // либо result.token
			localStorage.setItem('token', token);
			dispatch({
				type: Types.SET_USER,
				payload: { id, username, email },
			});
		}
	};


export const signup =
( 
  username: string,
  email: string,
  password: string,
  // role: string,
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
      // role,
    }),
  });

  if (response.status === 200) {
    const result = await response.json();
    const { id, username, email } = result.newUser;
    const { token } = result; // либо result.token
    localStorage.setItem('token', token);
    dispatch({
      type: Types.SET_USER,
      payload: { id, username, email },
    });
  }
};

export const logout = () : UnsetUserAction => {
  return {
    type: Types.UNSET_USER,
    payload: {
      id: '',
      email: '',
      username: '',
    }
  }
}

export const refreshUser = ( id: string, username: string, email:string ) : SetUserAction => {
  return {
    type: Types.SET_USER,
    payload: { id, username, email },
  }
}
