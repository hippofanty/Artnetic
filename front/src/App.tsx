import { CssBaseline } from '@material-ui/core';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { getFavouriteWorksFromBd, refreshUser } from './redux/actionCreators/userActions';
import { rootState } from './redux/init';

function App() {
	const dispatch = useDispatch();

  const userId = useSelector((state: rootState) => state.userState.user?.id)

  const refreshToken = useCallback(async() => {
		try {
			const response = await fetch('/api/v1/auth/auth', {
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			});
			const result = await response.json();
			const { id, username, email, role, avatar, phone, firstname, lastname, company, about, subscriptions  } = result.existedUser;

			dispatch(refreshUser(id, username, email, role, avatar, phone, firstname, lastname, company, about, subscriptions  ));

			// dispatch(refreshUser(result.existedUser));
      dispatch(getFavouriteWorksFromBd(userId));
		} catch (e) {
			localStorage.removeItem('token');
		}
	}, [dispatch, userId]);

  useEffect(() => {
    refreshToken();
  }, [refreshToken])

	return (
		<div className="container__main">
			<Header />

			<React.Fragment>
				<CssBaseline />
				{/* <Container fixed> */}
					{/* <Typography
						component="div"
						style={{ backgroundColor: '#cfe8fc', height: '100vh' }}
					/> */}
					<Main />
				{/* </Container> */}
			</React.Fragment>
		</div>
	);
}

export default App;

