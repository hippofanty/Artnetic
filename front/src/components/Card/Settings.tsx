import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useSelector } from "react-redux";
import { rootState } from "../../redux/init";
import { Link } from "react-router-dom";

interface SettingsProps {
  pictureid: string;
  userid: string;
}

export default function Settings({ ...props }: SettingsProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const getUserID = useSelector((state: rootState) => state.userState.user.id);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
            <MenuItem onClick={handleClose}>Delete</MenuItem>
            <MenuItem onClick={handleClose}>Edit</MenuItem>
          </>
        ) : (
          <Link to={`works/${props.pictureid}`}><MenuItem onClick={handleClose}>Details</MenuItem></Link>
        )}
      </Menu>
    </div>
  );
}
