import {
	Button,
	createStyles,
	Grid,
	makeStyles,
	Paper,
	TextField,
	Theme,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../../redux/actionCreators/userActions';

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
	})
);

export const Login = () => {
	const classes = useStyles();

	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const dispatch = useDispatch();
	const history = useHistory();

	const SubmitHandler = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
		dispatch(login(email, password));
		history.push('/');
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
						<Grid item xs={3}>
							{/* <Paper className={classes.paper}> */}
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
							<Button
                type="submit"
								variant="outlined"
								color="primary"
								className={classes.sumbBut}
							>
								Login
							</Button>
							{/* </Paper> */}
						</Grid>
					</Grid>
				</div>
			</form>
		</Paper>
	);
};
