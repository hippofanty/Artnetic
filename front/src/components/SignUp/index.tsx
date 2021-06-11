import { Form } from 'react-final-form';
import { Select, TextField } from 'mui-rff';
import {
	Paper,
	Grid,
	Button,
	CssBaseline,
	GridSize,
	makeStyles,
	Theme,
	MenuItem,
} from '@material-ui/core';

import { ReactNode, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { signup } from '../../redux/actionCreators/userActions';
import * as yup from 'yup';
import { setIn } from 'final-form';

export interface Props {
	setModal: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
	sendButt: {
		color: 'white',
		backgroundColor: 'black',
	},
	datePick: {
		margin: 0,
	},
	dateInput: {
		width: 'inherit',
		height: '30px',
	},
	formTitle: {
		fontSize: '22px',
	},
	formWrapper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
}));

export const SignupForm = ({ setModal }: Props) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();

	const sleep = (ms: number) =>
		new Promise((resolve) => setTimeout(resolve, ms));

	interface FormType {
		username: string;
		email: string;
		password: string;
		role: string;
	}

	interface validType {
		username: string;
		email: string;
		password: string;
		role: string;
	}

	interface CustomField {
		size: GridSize;
		field: ReactNode;
	}

	const sendForm = useCallback(
		async (values: FormType) => {
			await sleep(500);
			console.log(
				'ЖМУ РЕГИСТРАЦИЮ!',
				values.username,
				values.email,
				values.password,
				values.role
			);
			dispatch(
				signup(values.username, values.email, values.password, values.role)
			);
			setModal();
			history.push('/');
		},
		[dispatch, history, setModal]
	);

	const validationSchema = yup.object({
		email: yup.string().email().required(),
		username: yup.string().required(),
		password: yup.string().min(4).required(),
		role: yup.string().required(),
	});

	const validateFormValues = (schema: any) => async (values: validType) => {
		if (typeof schema === 'function') {
			schema = schema();
		}
		try {
			await schema.validate(values, { abortEarly: false });
		} catch (err) {
			const errors = err.inner.reduce((formError: any, innerError: any) => {
				return setIn(formError, innerError.path, innerError.message);
			}, {});

			return errors;
		}
	};

	const validate = validateFormValues(validationSchema);

	const formFields: CustomField[] = [
		{
			size: 12,
			field: (
				<TextField
					type="text"
					label="Username"
					name="username"
					margin="none"
					required={true}
				/>
			),
		},
		{
			size: 12,
			field: (
				<TextField
					type="email"
					label="Email"
					name="email"
					margin="none"
					required={true}
				/>
			),
		},
		{
			size: 12,
			field: (
				<TextField
					type="password"
					label="Password"
					name="password"
					margin="none"
					required={true}
				/>
			),
		},
		{
			size: 12,
			field: (
				<Select
					name="role"
					label="What's your need"
					formControlProps={{ margin: 'none' }}
				>
					<MenuItem value="Artist">Artist</MenuItem>
					<MenuItem value="Customer">Customer</MenuItem>
				</Select>
			),
		},
	];

	return (
		<div style={{ padding: 16, margin: 'auto', maxWidth: 480 }}>
			<CssBaseline />
			<Form<FormType>
				onSubmit={sendForm}
				validate={validate}
				render={({ handleSubmit, form, submitting, pristine, values }) => (
					<form onSubmit={handleSubmit} noValidate>
						<div className={classes.formWrapper}>
							<span className={classes.formTitle}>Welcome to Artnetic</span>
							<Paper style={{ padding: 16 }}>
								<Grid
									container
									alignItems="flex-start"
									justify="center"
									spacing={2}
								>
									{formFields.map((item, idx) => (
										<Grid item xs={item.size} key={idx}>
											{item.field}
										</Grid>
									))}
									<Grid
										item
										xs={12}
										style={{ marginTop: 16, display: 'flex' }}
										justify="center"
									>
										<Button
											variant="contained"
											type="submit"
											className={classes.sendButt}
											disabled={submitting}
										>
											Send
										</Button>
									</Grid>
								</Grid>
							</Paper>
						</div>
					</form>
				)}
			/>
		</div>
	);
};
