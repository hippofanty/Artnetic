import {
	Button,
	createStyles,
	FormControlLabel,
	FormGroup,
	Grid,
	makeStyles,
	// Paper,
	Radio,
	RadioGroup,
	TextField,
	Theme,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signup } from '../../redux/actionCreators/userActions';
import { Props } from '../Login/index';

import Paper from '@material-ui/core/Paper';


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
		// form: {
		// 	width: '100ch',
		// },
		sumbBut: {
			marginTop: '25px',
		},
		signupForm: {
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'center',
      justifyContent: 'center',
		},
    formTitle: {
      fontSize: '22px',
    }
	})
);

export const Signup = ({setModal}: Props) => {
	const classes = useStyles();

	const [username, setUsername] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [role, setRole] = useState('');


	const dispatch = useDispatch();
	const history = useHistory();

	const SubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(signup(username, email, password, role));
    setModal();
		history.push('/');
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRole((event.target as HTMLInputElement).value);
	};

	return (
		<Paper className={classes.paper}>
			<form  onSubmit={(e) => SubmitHandler(e)}>
				<div className={classes.root}>
					<Grid
						container
						spacing={3}
						direction="column"
						justify="center"
						alignItems="center"
					> 
            <Grid item xs={12}><span className={classes.formTitle}>Please, register your account!</span></Grid>
						<Grid item xs={12} className={classes.signupForm}>
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
								<RadioGroup
									aria-label="userRole"
									name="userRole"
									value={role}
									onChange={handleChange}
								>
									<FormControlLabel
										value="Artist"
										control={<Radio />}
										label="Artist"
									/>
									<FormControlLabel
										value="Customer"
										control={<Radio />}
										label="Customer"
									/>
								</RadioGroup>
							</FormGroup>

							<Button
								type="submit"
								variant="outlined"
								color="primary"
								className={classes.sumbBut}
							>
								Register
							</Button>
						</Grid>
					</Grid>
				</div>
			</form>
		</Paper>
	);
};
