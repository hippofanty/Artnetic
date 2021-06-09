import { Container, makeStyles, Theme, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArtistsAC } from "../../redux/actionCreators/getArtistsAC";
import { rootState } from "../../redux/init";
import { Card } from "./Card";

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    textAlign: "center",
    fontFamily: `'Josefin Sans', sans-serif`,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontSize: '2.5rem',
    marginTop: '50px',
    marginBottom: '25px',
  },

  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    padding: 0,
    maxWidth: '1350px',
  },
  smallCard: {
    width: '225px',
    height: '270px',
  },
}));

export const Artists = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getArtistsAC());
  }, [dispatch]);
  const getArtists = useSelector((state: rootState) => state.artists.artists);

  return (
    <>
      <Typography variant="h3" className={classes.header}>
      Artists
				</Typography>
      <Container className={classes.container}>
        {getArtists.map((item) => {
          return (
            <Card
              // className={classes.smallCard}
              key={item._id}
              username={item.username}
              id={item._id}
              picture={item?.works ? item.works[0].image : undefined}
              alt={item?.works ? item.works[0].title : undefined}
            />
          );
        })}
      </Container>
    </>
  );
};
