import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneArtistWorksAC } from '../../redux/actionCreators/getOneArtistWorksAC';
import { rootState } from '../../redux/init';
import { Container, Divider, makeStyles, Theme } from '@material-ui/core';
import CardItem from '../Card/Card';
import { deleteOneArtistWorksAC } from '../../redux/actionCreators/deleteOneArtistWorksAC';

interface ParamTypes {
	id: string;
}
const useStyles = makeStyles((theme: Theme) => ({
	header: {
		textAlign: 'center',
	},

	container: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		flexWrap: 'wrap',
		margin: 15,
		padding: 0,
	},
}));
export const Artist = () => {
	const classes = useStyles();
	const { id } = useParams<ParamTypes>();

	const dispatch = useDispatch();
	const getArtistWorks = useSelector(
		(state: rootState) => state.oneArtistWorks.oneArtistWorks
	);
	const avatar = useSelector((state: rootState) => state.userState.user.avatar);

	useEffect(() => {
		dispatch(getOneArtistWorksAC(id));
		return () => {
			dispatch(deleteOneArtistWorksAC());
		};
	}, [dispatch, id]);

	return (
		<>
			{getArtistWorks.length === 0 ? (
				<>
					<h3>This author has not published any works</h3>
				</>
			) : (
				<Container className={classes.container}>
					{getArtistWorks.map((item, index) => (
						<CardItem
							key={item._id || index}
							id={item._id}
							category={item.category}
							image={item.image}
							description={item.description}
							price={item.price}
							title={item.title}
							user={item.user}
						/>
					))}
				</Container>
			)}
		</>
	);
};
