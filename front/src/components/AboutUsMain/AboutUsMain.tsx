import { Button, Container } from '@material-ui/core';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { rootState } from '../../redux/init';
import { OrderForm } from '../OrderForm';

export const AboutUsMain = () => {

	return (
		<Container fixed>
			<div>
				<h1> Main page info about us, our works, news etc</h1>

			</div>
		</Container>
	);
};
