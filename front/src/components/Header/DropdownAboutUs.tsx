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
			color: 'grey',
		},
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
				className={classes.link}
				size="large"
			>
				О нас
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
					<Link to="#" className={classes.linkDrop}>
						О нас
					</Link>
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<Link to="#" className={classes.linkDrop}>
						Клиенты
					</Link>
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<Link to="#" className={classes.linkDrop}>
						Контакты
					</Link>
				</MenuItem>
			</Menu>
		</div>
	);
}
