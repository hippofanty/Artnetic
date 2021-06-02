
import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import DropdownCategories from './DropdownCategories'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    navbar: {
      backgroundColor: "#ec8b83",
    },

    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      fontFamily: "Allura",
      fontSize: '32px'
    },

    link: {
      textDecoration: "none",
      color: "white",
    },
  }),

    profileButton: {
      color: 'white',
    }
  }),

);

export const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}><Link to='/'>Artistic</Link>
            
          </Typography>

          <DropdownCategories />
          <Button color="inherit">
            <Link to="/login" className={classes.link}>
              Login
            </Link>
          </Button>
          <Button color="inherit">
            <Link to="/signup" className={classes.link}>
              Signup
            </Link>
          </Button>

          <Button color="inherit">Login</Button>
          <Button color="inherit">Signup</Button>
          <Button color="inherit" className={classes.profileButton}><Link to="/profile">Profile</Link></Button>

        </Toolbar>
      </AppBar>
    </div>
  );
};
