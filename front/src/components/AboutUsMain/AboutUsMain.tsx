import {Container, Theme, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  searchTitleDivider: {
    borderTop: '5px solid rgb(238, 238, 238)',
		border: 0,
		height: 0,
    width: 500,
    marginBottom: 20,
  },
  searchtitle: {
		width: '100%',
		textAlign: 'center',
    marginTop: '70px',
		marginBottom: '50px',
		textTransform: 'uppercase',
    fontFamily: `'Montserrat', sans-serif`,
    fontSize: '36px',
	},
}));

export const AboutUsMain = () => {
  const classes = useStyles();

	return (
		<Container fixed>
			<div>
        <Typography variant="h4" className={classes.searchtitle}>
          what we are
        </Typography>
        <hr className={classes.searchTitleDivider} />
        <Typography>
          
        </Typography>
			</div>
		</Container>
	);
};
