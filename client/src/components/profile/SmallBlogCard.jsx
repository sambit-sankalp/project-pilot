import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import { CardMedia, Link } from '@mui/material';
// import { Link } from 'react-router-dom';

function SmallBlogCard({ title, content, id, img, date }) {
  return (
    <Grid item xs={12} md={12} sx={{ my: 2 }}>
      <CardActionArea>
        <Card sx={{ display: 'flex', backgroundColor: '#242629' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h5" sx={{ color: '#fffffe' }} variant="h5">
              {title}
            </Typography>
            <Typography variant="body2" sx={{ color: '#fffffe' }} color="text.secondary">
              {date}
            </Typography>
            <Typography variant="body2" sx={{ color: '#94a1b2' }}>
              {content}....
            </Typography>
            <Link style={{ textDecoration: 'none' }} href={`/${id}/article`}>
              <Typography variant="body2" sx={{ color: '#7f5af0' }} color="primary">
                Continue...
              </Typography>
            </Link>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={`${img}`}
            alt="Post Title"
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}

export default SmallBlogCard;
