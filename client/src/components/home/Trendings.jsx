import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid, Typography } from '@mui/material';
import Sidebar from './Sidebar';
import SmallBlogCard from '../profile/SmallBlogCard';
import { getPublications } from '../../Lens/query';
import { compiler } from 'markdown-to-jsx';

const Trendings = () => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  useEffect(() => {
    handlePub();
    handlePub2();
    handlePub3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handlePub = async () => {
    const obj = {
      profileId: '0x2eee',
      publicationTypes: ['POST'],
      limit: 10,
    };
    const res = await getPublications(obj);
    setData1(res.data.publications.items);
    //console.log(res)
    //console.log(res.data.publications.items[0].metadata.content);
  };
  const handlePub2 = async () => {
    const obj = {
      profileId: '0x2eae',
      publicationTypes: ['POST'],
      limit: 10,
    };
    const res = await getPublications(obj);
    setData2(res.data.publications.items);
    //console.log(res)
    //console.log(res.data.publications.items[0].metadata.content);
  };
  const handlePub3 = async () => {
    const obj = {
      profileId: '0x2d5b',
      publicationTypes: ['POST'],
      limit: 10,
    };
    const res = await getPublications(obj);
    setData3(res.data.publications.items);
    //console.log(res)
    //console.log(res.data.publications.items[0].metadata.content);
  };
  return (
    <>
      <CssBaseline />
      <Grid sx={{ mt: 5 }} container spacing={5}>
        <Grid item xs={12} md={8}>
          <Typography
            variant="h4"
            sx={{
              textAlign: 'left',
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#fffffe',
            }}
            gutterBottom
          >
            Trendings
          </Typography>
          {data1 &&
            data1.map((obj) => {
              const { metadata, id, createdAt } = obj;
              const date = new Date(createdAt);
              return (
                <SmallBlogCard
                  content={compiler(String(metadata.content).slice(0, 80))}
                  title={metadata.name}
                  img={metadata.media[0].original.url}
                  date={String(date).slice(3, 10)}
                  key={id}
                  id={id}
                />
              );
            })}
          {data2 &&
            data2.map((obj) => {
              const { metadata, id, createdAt } = obj;
              const date = new Date(createdAt);
              return (
                <SmallBlogCard
                  content={compiler(String(metadata.content).slice(0, 80))}
                  title={metadata.name}
                  img={metadata.media[0].original.url}
                  date={String(date).slice(3, 10)}
                  key={id}
                  id={id}
                />
              );
            })}
          {data3 &&
            data3.map((obj) => {
              const { metadata, id, createdAt } = obj;
              const date = new Date(createdAt);
              return (
                <SmallBlogCard
                  content={compiler(String(metadata.content).slice(0, 80))}
                  title={metadata.name}
                  img={metadata.media[0].original.url}
                  date={String(date).slice(3, 10)}
                  key={id}
                  id={id}
                />
              );
            })}
        </Grid>
        <Grid item xs={12} md={4}>
          <Sidebar />
        </Grid>
      </Grid>
    </>
  );
};

export default Trendings;
