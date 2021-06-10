import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { rootState } from "../../redux/init";
// MuiMenu-list MuiList-padding
const MyMenu = styled(Menu)`
  .MuiList-root {
    min-width: 115px;
  }
`;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    link: {
      textDecoration: "none",
      fontFamily: `'Josefin Sans', sans-serif`,
      fontSize: ".9em",
    },
    linkDrop: {
      textDecoration: "none",
      color: "grey",
    },
    navMargin: {
      margin: "0px 5px",
    },
    box: {
      position: "relative",
      overflow: "hidden",
      width: "30px",
      height: "30px",
      marginRight: '7px'
    },

    avatar: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      width: "30px",
      height: "30px",
      objectFit: "cover",
      borderRadius: "25px",
      // border: "1px solid grey",
    },
  })
);

interface Props {
  logoutHandler: () => void;
  getUsername: string;
}

export default function DropdownProfileIcon({
  logoutHandler,
  getUsername,
}: Props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const user = useSelector((state: rootState) => state.userState.user);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={[classes.link, classes.navMargin].join(" ")}
        size="large"
      >
        {/* startIcon= */}
        {
          <div className={classes.box}>
            <img className={classes.avatar} src={user.avatar} />
          </div>
        }
        {getUsername}
      </Button>
      <MyMenu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/profile" className={classes.linkDrop}>
            Profile
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/myArts" className={classes.linkDrop}>
            My Arts
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/profile/orders" className={classes.linkDrop}>
            Orders
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/profile/manage" className={classes.linkDrop}>
            Manage Orders
          </Link>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            handleClose();
            logoutHandler();
          }}
        >
          Log out
        </MenuItem>
      </MyMenu>
    </div>
  );
}
