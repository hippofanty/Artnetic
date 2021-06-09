import { Box, makeStyles, Theme, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { rootState } from '../../redux/init';
import CardItem from '../Card/Card';

const useStyles = makeStyles((theme: Theme) => ({
	imageContainer: {
		display: 'flex',
		justifyContent: 'space-around',
	},
	favouriteWrapper: {
		maxWidth: '1350px',
		padding: '40px 0px',
		width: '100%',
		margin: '0px auto',
    textTransform: 'uppercase',
	},
  title: {
    paddingBottom: '25px',
    textAlign: 'left',
    fontSize: '30px',
    fontFamily: `"Josefin Sans",sans-serif`,
  },
  titleBox: {
    paddingBottom: '25px',
  }
}));

export const MyFavourites = () => {
	const classes = useStyles();

	const getFavouritesList = useSelector(
		(state: rootState) => state.userState.favourites
	);

	return (
		<div className={classes.favouriteWrapper}>
			<Box display="flex" className={classes.titleBox}>
				<Typography variant="h4" className={classes.title}>
					My favourites
				</Typography>
			</Box>
			<Box
				display="flex"
				flexDirection="row"
				flexWrap="wrap"
				justifyContent="flex-start"
			>
				{getFavouritesList.map((item) => (
					<CardItem
						id={item._id}
						category={item.category}
						description={item.description}
						price={item.price}
						title={item.title}
						user={item.user}
						image={item.image}
						key={item._id}
					/>
				))}
			</Box>
		</div>
	);
};
