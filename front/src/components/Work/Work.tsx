import { Container, makeStyles, Theme, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getOneWorkAC } from '../../redux/actionCreators/getOneWork';
// import { OneWorkState } from '../../redux/init';
import { rootState } from '../../redux/init';

interface ParamType {
  id: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    textAlign: 'center',
    fontSize: 40,
  },

  imageContainer: {
    display: 'flex',
    justifyContent: 'space-around',
  },

  image: {
    maxWidth: 1000,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 'auto',
    marginLeft: 'auto',
  }
}));

export const Work = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const oneWorkState = useSelector((state: rootState) => state.work.work);

  const { id } = useParams<ParamType>();
  useEffect(() => {
    dispatch(getOneWorkAC(id));
  }, [id, dispatch]);

  return (
    <Container>
      <Typography color="textPrimary" align="center">
        <h1>{oneWorkState.title}</h1>
      </Typography>
      <Typography color="textSecondary" align="center" component="p">
        Категория работы:
        <Link to={`/categories/${oneWorkState.category.name}`}>
          {oneWorkState.category.name}
        </Link>
      </Typography>
      <div className={classes.imageContainer}>
        <img
          className={classes.image}
          src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
          alt="Иллюстрация работы"
        />
      </div>
      <Typography className={classes.header} component="h2" paragraph={true}>
        Описание работы
      </Typography>
      <Typography component="p" paragraph={true}>
        {oneWorkState.description}
      </Typography>
      <Typography className={classes.header} component="h2" paragraph={true}>
        Автор работы
      </Typography>
      <Typography color="primary" component="h3" paragraph={true}>
        {oneWorkState.user.username}
      </Typography>
    </Container>
  );
};
