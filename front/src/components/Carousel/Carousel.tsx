import React, { ReactNode, useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Link } from 'react-router-dom';
import { Work } from '../../redux/init';

const handleDragStart = (e: any) => e.preventDefault();

const items: ReactNode[] = [
  // <img src="path-to-img" onDragStart={handleDragStart} alt="carousel_item1" />,
  // <img src="path-to-img" onDragStart={handleDragStart} alt="carousel_item2" />,
  // <img src="path-to-img" onDragStart={handleDragStart} alt="carousel_item3" />,
];

export const Gallery = () => {
  // const [works, setWorks] = useState<Work[]>();
  const [workItems, setWorkItems] = useState<ReactNode[]>();
  // Get posts for carousel
  const itemsLoader = async () => {
    const response = await fetch('/api/v1/categories/carousel/works');
    const { works } = await response.json();
    works?.map((el: Work) =>
      items.push(
        <Link to={`/categories/works/${el._id}`}>
          <div>
            <img
              className="carousel-img"
              src={el.image}
              onDragStart={handleDragStart}
              alt={el.title}
            />
          </div>
        </Link>
      )
    );
    setWorkItems(items);
  };

  useEffect(() => {
    itemsLoader();   
  }, []);

  return (
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
      paddingLeft={10}
      paddingRight={10}
    />
  );
};
