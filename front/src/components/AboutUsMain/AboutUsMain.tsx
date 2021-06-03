import { Button, Container } from '@material-ui/core';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { rootState } from '../../redux/init';
import { OrderForm } from '../OrderForm';

export const AboutUsMain = () => {
	const [showForm, setShowForm] = useState<boolean>(false);

	const userLoggedIn = useSelector(
		(state: rootState) => state.userState.isAuth
	);

	return (
		<Container fixed>
			<div>
				<h1> Main page info about us, our works, news etc</h1>
				{userLoggedIn ? (
					<Button onClick={() => setShowForm((prev) => !prev)} color="inherit">
						Order Form
					</Button>
				) : null}

				{showForm ? <OrderForm /> : null}
			</div>
		</Container>
	);
};
