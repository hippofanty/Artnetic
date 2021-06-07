import { Container, makeStyles, Theme } from '@material-ui/core';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getArtistsAC } from '../../redux/actionCreators/getArtistsAC';

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    textAlign: 'center',
  },

  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
}));

export const Artists = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getArtistsAC())
  }, [dispatch])
  return (
    <>
      <Container className={classes.container}>
        <h1 className={classes.header}>Our Artists</h1>
        
      </Container>
    </>
  );
};
