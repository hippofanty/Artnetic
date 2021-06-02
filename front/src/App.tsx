import { Container, CssBaseline } from '@material-ui/core';
import React from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import { Main } from './components/Main';

function App() {
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
