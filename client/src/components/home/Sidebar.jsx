/*eslint-disable*/
import React, { useEffect, useState, useContext } from 'react';
import { Typography, Paper, Stack, Avatar } from '@mui/material';
import SmallBlogCard from '../profile/SmallBlogCard';
import { Link } from 'react-router-dom';
import { getProfiles } from '../../Lens/query';
import Web3Context from '../../context';
import { getPublications } from '../../Lens/query';
import { compiler } from 'markdown-to-jsx';

const Sidebar = () => {
  const { profileId } = useContext(Web3Context);
  const [data, setData] = useState([]);
  const [recent, setRecent] = useState([]);
  useEffect(() => {
    getProfile();
    handlePub();
    handlePub2();
  }, [profileId]);
  const [data1, setData1] = useState([]);

  const handlePub = async () => {
    const obj = {
      profileId: '0x2eae',
      publicationTypes: ['POST'],
      limit: 1,
    };
    const res = await getPublications(obj);
    setData1(res.data.publications.items.length ? res.data.publications.items : null);
    //console.log(res)
    //console.log(res.data.publications.items[0].metadata.content);
  };
  const handlePub2 = async () => {
    const obj = {
      profileId: profileId ? profileId : '0x2eee',
      publicationTypes: ['POST'],
      limit: 1,
    };
    const res = await getPublications(obj);
    setRecent(res.data.publications.items.length ? res.data.publications.items : null);
    //console.log(res)
    //console.log(res.data.publications.items[0].metadata.content);
  };

  const getProfile = async () => {
    //console.log(account)
    const a = {
      profileIds: ['0x2d5b', '0x2eae', '0x2eee'],
      limit: 50,
    };
    const res2 = await getProfiles(a);
    //console.log(res2.data.profiles.items);
    // const res = res2.data.profiles.items[0].name
    //   ? res2.data.profiles.items[0]
    //   : null;
    setData(res2.data.profiles.items);
    //console.log(res.coverPicture.original.url);
  };
  return (
    <>
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
        Popular Pilots
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: 2,
          bgcolor: 'grey.200',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          textAlign: 'left',
          backgroundColor: '#242629',
        }}
      >
        <Stack
          direction="column"
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          {data &&
            data.map(({ picture, id, name, handle }) => (
              <Link key={id} style={{ textDecoration: 'none' }} to={`/${id}/profile`}>
                <Stack
                  direction="column"
                  sx={{
                    color: '#fffffe',
                    py: 0.5,
                    px: 2,
                    mx: 0.5,
                    my: 1,
                    borderRadius: '10%',
                  }}
                >
                  <Stack direction="row" spacing={2}>
                    <Avatar alt={name} src={picture.original.url} />
                    <Stack direction="column">
                      <Typography variant="body1" sx={{ color: '#fffffe' }}>
                        {name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#bababa' }}>
                        {handle}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Link>
            ))}
        </Stack>
      </Paper>
      <Typography
        variant="h6"
        fontWeight={700}
        gutterBottom
        sx={{
          textAlign: 'left',
          fontSize: '2rem',
          fontWeight: 'bold',
          mt: 8,
          color: '#fffffe',
        }}
      >
        Recents
      </Typography>
      {recent &&
        recent.map((obj) => {
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
    </>
  );
};

export default Sidebar;
