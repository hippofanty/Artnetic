import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
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

export default function DropdownAboutUs() {
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
				<span className={classes.navText}>About</span>
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
					<Link to="#">
				<MenuItem onClick={handleClose} className={classes.linkDrop}>
						About
				</MenuItem>
					</Link>
					<Link to="#">
				<MenuItem onClick={handleClose} className={classes.linkDrop}>
						Clients
				</MenuItem>
					</Link>
					<Link to="#">
				<MenuItem onClick={handleClose} className={classes.linkDrop}>
						Contact
				</MenuItem>
					</Link>
			</Menu>
		</div>
	);
}
