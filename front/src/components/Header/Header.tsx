import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, useHistory } from 'react-router-dom';
import DropdownCategories from './DropdownCategories';
import { useDispatch, useSelector } from 'react-redux';
import { rootState, UserState } from '../../redux/init';
import { logout } from '../../redux/actionCreators/userActions';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Icon from '@material-ui/core/Icon';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';
import { ModalDialog } from '../ModalDialog/index';
import { Container } from '@material-ui/core';
import DropdownAboutUs from './DropdownAboutUs';
import DropdownProfileIcon from './DropdownProfileIcon';
import ArtLogo from '/ArtneticLogo.png';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		navbar: {
			backgroundColor: '#fafafa',
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			flexGrow: 1,
			fontFamily: 'Allura',
			fontSize: '32px',
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
										src="./ArtneticLogo.png"
										className={classes.logo}
									/>
								</IconButton>
							</Link>
						</div>

						<div className={classes.navRightSide}>
							<DropdownCategories />
							<DropdownAboutUs />
							<Link to="#" className={classes.link}>
								<Button size="large">Artists</Button>
							</Link>

							{userLoggedIn ? (
								<>
									<DropdownProfileIcon
										logoutHandler={() => logoutHandler()}
										getUsername={getUsername}
									/>
									{/* <Link to="/profile" className={classes.link}>
										<Button startIcon={<AccountCircleIcon />}>
											{getUsername}
										</Button>
									</Link>
									<IconButton
										color="inherit"
										size="medium"
										aria-label="logout"
										onClick={() => logoutHandler()}
									>
										<ExitToAppOutlinedIcon />
									</IconButton> */}
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
