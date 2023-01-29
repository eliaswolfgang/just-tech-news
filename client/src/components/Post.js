import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Divider from '@mui/material/Divider';

export const Post = ({ post }) => {
  return (
    <Card style={{ width: '50%', margin: '1rem' }}>
      <CardHeader title={post.title} />
      <Typography sx={{ m: 0.5, pl: 2 }} color='text.secondary'>
        Posted by {post.user.username}
      </Typography>
      <CardContent>
        <a href={post.post_url} rel='noreferrer' target='_blank'>
          {post.post_url}
        </a>
        <Divider style={{ paddingTop: '2rem' }} />
        <CardActions disableSpacing>
          <IconButton aria-label='add to favorites'>
            <FavoriteIcon />
          </IconButton>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default Post;
