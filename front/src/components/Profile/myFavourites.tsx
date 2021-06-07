import { Box, makeStyles, Theme } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { rootState } from '../../redux/init';
import CardItem from '../Card/Card';

const useStyles = makeStyles((theme: Theme) => ({
	imageContainer: {
		display: 'flex',
		justifyContent: 'space-around',
	},
}));

export const MyFavourites = () => {
	const classes = useStyles();

	const getFavouritesList = useSelector(
		(state: rootState) => state.userState.favourites
	);

	return (
		<Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center">
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
	);
};
