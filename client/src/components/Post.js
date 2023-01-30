import React, { useState } from 'react';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import TextField from '@mui/material/TextField';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Divider from '@mui/material/Divider';
import API from '../utils/API';
import { useUserContext } from '../utils/UserContext';
import { DateFilter } from '../utils/Functions';

export const Post = ({ post, refresh, setRefresh }) => {
  const {
    state: { user },
  } = useUserContext();
  const [commentMode, setCommentMode] = useState({
    [post.id]: { open: false, comment: '' },
  });
  const submitComment = async () => {
    if (!commentMode[post.id].comment) return;
    try {
      const commentData = {
        user_id: user.id,
        post_id: post.id,
        comment_text: commentMode[post.id].comment,
      };
      const response = await API.createComment(commentData);
      console.log(response);
      if (response.data.id) {
        setRefresh(!refresh);
        setCommentMode((prev) => ({
          ...prev,
          [post.id]: { open: true, comment: '' },
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };
  const submitUpvote = async () => {
    try {
      const upvoteData = {
        user_id: user.id,
        post_id: post.id,
      };
      const response = await API.upvotePost(upvoteData);
      if (response.data.id) {
        setCommentMode((prev) => ({
          ...prev,
          [post.id]: { open: true, comment: '' },
        }));
        setRefresh(!refresh);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Card style={{ margin: '1rem', padding: '1rem 1rem 0rem 1rem' }}>
      <CardHeader title={post.title} />
      {post?.user?.username && (
        <Typography sx={{ m: 0.5, pl: 2 }} color='text.secondary'>
          Posted by {post.user.username} on {DateFilter(post.created_at)}
        </Typography>
      )}
      <CardContent>
        <a href={post.post_url} rel='noreferrer' target='_blank'>
          {post.post_url}
        </a>
        <Divider style={{ paddingTop: '2rem' }} />
        <CardActions disableSpacing>
          <IconButton aria-label='like' onClick={submitUpvote}>
            <FavoriteIcon />
          </IconButton>
          {!!post.vote_count && (
            <Typography variant='body2' color='text.secondary'>
              {post.vote_count} {post.vote_count === 1 ? 'like' : 'likes'}
            </Typography>
          )}
          <IconButton
            aria-label='comment'
            onClick={() =>
              setCommentMode((prev) => ({
                ...prev,
                [post.id]: { open: !prev[post.id].open, comment: '' },
              }))
            }
          >
            <QuestionAnswerIcon />
          </IconButton>
          {!!post.comments?.length && (
            <Typography variant='body2' color='text.secondary'>
              {post.comments.length}{' '}
              {post.comments.length === 1 ? 'comment' : 'comments'}
            </Typography>
          )}
        </CardActions>
      </CardContent>
      {commentMode[post.id].open && (
        <>
          {!!post.comments?.length &&
            post.comments.map((comment) => (
              <React.Fragment key={comment.id}>
                <Box style={{ marginBottom: '1.5rem' }}>
                  <TextField fullWidth value={comment.comment_text} disabled />
                  <Typography
                    variant='body3'
                    color='text.secondary'
                    style={{ float: 'right' }}
                  >
                    Commented by {comment.user?.username} on{' '}
                    {DateFilter(comment.created_at)}
                  </Typography>
                </Box>
              </React.Fragment>
            ))}
          <TextField
            type='textarea'
            label='Add a comment...'
            style={{ width: '90%', marginBottom: '1.5rem' }}
            value={commentMode[post.id].comment}
            onChange={(e) => {
              setCommentMode((prev) => ({
                ...prev,
                [post.id]: { open: true, comment: e.target.value },
              }));
            }}
          />
          <AddCircleIcon
            onClick={submitComment}
            style={{
              width: '10%',
              paddingTop: '1rem',
            }}
          />
        </>
      )}
    </Card>
  );
};

export default Post;
