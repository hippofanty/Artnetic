import React, { useState } from "react";
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
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { rootState } from "../../redux/init";
import Settings from "./Settings";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // maxWidth: 345,
      // minWidth:340,
      width: 320,
      marginTop: 20,
      marginRight: 15,
      marginLeft: 15,
      textDecoration: "none",
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: red[500],
    },
    link: {
      textDecoration: "none",
      color: "black",
    },
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
}
}

export default function CardItem({
  id,
  category,
  image,
  description,
  price,
  title,
  user,
}: CardProps) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  console.log(user._id, id, 'ndasdlkasjd');

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            A
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <Settings userid={user._id} pictureid={id}/>
          </IconButton>
        }
        title={
          <Link className={classes.link} to={`works/${id}`}>
            {title}
          </Link>
        }
        subheader={category.name}
      />
      <CardMedia className={classes.media} image={image} title={title} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Price per day starts from:
          <br /> <b>{price} rub</b> / {(price / 72.86).toFixed()}$ /{" "}
          {(price / 88.65).toFixed()}€
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}