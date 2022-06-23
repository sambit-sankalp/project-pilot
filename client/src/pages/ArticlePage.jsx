/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Main from './Main';
import Sidebar from './Sidebar';
import { useParams } from 'react-router-dom';
import { getPublication } from '../Lens/query';

export default function Blog() {
  const [data, setData] = useState();

  const { pubId } = useParams();

  useEffect(() => {
    handlePub();
    //console.log(String(pubId).slice(0,6))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handlePub = async () => {
    const res = await getPublication(pubId);
    setData(res.data.publication);
    //console.log(res.data);

    //setData(res.data.publications.items);
    //console.log(res.data.publications.items[0].metadata.content);
  };

  return (
    <Container maxWidth="lg" sx={{ my: 10, mt: 9 }}>
      <CssBaseline />
      <main>
        <Grid container spacing={5} sx={{ mt: 3 }}>
          {data && (
            <Main
              title={data.metadata.name}
              content={data.metadata.content}
              img={data.metadata.media[0].original.url}
              date={String(new Date(data.createdAt)).slice(3, 15)}
            />
          )}
          {data && (
            <Sidebar
              bio={data.profile.bio}
              name={data.profile.name}
              img={data.profile.picture.original.url}
              id={data.profile.id}
              pubId={pubId}
            />
          )}
        </Grid>
      </main>
    </Container>
  );
}
