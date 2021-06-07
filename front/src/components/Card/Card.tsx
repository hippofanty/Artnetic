import React, { SetStateAction, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { Link } from "react-router-dom";
import { deleteWorkAC } from "../../redux/actionCreators/deleteWorkAC";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../redux/init";
import { Button } from "@material-ui/core";
//dialog

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // maxWidth: 345,
      // minWidth:340,
      width: 250,
      height: 337,
      // marginTop: 20,
      // marginRight: 15,
      // marginLeft: 15,
      textDecoration: "none",
    },
    link: {
      textDecoration: "none",
      color: "black",
    },
    cardTitle: {
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "column",
      marginTop: "10px",
      alignItems: "center",
    },
    titlePadd: {
      padding: "0 12px",
    },
    buttonsDeleteEdit: {
      position: "absolute",
      top: "26%",
      left: "83px",
      zIndex: 10,
    },
    delete_edit: {},
  })
);

export interface CardProps {
  id: string;
  category: {
    name: string;
  };
  image: string;
  description: string;
  price: number;
  title: string;
  user: {
    _id: string;
    role: string;
    username: string;
    email: string;
    password: string;
  };
}

export default function CardItem({
  id,
  category,
  description,
  price,
  title,
  image,
  user,
}: CardProps) {


  //dialog
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const deleteIt = () => {
    dispatch(deleteWorkAC(id));
    setOpen(false);
  };
  //end of dialog

  const classes = useStyles();
  const dispatch = useDispatch();
  const [showButtons, setShowButtons] = useState<boolean>(false);
  const getUserID = useSelector((state: rootState) => state.userState.user.id);
  return (
    <>
      <div className={classes.root}>
        <div className="card-wrapper" style={{ position: "relative" }}>
          {user?._id === getUserID && showButtons && (
            <div
              className={classes.buttonsDeleteEdit}
              onMouseEnter={() => setShowButtons(true)}
              onMouseLeave={() => setShowButtons(false)}
            >
              <Button
                variant="contained"
                onClick={handleClickOpen}

              >
                Delete
              </Button>
              <br />
              <Button style={{ marginTop: "5px" }} variant="contained">
                Edit
              </Button>
              <br></br>
            </div>
          )}
          <Link className={classes.link} to={`/categories/works/${id}`}>
            <div
              className="card-image-wrapper"
              style={{ position: "relative" }}
              onMouseEnter={() => setShowButtons(true)}
              onMouseLeave={() => setShowButtons(false)}
            >
              <img src={image} alt={title} className="card-image" />
            </div>
            <div className={classes.cardTitle}>
              <Typography variant="subtitle1">{title}</Typography>
              <IconButton
                aria-label="add to favorites"
                className={classes.titlePadd}
              >
                <FavoriteIcon />
              </IconButton>
            </div>
          </Link>
        </div>
      </div>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="Are you sure you want to permanently delete the post?">
            There will be no opportunity to return a post about your art!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={deleteIt} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
