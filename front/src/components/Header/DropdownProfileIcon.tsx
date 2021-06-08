import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		link: {
			textDecoration: 'none',
		},
		linkDrop: {
			textDecoration: 'none',
			color: 'grey',
		},
	})
);

interface Props {
  logoutHandler: () => void,
  getUsername: string,
}

export default function DropdownProfileIcon({logoutHandler, getUsername}: Props) {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div className={classes.root}>
			<Button
				aria-controls="simple-menu"
				aria-haspopup="true"
				onClick={handleClick}
				className={classes.link}
        size="large"
        startIcon={<AccountCircleIcon />}
			>
				{getUsername}
			</Button>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
				transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        getContentAnchorEl={null}
			>
				<MenuItem onClick={handleClose}>
					<Link to="/profile" className={classes.linkDrop}>
						Profile
					</Link>
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<Link to="/myArts" className={classes.linkDrop}>
						My Arts
					</Link>
				</MenuItem>
        <MenuItem onClick={handleClose}>
					<Link to="/profile/orders" className={classes.linkDrop}>
						Orders
					</Link>
				</MenuItem>
				<Divider />
				<MenuItem onClick={() => {handleClose(); logoutHandler()}}>
						Log out
				</MenuItem>
			</Menu>
		</div>
	);
}
