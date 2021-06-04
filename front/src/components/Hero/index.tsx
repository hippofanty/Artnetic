import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ReactPlayer from 'react-player';
import heroVideo from '../../Athens.mp4';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		height: '70vh',
		position: 'relative',
		'& video': {
			objectFit: 'cover',
		},
	},
	overlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '80%',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	title: {
		paddingBottom: theme.spacing(4),
	},
	heroBut: {
		color: 'white',
		borderColor: 'white',
	},
  link: {
    textDecoration: 'none',
  },
}));

export const Hero = () => {
	const classes = useStyles();

	return (
		<section className={classes.root}>
			<ReactPlayer
				url={heroVideo}
				playing
				loop
				muted
				width="100%"
				height="80%"
			/>
			<div className={classes.overlay}>
				<Box
					height="80%"
					display="flex"
					flexDirection="column"
					justifyContent="center"
					alignItems="center"
					color="#fff"
				>
					<Typography variant="h3" component="h1" className={classes.title}>
						<Box
							display="flex"
							flexDirection="column"
							alignItems="center"
							className="unica-one"
						>
							<span className="font-80">ARTNETIC</span>
							<span>ART RENTAL AND SALES FOR CREATIVE PEOPLE</span>
						</Box>
					</Typography>
					<Link to="/categories/all" className={classes.link}>
						<Button variant="outlined" className={classes.heroBut} size="large">
							BROWSE ARTWORK
						</Button>
					</Link>
				</Box>
			</div>
		</section>
	);
};
