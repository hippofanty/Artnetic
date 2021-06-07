import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../redux/init";
import { Link } from "react-router-dom";
//-----dialog
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { deleteWorkAC } from "../../redux/actionCreators/deleteWorkAC";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface SettingsProps {
  pictureid: string;
  userid: string;
}

export function Settings({ ...props }: SettingsProps) {
  const dispatch = useDispatch();
  const getUserID = useSelector((state: rootState) => state.userState.user.id);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //---for dialog
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setAnchorEl(null);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
  //----
  const handleDelete = () => {
    setOpen(false);
    dispatch(deleteWorkAC(props.pictureid));
  };
  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon color="action" />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {getUserID === props.userid ? (
          <>
            <MenuItem  onClick={handleClickOpen}>Delete</MenuItem>
            <MenuItem onClick={handleClose}>Edit</MenuItem>
          </>
        ) : (
          <Link
            to={`works/${props.pictureid}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <MenuItem onClick={handleClose}>Details</MenuItem>
          </Link>
        )}
      </Menu>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Are you sure you want to permanently delete the post?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          There will be no opportunity to return a post about your art!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}






export default function AlertDialogSlide() {
 

  return (
    <div>
      <Button variant="outlined" color="primary">
        Slide in alert dialog
      </Button>

    </div>
  );
}


