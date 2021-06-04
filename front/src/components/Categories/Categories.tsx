import { Container, makeStyles, Theme } from '@material-ui/core';
import { title } from 'process';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getWorksAC } from '../../redux/actionCreators/getWorks';
import { rootState } from '../../redux/init';
import CardItem from '../Card/Card';
interface ParamTypes {
  category: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    textAlign: 'center',
  },

  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    margin: 15,
  },
}));

export const Categories = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const worksState = useSelector((state: rootState) => state.works.works);
  console.log(worksState, 'worksState', typeof worksState);

  const { category } = useParams<ParamTypes>();
  useEffect(() => {
    dispatch(getWorksAC(category));
  }, [category, dispatch]);
  return (
    <>
      <h1 className={classes.header}>{category}</h1>
      <Container className={classes.container}>
        {worksState.map((item) => (
          <CardItem
            id={item._id}
            category={item.category}
            description={item.description}
            price={item.price}
            title={item.title}
            user={item.user}
          />
        ))}
      </Container>
    </>
  );
};
