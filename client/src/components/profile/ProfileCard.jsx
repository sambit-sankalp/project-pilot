import React from 'react';

// Libraries
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Stack,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Facebook, Instagram, Mail, Twitter } from '@mui/icons-material';

const UserCard = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Card className={classes.card}>
        <CardContent>
          <Grid container>
            <Grid item md={4} sm={12} className={classes.gridPadding}>
              <img
                className={classes.profileImage}
                src="https://res.cloudinary.com/tedxnitrourkela/image/upload/v1643281545/team/technical/Sambit_Sankalp_omdbgy.png"
                alt="Sambit Sankalp"
              />
              <Stack direction="row" spacing={2} sx={{ mt: 2, width: '100%' }}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ backgroundColor: '#7f5af0' }}
                >
                  Follow
                </Button>
                <Button fullWidth variant="outlined" sx={{ color: '#7f5af0' }}>
                  Subscribe
                </Button>
              </Stack>
            </Grid>
            <Grid item md={8} sm={12} className={classes.gridPadding}>
              <div className={classes.userData}>
                <div className={classes.columnFlex}>
                  <div className={classes.userName}>
                    <Typography variant="h4" sx={{ color: '#fffffe' }}>
                      Sambit Sankalp
                    </Typography>
                  </div>
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ mt: 2, color: '#fffffe' }}
                  >
                    <Typography variant="h6">
                      <span style={{ fontWeight: 700 }}>100</span> followers
                    </Typography>
                    <Typography variant="h6">
                      <span style={{ fontWeight: 700 }}>45</span> posts
                    </Typography>
                    <Typography variant="h6">
                      <span style={{ fontWeight: 700 }}>67</span> subscribers
                    </Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ mt: 2, color: '#fffffe' }}
                  >
                    <Typography variant="h6">
                      <span style={{ fontWeight: 700 }}>Genre</span> -{' '}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        backgroundColor: '#7f5af0',
                        color: '#fffffe',
                        py: 0.5,
                        px: 2,
                        borderRadius: '10%',
                      }}
                    >
                      Tech
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        backgroundColor: '#7f5af0',
                        color: '#fffffe',
                        py: 0.5,
                        px: 2,
                        borderRadius: '10%',
                      }}
                    >
                      Design
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        backgroundColor: '#7f5af0',
                        color: '#fffffe',
                        py: 0.5,
                        px: 2,
                        borderRadius: '10%',
                      }}
                    >
                      Bussiness
                    </Typography>
                  </Stack>
                  <Typography
                    sx={{ mt: 3.5, color: '#94a1b2' }}
                    variant="body1"
                  >
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Quos blanditiis tenetur unde suscipit, quam beatae rerum
                    inventore consectetur, neque doloribus, cupiditate numquam
                    dignissimos laborum fugiat deleniti? Eum quasi quidem
                    quibusdam.Lorem ipsum dolor sit amet, consectetur
                    adipisicing elit. Quos blanditiis tenetur unde suscipit,
                    quam beatae rerum inventore consectetur, neque doloribus,
                    cupiditate numquam dignissimos laborum fugiat deleniti? Eum
                    quasi quidem quibusdam.
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ mt: 4, justifyContent: 'flex-end' }}
                  >
                    <IconButton aria-label="delete" sx={{ color: '#7f5af0' }}>
                      <Facebook />
                    </IconButton>
                    <IconButton aria-label="delete" sx={{ color: '#7f5af0' }}>
                      <Instagram />
                    </IconButton>
                    <IconButton
                      aria-label="add an alarm"
                      sx={{ color: '#7f5af0' }}
                    >
                      <Twitter />
                    </IconButton>
                    <IconButton
                      aria-label="add to shopping cart"
                      sx={{ color: '#7f5af0' }}
                    >
                      <Mail />
                    </IconButton>
                  </Stack>
                </div>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};
export default UserCard;

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    minHeight: '550px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    padding: '10px 0px',
    paddingTop: '20px',
    backgroundColor: '#242629',
  },
  boldText: {
    fontFamily: 'Source Sans Pro',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: '16px',
  },
  gridPadding: {
    width: '100%',
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
    [theme.breakpoints.down('md')]: {
      marginTop: '2rem',
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '1rem',
      paddingRight: '1rem',
    },
  },
  userWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  profileImage: {
    height: 'auto',
    width: '100%',
  },
  columnFlex: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '100%',
  },
  userName: {
    [theme.breakpoints.down('lg')]: {
      textAlign: 'center',
    },
  },
  postDetailsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  postDetails: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  postInfo: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('lg')]: {
      fontSize: '1.5rem',
      alignText: 'center',
    },
  },
  postInfoNumber: {
    alignSelf: 'center',
    marginTop: '20px',
  },
  socialIcon: {
    maxWidth: '60%',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '2px',
    fontSize: '20px',
  },
}));
