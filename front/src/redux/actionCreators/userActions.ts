// action creator
import { ThunkAction } from 'redux-thunk';
import { State } from '../init';
import { SetUserAction, Types } from '../types/index';

export const login =
	(
		email: string,
		password: string
	): ThunkAction<void, State, unknown, SetUserAction> =>
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
			// const { id, username, email, token } = await response.json();
      const result = await response.json();
      const { id, username, email } = result.existedUser;
      const { token } = result; // либо result.token
			localStorage.setItem('token', token);
			dispatch({
				type: Types.SET_USER,
				payload: { id, username, email, token },
			});
		}
	};


export const signup =
( 
  username: string,
  email: string,
  password: string,
  // role: string,
): ThunkAction<void, State, unknown, SetUserAction> =>
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
    // const { id, username, email, token } = await response.json();
    const result = await response.json();
    const { id, username, email } = result.newUser;
    const { token } = result; // либо result.token
    localStorage.setItem('token', token);
    dispatch({
      type: Types.SET_USER,
      payload: { id, username, email, token },
    });
  }
};
