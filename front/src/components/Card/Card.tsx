import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import { Link, useLocation } from 'react-router-dom';
import { deleteWorkAC } from '../../redux/actionCreators/deleteWorkAC';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from '../../redux/init';
import { Button } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

//dialog
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from 'styled-components';
import {
	addToFavouritesList,
	removeFromFavouriteList,
} from '../../redux/actionCreators/userActions';
import { ModalDialog } from '../ModalDialog';

const CardImgWrapper = styled.div`
	&:hover {
		background-color: #dad9d7;
	}
`;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: 249,
			height: 337,
			textDecoration: 'none',
		},
		link: {
			textDecoration: 'none',
			color: 'black',
			height: '100%',
			cursor: 'zoom-in',
			// display: 'block', // только с линком на всю карточку
		},
		cardTitle: {
			display: 'flex',
			justifyContent: 'space-between',
			flexDirection: 'column',
			marginTop: '10px',
			alignItems: 'center',
		},
		titlePadd: {
			padding: '0 12px',
			opacity: 0.6,
			position: 'absolute',
			bottom: '45px',
			left: '100px',
			zIndex: 99,
		},
		buttonsDeleteEdit: {
			position: 'absolute',
			top: '26%',
			left: '83px',
			zIndex: 10,
		},
		delete_edit: {},
		textCenter: {
			fontFamily: `'Josefin Sans', sans-serif`,
			fontSize: '15px',
			textAlign: 'center',
			whiteSpace: 'nowrap',
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			color: '#484848',
			width: '100%',
		},
	})
);

export interface CardProps {
	id: string;
	category: {
		name: string;
	};
	image: string;
	description: string;
	price: number;
	title: string;
	user: {
		_id: string;
		role: string;
		username: string;
		email: string;
		password: string;
	};
}

export default function CardItem({
	id,
	category,
	description,
	price,
	title,
	image,
	user,
}: CardProps) {
	const location = useLocation();
	const userLoggedIn = useSelector(
		(state: rootState) => state.userState.isAuth
	);

	//dialog

	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const deleteIt = () => {
		dispatch(deleteWorkAC(id, getUserID));
		setOpen(false);
	};
	//end of dialog

	const classes = useStyles();
	const dispatch = useDispatch();
	const [isLiked, setLike] = useState<boolean>(false);
	const [showButtons, setShowButtons] = useState<boolean>(false);
  const [signupBut, setSignupBut] = useState(false);
  const [loginBut, setLoginBut] = useState(false);
  const [openModal, setModalState] = useState(false);

	const getUserID = useSelector((state: rootState) => state.userState.user.id);

	const getUserFavourites = useSelector(
		(state: rootState) => state.userState.favourites
	);

	const checkFavouriteHandler = useCallback(() => {
		const isIdExists = getUserFavourites.filter((item) => item._id === id);

		if (isIdExists.length) {
			setLike(true);
		} else {
			setLike(false);
		}
	}, [getUserFavourites, id]);

  const undoLike = () => {
    setLike(false);
    dispatch(removeFromFavouriteList(id));
  }

  const doLike = () => {
    setLike(true);
		addToFavouritesHandler(id);
  }

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

	useEffect(() => {
		checkFavouriteHandler();
	}, [checkFavouriteHandler]);

	return (
		<>
			<div className={classes.root}>
				<CardImgWrapper
					className="card-wrapper"
					style={{ position: 'relative' }}
				>
					{' '}
					{location.pathname === '/myArts'
						? user?._id === getUserID &&
						  showButtons && (
								<div
									className={classes.buttonsDeleteEdit}
									onMouseEnter={() => setShowButtons(true)}
									onMouseLeave={() => setShowButtons(false)}
								>
									<Button variant="contained" onClick={handleClickOpen} style={{ marginLeft: '5px', marginTop: '5px', width: '10px' }}>
										Delete
									</Button>
									<br />
									<Button style={{ marginLeft: '5px', marginTop: '5px', width: '10px' }} variant="contained">
										Edit
									</Button>
									<br></br>
								</div>
						  )
						: null}
					<Link className={classes.link} to={`/categories/works/${id}`}>
						<div
							className="card-image-wrapper"
							style={{ position: 'relative' }}
							onMouseEnter={() => setShowButtons(true)}
							onMouseLeave={() => setShowButtons(false)}
						>
							<img src={image} alt={title} className="card-image" />
						</div>

						<div className={classes.cardTitle}>
							<Typography variant="subtitle1" className={classes.textCenter}>
								{title}
							</Typography>
						</div>
					</Link>
          {userLoggedIn ? 
						<IconButton
							color="secondary"
							aria-label="delete from fav list"
							className={classes.titlePadd}
							onClick={isLiked ? undoLike : doLike}
						>
							{isLiked? <FavoriteIcon /> : <FavoriteBorderIcon />}
						</IconButton>
            : 
            <IconButton
							color="secondary"
							aria-label="delete from fav list"
							className={classes.titlePadd}
              onClick={() => {
                toggleModal();
                isSignupBut();
              }}
						>
							<FavoriteBorderIcon />
						</IconButton>
            }
				</CardImgWrapper>
			</div>
			<div>
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">
						{'Are you sure you want to permanently delete the post?'}
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							There will be no opportunity to return a post about your art!
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
						<Button onClick={deleteIt} color="primary" autoFocus>
							Delete
						</Button>
					</DialogActions>
				</Dialog>
			</div>
      <ModalDialog
				isOpen={openModal}
				onClose={toggleModal}
        showLogin={loginBut}
				showSignup={signupBut}
			/>
		</>
	);
}
