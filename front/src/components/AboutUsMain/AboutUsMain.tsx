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
  info: {
    fontFamily: `'Montserrat', sans-serif`,
    textAlign: "center",
    marginBottom: 70,
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: `'Montserrat', sans-serif`,
    textAlign: "center",
    height: 150,
    width: '100%',
    marginTop: 40,
    borderTop: '1px solid black',
  }
}));

export const AboutUsMain = () => {
  const classes = useStyles();

	return (

    <>
      <Container fixed>
        <div>
          <Typography variant="h4" className={classes.searchtitle}>
            what we are
          </Typography>
          <hr className={classes.searchTitleDivider} />
          <Typography variant="h5" component="h2" className={classes.info}>
          ARTNETIC has built a reputation as the leading source for high-quality, cleared artwork for set decoration in a large range of styles and genres. Known for our superb client service, quick turnaround, and deep connections in the art world, we will do whatever it takes to realize your vision on your timeline.
          </Typography>
        </div>
      </Container>
      <div className={classes.footer}>
        <div><p>Art Division of Elbrus-Bootcamp, 2021.</p></div>
      </div>
    </>

	);
};
