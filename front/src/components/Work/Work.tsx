import {
	Box,
	Button,
	Container,
	IconButton,
	makeStyles,
	Theme,
	Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getOneWorkAC } from '../../redux/actionCreators/getOneWork';
// import { OneWorkState } from '../../redux/init';
import { rootState } from '../../redux/init';
import { OrderForm } from '../OrderForm';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { addToFavouritesList } from '../../redux/actionCreators/userActions';

interface ParamType {
	id: string;
}

const useStyles = makeStyles((theme: Theme) => ({
	imageContainer: {
		display: 'flex',
		justifyContent: 'space-around',
	},

	image: {
		maxWidth: 440,
		maxHeight: 440,
		objectFit: 'contain',
		margin: 'auto',
		// marginTop: 10,
		// marginBottom: 10,
		// marginRight: 'auto',
		// marginLeft: 'auto',
	},
	gridTitle: {
		fontSize: 26,
		marginTop: 20,
		overflowWrap: 'break-word',
	},
	flexButt: {
		display: 'flex',
		justifyContent: 'center',
	},
	availButt: {
		margin: '20px 0 10px',
	},
}));

export const Work = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const oneWorkState = useSelector((state: rootState) => state.work.work);
	const [showForm, setShowForm] = useState<boolean>(false);

	const userLoggedIn = useSelector(
		(state: rootState) => state.userState.isAuth
	);

	const getUserId = useSelector((state: rootState) => state.userState.user?.id);

	const addToFavouritesHandler = (id: string, userId: string) => {
		dispatch(addToFavouritesList(id, userId));
	};

	const { id } = useParams<ParamType>();
	useEffect(() => {
		dispatch(getOneWorkAC(id));
	}, [id, dispatch]);

	return (
		<div style={{ width: '100%', padding: '75px 0' }}>
			<Box display="flex" justifyContent="center">
				<div className="item-grid">
					<div className="image-grid">
						<img
							className={classes.image}
							src={oneWorkState?.image}
							alt="Иллюстрация работы"
						/>
					</div>
					<div className="right-col-grid">
						{/* <Typography color="textSecondary" align="center" component="p">
							Категория работы:
							<Link to={`/categories/${oneWorkState.category.name}`}>
								{oneWorkState.category.name}
							</Link>
						</Typography> */}

						<Typography color="textPrimary">
							<h1 className={classes.gridTitle}>{oneWorkState?.title}</h1>
						</Typography>

            <Typography variant="h6" gutterBottom>
							Author: {oneWorkState?.user?.username}
						</Typography>
						{/* <Typography color="primary" component="h3" paragraph={true}>
							{oneWorkState.user.username}
						</Typography> */}

						<div className="grid-price">
							<Typography variant="h6" gutterBottom>
								{oneWorkState?.price} RUB
							</Typography>
							<IconButton
								color="secondary"
								aria-label="add an alarm"
								onClick={() =>
									addToFavouritesHandler(oneWorkState?._id, getUserId)
								}
							>
								<FavoriteBorderIcon />
							</IconButton>
						</div>

						<div className={classes.flexButt}>
							{userLoggedIn ? (
								<Button
									onClick={() => setShowForm((prev) => !prev)}
									color="inherit"
									variant="outlined"
									className={classes.availButt}
								>
									Check Availability
								</Button>
							) : null}
						</div>
						{showForm ? <OrderForm setPrice={oneWorkState?.price} /> : null}

						{/* <Typography variant="h6" gutterBottom>
							Описание работы
						</Typography>
						<Typography component="p" paragraph={true}>
							{oneWorkState.description}
						</Typography> */}

					</div>

					<div className="grid-context">
						<Typography variant="h6" gutterBottom>
							Описание работы
						</Typography>
						<Typography component="p" paragraph={true}>
							{oneWorkState?.description}
						</Typography>
					</div>
				</div>
			</Box>
		</div>
	);
};
