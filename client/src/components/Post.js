import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export const Post = ({ post }) => {
  return (
    <Box style={{ width: '60%' }}>
      <Card variant='outlined'>
        <CardContent>
          <h2>{post.title}</h2>
          <p>{post.post_url}</p>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Post;
