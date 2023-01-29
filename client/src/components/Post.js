import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export const Post = ({ post }) => {
  return (
    <Box style={{ width: '60%' }}>
      <Card variant='outlined'>
        <CardContent>
          <CardHeader>{post.title}</CardHeader>
          <a href={post.post_url}>{post.post_url} target='_blank'</a>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Post;
