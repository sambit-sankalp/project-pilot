import React, { useState, useEffect } from 'react';
import MainFeaturedPost from '../components/home/MainFeaturedPost';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Trendings from '../components/home/Trendings';
import { Container } from '@mui/material';
import { getPublications } from '../Lens/query';

const HomePage = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    handlePub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handlePub = async () => {
    const obj = {
      profileId: '0x2d5b',
      publicationTypes: ['POST'],
      limit: 10,
    };
    const res = await getPublications(obj);
    setData(res.data.publications.items);
    //console.log(res)
    //console.log(res.data.publications.items[0].metadata.content);
  };
  return (
    <Container maxWidth="lg" sx={{ my: 10, mt: 9 }}>
      <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false} showStatus={false}>
        {data &&
          data.map((obj) => {
            const { metadata, id } = obj;
            return (
              <MainFeaturedPost
                content={String(metadata.content).slice(0, 80)}
                title={metadata.name}
                img={metadata.media[0].original.url}
                key={id}
                id={id}
              />
            );
          })}
      </Carousel>
      <Trendings />
    </Container>
  );
};

export default HomePage;
