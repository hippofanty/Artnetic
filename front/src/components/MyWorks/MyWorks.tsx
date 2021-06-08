import { Container, makeStyles, Theme } from "@material-ui/core";
import zIndex from "@material-ui/core/styles/zIndex";
import { relative } from "path";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { deleteWorkAC } from "../../redux/actionCreators/deleteWorkAC";

import { getMyWorksAC } from "../../redux/actionCreators/getMyWorksAC";
import { rootState } from "../../redux/init";
import CardItem from "../Card/Card";

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    textAlign: "center",
  },

  container: {
    display: "flex",
    flexDirection: "row",
    // justifyContent: "space-around",
    flexWrap: "wrap",
    margin: 15,
  },
}));

export const MyWorks = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const getUserID = useSelector((state: rootState) => state.userState.user.id);
  const myWorksState = useSelector((state: rootState) => state.myWorks.myWorks);

  useEffect(() => {
    dispatch(getMyWorksAC(getUserID));
  }, [dispatch, getUserID]);

  return (
    <>
      {myWorksState.length === 0 ? (
        <h3>You have not published any works yet</h3>
      ) : (
        <Container className={classes.container}>
          {myWorksState.map((item, index) => (
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
