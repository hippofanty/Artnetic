import { Container, makeStyles, Theme } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArtistsAC } from "../../redux/actionCreators/getArtistsAC";
import { rootState } from "../../redux/init";
import { Card } from "./Card";

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    textAlign: "center",
  },

  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
}));

export const Artists = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getArtistsAC());
  }, [dispatch]);
  const getArtists = useSelector((state: rootState) => state.artists.artists);
  console.log(getArtists, "geeeeeeeeeeeeeeeeet");

  return (
    <>
      <h1 className={classes.header}>Our Artists</h1>
      <Container className={classes.container}>
        {getArtists.map((item) => {
          return (
            <Card
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
