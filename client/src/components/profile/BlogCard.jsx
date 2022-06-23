import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import { CardMedia, Link } from '@mui/material';
import { compiler } from 'markdown-to-jsx';

function BlogCard(props) {
  return (
    <Grid item xs={12} md={6}>
      <CardActionArea>
        <Card sx={{ display: 'flex', backgroundColor: '#242629' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" sx={{ color: '#fffffe' }} variant="h5">
              {props.title}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#fffffe' }} color="text.secondary">
              {props.date}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#94a1b2' }} paragraph>
              {compiler(String(props.content).slice(0, 60))}....
            </Typography>
            <Link style={{ textDecoration: 'none' }} href={`/${props.id}/article`}>
              <Typography sx={{ color: '#7f5af0' }} variant="subtitle1" color="primary">
                Continue reading...
              </Typography>
            </Link>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={props.img}
            alt="Post Title"
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}

export default BlogCard;
