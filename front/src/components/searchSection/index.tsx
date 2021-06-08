import { makeStyles, Theme, Typography } from '@material-ui/core';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getWorksAC } from '../../redux/actionCreators/getWorks';
import { rootState } from '../../redux/init';
import { CategoryButton } from './categoriesButtons';

const useStyles = makeStyles((theme: Theme) => ({
	mainSection: {
		maxWidth: '1300px',
		margin: '0 auto',
		display: 'flex',
		flexWrap: 'wrap',
		padding: '25px',
		width: '100%',
	},
	searchTitleBlock: {
		flex: '1 0 100%',
		marginBottom: '25px',
	},
	searchtitle: {
		width: '100%',
		textAlign: 'center',
		margin: '45px 0',
		textTransform: 'uppercase',
	},
	searchTitleDivider: {
		borderTop: '1px solid rgb(238, 238, 238)',
		border: 0,
		height: 0,
	},
	leftCol: {
		flex: '0 0 auto',
		display: 'inline-block',
		margin: '0px 44px 20px 0px',
		width: '25%',
		maxWidth: '260px',
	},
	searchContentBlock: {
		position: 'relative',
		width: 'calc(100% - 50px)',
		maxWidth: '1700px',
		display: 'block',
		margin: '0px auto',
		flex: '1 1 0%',
	},
	breadCrumb: {
		marginBottom: '40px',
	},
	refineBlock: {
		marginBottom: '20px',
		width: '100%',
	},
	refineBlockTitle: {
		display: 'flex',
		WebkitBoxPack: 'justify',
		justifyContent: 'space-between',
		padding: '0px 0px 5px !important',
	},
	searchContentBlockText: {
		textAlign: 'left',
		color: 'rgb(34, 34, 34)',
		borderBottom: '1px solid rgb(221, 221, 221)',
		fontSize: '16px',
		margin: '0px 0px 10px',
		padding: '10px 45px 5px 0px',
		borderTop: 'none',
		letterSpacing: '1px',
		WebkitFontSmoothing: 'antialiased',
		textTransform: 'uppercase',
	},
	clearButt: {
		color: '#333',
		backgroundColor: '#f5f5f5',
		fontSize: '12px',
		borderRadius: '4px',
		padding: '2px 6px 0px',
		display: 'flex',
		WebkitBoxAlign: 'center',
		alignItems: 'center',
	},
	categoriesButtonsBlock: {
		margin: '0px',
		padding: '0px',
		listStyle: 'outside none',
	},
	searchResults: {
		display: 'flex',
		WebkitBoxAlign: 'center',
		alignItems: 'center',
		padding: '0px 10px 20px',
		flexWrap: 'wrap',
	},
	searchResultsText: {
		color: '#717171',
		whiteSpace: 'nowrap',
		marginLeft: 'auto',
	},
	children: {
		content: ' ',
		display: 'block',
		// position: 'absolute',
		top: 0,
		left: 0,
		height: '100%',
		width: '100%',
		overflow: 'hidden',
		zIndex: -1,
	},
}));

export const SearchSection: React.FC = (props) => {
	const classes = useStyles();
  const dispatch = useDispatch();
	const [allCategories, setAllCategories] =
		useState<[{ _id: string; name: string; image: string }]>();

	const getCategories = useCallback(async () => {
		const response = await fetch('/api/v1/categories');
		const { categories } = await response.json();
		setAllCategories(categories);
	}, []);

	useEffect(() => {
		getCategories();
	}, [getCategories]);

  // const category = 'all'
  // useEffect(() => {
  //   dispatch(getWorksAC(category));
  // }, [category, dispatch]);

	return (
		<section className={classes.mainSection}>
			<div className={classes.searchTitleBlock}>
				<Typography variant="h3" className={classes.searchtitle}>
					All
				</Typography>
				<hr className={classes.searchTitleDivider} />
			</div>

			<div className={classes.leftCol}>
				<div className={classes.breadCrumb}>
					<p>Breadcrubm</p>
				</div>
				<div className={classes.refineBlock}>
					<Typography
						variant="subtitle1"
						className={[
							classes.searchContentBlockText,
							classes.refineBlockTitle,
						].join(' ')}
					>
						<span>Refine</span>
						<Link to="#" className={classes.clearButt}>
							Clear
						</Link>
					</Typography>
				</div>
				<div className={classes.refineBlock}>
					<Typography
						variant="subtitle1"
						className={classes.searchContentBlockText}
					>
						<span>Categories</span>
					</Typography>
					<ul className={classes.categoriesButtonsBlock}>
						{allCategories?.map((item) => (
							<CategoryButton
								categoryId={item._id}
								categoryName={item.name}
								key={item._id}
							/>
						))}
					</ul>
				</div>
			</div>

			<div className={classes.searchContentBlock}>

				<div className={classes.searchResults}>
					<div className={classes.searchResultsText}> 42 results</div>
				</div>

				<div className={classes.children}>{props.children}</div>

			</div>
		</section>
	);
};