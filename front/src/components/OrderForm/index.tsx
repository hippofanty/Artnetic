import { Form } from 'react-final-form';
import { TextField, Radios, Select, TimePicker } from 'mui-rff';
import {
	Typography,
	Paper,
	Link,
	Grid,
	Button,
	CssBaseline,
	MenuItem,
	GridSize,
	makeStyles,
	Theme,
} from '@material-ui/core';

import DateFnsUtils from '@date-io/date-fns';
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from '../../redux/init';
import cryptoRandomString from 'crypto-random-string';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import 'moment/min/locales.min';
import subDays from 'date-fns/subDays';
import { getAllApprovedOrders } from '../../redux/actionCreators/orderAC';

interface OrderProps {
	setPrice: number;
	workId: string;
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
}));

export const OrderForm = ({ setPrice, workId }: OrderProps) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [startDate, setStartDate] = useState<Date | null>(new Date());

	const user = useSelector((state: rootState) => state.userState.user);

	const getUserEmail = useSelector(
		(state: rootState) => state.userState.user.email
	);

	const allApprovedOrders = useSelector(
		(state: rootState) => state.ordersState.allApprovedOrders
	);

	interface FormType {
		notes?: string;
		city: string;
		date?: string;
	}

	interface CustomField {
		size: GridSize;
		field: ReactNode;
	}

	// GET RESERVED DATE ARRAY
	const excludedDates = useMemo(() => {
		const getExactWorkOrders = allApprovedOrders.filter(
			(item) => item.work?._id === workId
		);
		const getDates = getExactWorkOrders.map((item) => item.date);
		const slicedTime = getDates.map((item) => new Date(item.slice(0, 10)));
    return slicedTime;
	}, [allApprovedOrders, workId]);

	useEffect(() => {
		dispatch(getAllApprovedOrders());
	}, [dispatch]);

	const sendForm = useCallback(
		async (values: FormType) => {
			try {
				const response = await fetch('/api/v1/orders/new', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						vendorCode: cryptoRandomString({ length: 10, type: 'base64' }),
						notes: values.notes,
						city: values.city,
						// date: values.date,
						date: startDate,
						user: user.id,
						work: workId,
					}),
				});
				if (response.status === 200) {
					const result = await response.json();
					console.log(
						'🚀 ~ file: index.tsx ~ line 82 ~ sendForm ~ ОТВЕТ НА ЗАКАЗ',
						result
					);
				}
			} catch (e) {
				console.log(e);
			}
		},
		[startDate, user.id, workId]
	);

	// const validate = (values: FormType) => {
	// 	const errors: FormType = {};
	// 	if (!values.firstName) {
	// 		errors.firstName = 'Required';
	// 	}
	// 	if (!values.lastName) {
	// 		errors.lastName = 'Required';
	// 	}
	// 	if (!values.email) {
	// 		errors.email = 'Required';
	// 	}
	// 	return errors;
	// };

	const formFields: CustomField[] = [
		{
			size: 12,
			field: (
				<TextField
					type="text"
					label="Ваше имя"
					name="firstName"
					value={user.username}
					margin="none"
					// required={true}
					disabled
				/>
			),
		},
		{
			size: 12,
			field: (
				<TextField
					type="email"
					label="Электронная почта"
					name="email"
					value={getUserEmail}
					margin="none"
					// required={true}
					disabled
				/>
			),
		},
		{
			size: 12,
			field: <TextField name="notes" multiline label="Notes" margin="none" />,
		},
		{
			size: 12,
			field: (
				<Select
					name="city"
					label="Select a City"
					formControlProps={{ margin: 'none' }}
				>
					<MenuItem value="Moscow">Moscow</MenuItem>
					<MenuItem value="Saint-Petersburg">Saint-Petersburg</MenuItem>
				</Select>
			),
		},
		{
			size: 12,
			field: (
				<DatePicker
					className={classes.dateInput}
					name="date"
					dateFormat="dd/MM/yyyy"
					selected={startDate}
					onChange={(date: Date | null) => setStartDate(date)}
					withPortal
					isClearable={true}
					minDate={new Date()}
					excludeDates={excludedDates}
				/>
			),
		},
	];

	return (
		<div style={{ padding: 16, margin: 'auto', maxWidth: 480 }}>
			<CssBaseline />
			{/* <button onClick={() => console.log('FILTERED ORDERS ===', getExactWorkOrders)}>
				MOMENT
			</button> */}
			<Form<FormType>
				onSubmit={sendForm}
				// validate={validate}
				render={({ handleSubmit, form, submitting, pristine, values }) => (
					<form onSubmit={handleSubmit} noValidate>
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
								{/* <Grid item xs={12} style={{ marginTop: 16, textAlign: 'center'}}><span>Цена: {setPrice} руб</span></Grid> */}
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
					</form>
				)}
			/>
		</div>
	);
};
