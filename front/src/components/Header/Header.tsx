import React, { useState } from 'react';
import {
  fade,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import { Link, useHistory } from 'react-router-dom';
import DropdownCategories from './DropdownCategories';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from '../../redux/init';
import { logout, logoutFavouriteWorks } from '../../redux/actionCreators/userActions';

import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import { ModalDialog } from '../ModalDialog/index';
import { Container } from '@material-ui/core';
import DropdownAboutUs from './DropdownAboutUs';
import DropdownProfileIcon from './DropdownProfileIcon';
import ArtLogo from './header_logo/ArtneticLogo.png';
import { FavouriteIcon } from './favouritesIcon';
import {Search} from '../Search/Search'
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		navbar: {
			backgroundColor: '#fff',
      boxShadow: 'none',
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		navTextColor: {
			color: '#000000',
		},
		link: {
			textDecoration: 'none',
		},
		navRightSide: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
		},
		logo: {
			width: '40px',
		},
		navInnerContainer: {
			flexGrow: 1,
		},
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },

    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },

    inputRoot: {
      color: 'inherit',
    },

    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
	})
);

export const Header = () => {
	const history = useHistory();
	const classes = useStyles();
	const userLoggedIn = useSelector(
		(state: rootState) => state.userState.isAuth
	);
	const getUsername = useSelector(
		(state: rootState) => state.userState.user.username
	);
	const dispatch = useDispatch();
	console.log(userLoggedIn);

	const logoutHandler = () => {
		dispatch(logout());
    dispatch(logoutFavouriteWorks());
		localStorage.removeItem('token');
		history.push('/');
	};

	// для модалки
	const [openModal, setModalState] = useState(false);
	const [loginBut, setLoginBut] = useState(false);
	const [signupBut, setSignupBut] = useState(false);

	const toggleModal = () => {
		setModalState(!openModal);
		setLoginBut(false);
		setSignupBut(false);
	};
	//

	const isLoginBut = () => setLoginBut(true);
	const isSignupBut = () => setSignupBut(true);

	return (
		<div className={classes.root}>
			<AppBar position="static" className={classes.navbar}>
				<Container fixed className={classes.navTextColor}>
					<Toolbar>
						<div className={classes.navInnerContainer}>
							<Link to="/">
								<IconButton
									edge="start"
									className={classes.menuButton}
									color="inherit"
									aria-label="menu"
								>
									<img
										alt="ArtneticLogo"
										src={ArtLogo}
										className={classes.logo}
									/>
								</IconButton>
							</Link>
						</div>
            <Search />

						<div className={classes.navRightSide}>
							<DropdownCategories />
							<DropdownAboutUs />
							<Link to="/artists" className={classes.link}>
								<Button size="large">Artists</Button>
							</Link>

							{userLoggedIn ? (
								<>
									<Link to="/profile/favourites" className={classes.link}>
                  <IconButton aria-label="my-favourites">
											<FavouriteIcon />
										</IconButton>
									</Link>

									<DropdownProfileIcon
										logoutHandler={() => logoutHandler()}
										getUsername={getUsername}
									/>
								</>
							) : (
								<>
									<IconButton color="inherit" aria-label="login"></IconButton>
									<Button
										color="inherit"
										startIcon={<OpenInBrowserIcon />}
										size="large"
										onClick={() => {
											toggleModal();
											isLoginBut();
										}}
									>
										Log in
									</Button>
									<Button
										color="inherit"
										size="large"
										onClick={() => {
											toggleModal();
											isSignupBut();
										}}
									>
										Sign up
									</Button>
								</>
							)}
						</div>
					</Toolbar>
				</Container>
			</AppBar>
			<ModalDialog
				isOpen={openModal}
				onClose={toggleModal}
				showLogin={loginBut}
				showSignup={signupBut}
			/>
		</div>
	);
};
