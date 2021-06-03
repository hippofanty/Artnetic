import { Container, CssBaseline } from '@material-ui/core';
import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import Profile from './components/Profile/Profile';
import { refreshUser } from './redux/actionCreators/userActions';

function App() {
	const dispatch = useDispatch();

  const refreshToken = useCallback(async() => {
		try {
			const response = await fetch('/api/v1/auth/auth', {
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			});
			const result = await response.json();
			const { id, username, email, role } = result.existedUser;
			// const { token } = result; // либо result.token
			dispatch(refreshUser(id, username, email, role));
		} catch (e) {
			localStorage.removeItem('token');
		}
	}, [dispatch]);

  useEffect(() => {
    refreshToken();
  }, [refreshToken])

	return (
		<div>
			<Header />

			<React.Fragment>
				<CssBaseline />
				<Container fixed>
					{/* <Typography
						component="div"
						style={{ backgroundColor: '#cfe8fc', height: '100vh' }}
					/> */}
					<Main />
				</Container>
			</React.Fragment>
		</div>
	);
}

export default App;
