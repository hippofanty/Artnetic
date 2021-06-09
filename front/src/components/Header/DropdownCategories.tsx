import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

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
			color: '#222',
			textTransform: 'uppercase',
			fontSize: '.99em',
      fontFamily: `'Montserrat', sans-serif`,
		},
		navText: {
			fontFamily: `'Josefin Sans', sans-serif`,
			fontSize: '.9em',
			letterSpacing: '1px',
		},
    navMargin: {
      margin: '0px 5px',
    }
	})
);

export default function DropdownCategories() {
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
				className={[classes.link, classes.navMargin].join(' ')}
				size="large"
			>
				<span className={classes.navText}>Categories</span>
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
				<Link to="/categories/all" >
					<MenuItem onClick={handleClose} className={classes.linkDrop}>All</MenuItem>
				</Link>
				<Divider />
				<Link to="/categories/fineArt">
					<MenuItem onClick={handleClose} className={classes.linkDrop}>Fineart</MenuItem>
				</Link>
				<Link to="/categories/graphics">
					<MenuItem onClick={handleClose} className={classes.linkDrop}>Graphics</MenuItem>
				</Link>
				<Link to="/categories/abstraction">
					<MenuItem onClick={handleClose} className={classes.linkDrop}>Abstraction</MenuItem>
				</Link>
				<Link to="/categories/sculptures">
					<MenuItem onClick={handleClose} className={classes.linkDrop}>Sculptures</MenuItem>
				</Link>
				<Link to="/categories/other">
					<MenuItem onClick={handleClose} className={classes.linkDrop}>Other</MenuItem>
				</Link>
			</Menu>
		</div>
	);
}
