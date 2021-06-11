import { Container, makeStyles, Theme } from '@material-ui/core';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getWorksAC } from '../../redux/actionCreators/getWorks';
import { rootState } from '../../redux/init';
import CardItem from '../Card/Card';
export interface ParamTypes {
	category: string;
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
    padding: 0,
	},
}));

export const Categories = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const worksState = useSelector((state: rootState) => state.works.works);

	const { category } = useParams<ParamTypes>();
	useEffect(() => {
		dispatch(getWorksAC(category));
	}, [category, dispatch]);
	return (
		<Container className={classes.container}>
			{worksState.map((item) => (
				<CardItem
					id={item._id}
					category={item.category}
					image={item.image}
					description={item.description}
					price={item.price}
					title={item.title}
					user={item.user}
					key={item._id}
				/>
			))}
		</Container>
	);
};
