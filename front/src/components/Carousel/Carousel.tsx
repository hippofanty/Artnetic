import { makeStyles, Theme, Typography } from '@material-ui/core';
import React, { ReactNode, useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Link } from 'react-router-dom';
import { Work } from '../../redux/init';

const useStyles = makeStyles((theme: Theme) => ({
  searchTitleDivider: {
    borderTop: '5px solid rgb(238, 238, 238)',
		border: 0,
		height: 0,
    width: 500,
    marginBottom: 20,
  },
  searchtitle: {
		width: '100%',
		textAlign: 'center',
		marginBottom: '50px',
		textTransform: 'uppercase',
    fontFamily: `'Montserrat', sans-serif`,
    fontSize: '36px',
	},
}));

const handleDragStart = (e: any) => e.preventDefault();

const items: ReactNode[] = [];

export const Gallery = () => {
  const classes = useStyles();
  const [workItems, setWorkItems] = useState<ReactNode[]>();
  // Get posts for carousel
  const itemsLoader = async () => {
    const response = await fetch('/api/v1/categories/carousel/works');
    const { works } = await response.json();
    works?.map((el: Work) =>
      items.push(
        <div className="carousel-item-wrapper">
          <Link to={`/categories/works/${el._id}`}>
            <div className="img-item">
              <img
                className="carousel-img"
                src={el.image}
                onDragStart={handleDragStart}
                alt={el.title}
              />
            </div>
          </Link>
        </div>
      )
    );
    setWorkItems(items);
  };

  useEffect(() => {
    itemsLoader();   
  }, []);

  return (
    <>
      <Typography variant="h4" className={classes.searchtitle}>
        featured artwork
      </Typography>
			<hr className={classes.searchTitleDivider} />
      <AliceCarousel
        mouseTracking
        disableDotsControls={true}
        autoPlay={true}
        animationDuration={1500}
        autoPlayInterval={2000}
        infinite={true}
        items={workItems}
        responsive={{
          0: {
            items: 1,
          },
          1440: {
            items: 6,
          },
        }}
        autoWidth={true}
      />
    </>
  );
};
