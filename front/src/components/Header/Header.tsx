import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import DropdownCategories from './DropdownCategories';
import { useDispatch, useSelector } from 'react-redux';
import { rootState} from '../../redux/init';
import { logout } from '../../redux/actionCreators/userActions';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import OpenInBrowserIcon from '@material-ui/icons/OpenInBrowser';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		navbar: {
			backgroundColor: '#ec8b83',
		},

		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			flexGrow: 1,
			fontFamily: 'Allura',
			fontSize: '32px',
		},

		link: {
			textDecoration: 'none',
			color: 'white',
		},
	})
);

export const Header = () => {
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
	};

	return (
		<div className={classes.root}>
			<AppBar position="static" className={classes.navbar}>
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						<Link to="/">Artistic</Link>
					</Typography>

					<DropdownCategories />

					{userLoggedIn ? (
						<>
							<Button startIcon={<AccountCircleIcon />} color="inherit">
								<Link to="/profile" className={classes.link}>
									{getUsername}
								</Link>
							</Button>
							<IconButton
								color="inherit"
								size="medium"
								aria-label="logout"
								onClick={() => logoutHandler()}
							>
								<ExitToAppOutlinedIcon />
							</IconButton>
						</>
					) : (
						<>
							<IconButton color="inherit" aria-label="login"></IconButton>
							<Link to="/login" className={classes.link}>
								<Button
									color="inherit"
									startIcon={<OpenInBrowserIcon />}
									size="large"
								>
									Login
								</Button>
							</Link>
							<Link to="/signup" className={classes.link}>
								<Button color="inherit">Signup</Button>
							</Link>
						</>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
};
