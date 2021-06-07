import { Button, Container, makeStyles, Theme, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getOneWorkAC } from '../../redux/actionCreators/getOneWork';
// import { OneWorkState } from '../../redux/init';
import { rootState } from '../../redux/init';
import { OrderForm } from '../OrderForm';

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
  const [showForm, setShowForm] = useState<boolean>(false);

	const userLoggedIn = useSelector(
		(state: rootState) => state.userState.isAuth
	);

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
          src={oneWorkState.image}
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

      {userLoggedIn ? (
					<Button onClick={() => setShowForm((prev) => !prev)} color="inherit">
						Order Form
					</Button>
				) : null}

				{showForm ? <OrderForm setPrice={oneWorkState.price} /> : null}
    </Container>
  );
};
