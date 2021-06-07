import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useSelector } from 'react-redux';
import { rootState } from '../../redux/init';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);

export const FavouriteIcon = () => {
  const classes = useStyles();

  const userFavourites = useSelector((state: rootState) => state.userState.favourites);
  const favLength = userFavourites.length;

  return (
    <div className={classes.root}>
      <Badge badgeContent={favLength} color="secondary">
        <FavoriteBorderIcon />
      </Badge>
    </div>
  );
}
