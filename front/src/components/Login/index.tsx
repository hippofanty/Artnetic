import {
	Button,
	createStyles,
	Grid,
	makeStyles,
	Paper,
	TextField,
	Theme,
} from '@material-ui/core';
import React, {  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getFavouriteWorksFromBd, login } from '../../redux/actionCreators/userActions';
import { rootState } from '../../redux/init';

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
    formTitle: {
      fontSize: '22px',
      
    }
	})
);

export interface Props {
  setModal: () => void,
}

export const Login = ({setModal}:Props) => {
	const classes = useStyles();

	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

  const userId = useSelector((state: rootState) => state.userState.user?.id);
	const dispatch = useDispatch();
	const history = useHistory();

	const SubmitHandler = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
		dispatch(login(email, password));
    dispatch(getFavouriteWorksFromBd(userId));
    setModal();
		history.push('/');
	};

	return (
		<Paper className={classes.paper}>
			{/* <form className={classes.form} onSubmit={(e) => SubmitHandler(e)}> */}
      <form onSubmit={(e) => SubmitHandler(e)}>
				<div className={classes.root}>
					<Grid
						container
						spacing={3}
						direction="column"
						justify="center"
						alignItems="center"
					>
            <Grid item xs={12}><span className={classes.formTitle}>Please, log in to your account!</span></Grid>
						<Grid item xs={6}>
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
