import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { rootState } from '../../redux/init';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			// maxWidth: 345,
			// minWidth:340,
			width: 250,
			height: 337,
			// marginTop: 20,
			// marginRight: 15,
			// marginLeft: 15,
			textDecoration: 'none',
		},
		link: {
			textDecoration: 'none',
			color: 'black',
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
		},
	})
);

interface CardProps {
	id: string;
	category: {
		name: string;
	};
	description: string;
	price: number;
	title: string;
	image: string;
	user: {
		username: string;
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
	const classes = useStyles();
	const [isLiked, setLike] = useState<boolean>(false);

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

	useEffect(() => {
		checkFavouriteHandler();
	}, [checkFavouriteHandler]);

	console.log(category);
	return (
		<div className={classes.root}>
			<div className="card-wrapper">
				<Link className={classes.link} to={`/categories/works/${id}`}>
					<div className="card-image-wrapper">
						<img src={image} alt={title} className="card-image" />
					</div>
					<div className={classes.cardTitle}>
						<Typography variant="subtitle1">{title}</Typography>
						{isLiked ? (
							<IconButton
								color="secondary"
								aria-label="add to favorites"
								className={classes.titlePadd}
							>
								<FavoriteIcon />
							</IconButton>
						) : (
							<IconButton
								// color="secondary"
								aria-label="add to favorites"
								className={classes.titlePadd}
							>
								<FavoriteBorderIcon />
							</IconButton>
						)}
					</div>
				</Link>
			</div>
		</div>
	);
}
