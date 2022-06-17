import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Link } from 'react-router-dom';

function BlogCard() {
  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex', backgroundColor: '#242629' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" sx={{ color: '#fffffe' }} variant="h5">
              Post Title
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ color: '#fffffe' }}
              color="text.secondary"
            >
              Nov 11
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#94a1b2' }} paragraph>
              Cum sociis natoque penatibus et magnis dis parturient montes,
              nascetur ridiculus mus
            </Typography>
            <Link style={{ textDecoration: 'none' }} to="/article">
              <Typography
                sx={{ color: '#7f5af0' }}
                variant="subtitle1"
                color="primary"
              >
                Continue reading...
              </Typography>
            </Link>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image="https://res.cloudinary.com/sambitsankalp/image/upload/v1655063242/hackathons/creative-workplace-with-computer-monitor-empty-no-people-cabinet-vector-id1165699436_qdf5yf.jpg"
            alt="Post Title"
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}

export default BlogCard;
