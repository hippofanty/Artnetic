import {
	Box,
	Button,
	IconButton,
	makeStyles,
	Theme,
	Typography,
} from '@material-ui/core';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getOneWorkAC } from '../../redux/actionCreators/getOneWork';
import { rootState } from '../../redux/init';
import { OrderForm } from '../OrderForm';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {
	addToFavouritesList,
	removeFromFavouriteList,
} from '../../redux/actionCreators/userActions';
import { ModalDialog } from '../ModalDialog';

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
	iconButt: {
		opacity: 0.6,
	},
}));

export const Work = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const oneWorkState = useSelector((state: rootState) => state.work.work);
	const [showForm, setShowForm] = useState<boolean>(false);
	const [isLiked, setLike] = useState<boolean>(false);
	const [signupBut, setSignupBut] = useState(false);
	const [loginBut, setLoginBut] = useState(false);
	const [openModal, setModalState] = useState(false);

	const userLoggedIn = useSelector(
		(state: rootState) => state.userState.isAuth
	);

	const getUserFavourites = useSelector(
		(state: rootState) => state.userState.favourites
	);

	const undoLike = () => {
		setLike(false);
		dispatch(removeFromFavouriteList(id));
	};

	const doLike = () => {
		setLike(true);
		addToFavouritesHandler(id);
	};

	const toggleModal = () => {
		setModalState(!openModal);
		setSignupBut(false);
	};

	const isSignupBut = () => setSignupBut(true);

	const addToFavouritesHandler = useCallback(
		(id: string) => {
			dispatch(addToFavouritesList(id));
		},
		[dispatch]
	);

	const { id } = useParams<ParamType>();

	const checkFavouriteHandler = useCallback(() => {
		const isIdExists = getUserFavourites.filter(
			(item) => item._id === oneWorkState._id
		);
		console.log('ПРОВЕРКА АЙДИ ЛАЙКА', isIdExists);
		if (isIdExists.length) {
			setLike(true);
		} else {
			setLike(false);
		}
	}, [getUserFavourites, oneWorkState._id]);

	useEffect(() => {
		dispatch(getOneWorkAC(id));
		checkFavouriteHandler();
	}, [id, dispatch, checkFavouriteHandler]);

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
						<Typography color="textPrimary">
							<h1 className={classes.gridTitle}>{oneWorkState?.title}</h1>
						</Typography>

						{oneWorkState?.width && oneWorkState?.height && (
							<Typography variant="overline" display="block" gutterBottom>
								{oneWorkState?.width} x {oneWorkState?.height}
							</Typography>
						)}

						<Typography variant="h6" gutterBottom>
							Author: {oneWorkState.user?.username}
						</Typography>

						<div className="grid-price">
							<Typography variant="h6" gutterBottom>
								{oneWorkState?.price} RUB
							</Typography>

							{userLoggedIn ? (
								<IconButton
									color="secondary"
									aria-label="delete from fav list"
									className={classes.iconButt}
									onClick={isLiked ? undoLike : doLike}
								>
									{isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
								</IconButton>
							) : (
								<IconButton
									color="secondary"
									aria-label="delete from fav list"
									className={classes.iconButt}
									onClick={() => {
										toggleModal();
										isSignupBut();
									}}
								>
									<FavoriteBorderIcon />
								</IconButton>
							)}
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
						{showForm ? (
							<OrderForm
								setPrice={oneWorkState.price}
								workId={oneWorkState._id}
								setShowForm={setShowForm}
							/>
						) : null}
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
			<ModalDialog
				isOpen={openModal}
				onClose={toggleModal}
				showLogin={loginBut}
				showSignup={signupBut}
			/>
		</div>
	);
};
