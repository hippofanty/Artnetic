import {
	Button,
	Checkbox,
	createStyles,
	FormControlLabel,
	FormGroup,
	Grid,
	makeStyles,
	Paper,
	TextField,
	Theme,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signup } from '../../redux/actionCreators/userActions';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		paper: {
			padding: theme.spacing(6),
			textAlign: 'center',
			color: theme.palette.text.secondary,
		},
		form: {
			width: '100ch',
		},
		sumbBut: {
			marginTop: '25px',
		},
		signupForm: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'stretch',
		},
	})
);

export const Signup = () => {
	const classes = useStyles();

	const [username, setUsername] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [checked, setChecked] = useState({
		astist: false,
		customer: false,
	});
	console.log(username, email, password);

	const dispatch = useDispatch();
	const history = useHistory();

	const SubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		console.log('IS WORKED');
		e.preventDefault();
		dispatch(signup(username, email, password));
		history.push('/');
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked({ ...checked, [event.target.name]: event.target.checked });
	};

	return (
		<Paper className={classes.paper}>
			<form className={classes.form} onSubmit={(e) => SubmitHandler(e)}>
				<div className={classes.root}>
					<Grid
						container
						spacing={3}
						direction="column"
						justify="center"
						alignItems="center"
					>
						<Grid item xs={6} className="signupForm">
							<TextField
								id="standard-basic"
								type="text"
								label="Username"
								value={username}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setUsername(e.target.value)
								}
							/>
							<TextField
								id="standard-basic"
								type="mail"
								label="Email"
								value={email}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setEmail(e.target.value)
								}
							/>
							<TextField
								id="standard-basic"
								type="password"
								label="Password"
								value={password}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setPassword(e.target.value)
								}
							/>

							<FormGroup row>
								<FormControlLabel
									control={
										<Checkbox
											checked={checked.astist}
											onChange={handleChange}
											name="astist"
										/>
									}
									label="Я артист"
								/>
								<FormControlLabel
									control={
										<Checkbox
											checked={checked.customer}
											onChange={handleChange}
											name="customer"
										/>
									}
									label="Я заказчик"
								/>
							</FormGroup>

							<Button
								type="submit"
								variant="outlined"
								color="primary"
								className={classes.sumbBut}
							>
								Login
							</Button>
						</Grid>
					</Grid>
				</div>
			</form>
		</Paper>
	);
};
