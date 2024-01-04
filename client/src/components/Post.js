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
// import API from '../utils/API';
import { useUserContext } from '../utils/UserContext';
import { DateFilter } from '../utils/Functions';
import ErrorToast from './ErrorToast';
import { useMutation } from '@apollo/client';
import { createNewComment, upvotePost } from '../utils/mutations';
import { getAllPosts } from '../utils/queries';
import { FilledInput } from '@mui/material';

export const Post = ({ post, refresh, setRefresh }) => {
  const {
    state: { user },
  } = useUserContext();
  const [commentMode, setCommentMode] = useState({
    [post.id]: { open: false, comment: '' },
  });
  const [error, setError] = useState({ show: false, message: '' });
  const [createComment] = useMutation(createNewComment);
  const [upvote] = useMutation(upvotePost);

  const submitComment = async () => {
    if (!commentMode[post.id].comment) return;
    try {
      const commentData = {
        user_id: user.id,
        post_id: post.id,
        comment_text: commentMode[post.id].comment,
      };
      const { data } = await createComment({
        variables: { ...commentData },
        refetchQueries: [{ query: getAllPosts }, 'getAllPosts'],
      });
      // const response = await API.createComment(commentData);
      // console.log(response);
      if (data) {
        setRefresh(!refresh);
        setCommentMode((prev) => ({
          ...prev,
          [post.id]: { open: true, comment: '' },
        }));
      }
    } catch (err) {
      setError({ show: true, message: err.message });
      console.error(err);
    }
  };
  const submitUpvote = async () => {
    try {
      const { data } = await upvote({
        variables: {
          user_id: user.id,
          post_id: post.id,
        },
        refetchQueries: [{ query: getAllPosts }, 'getAllPosts'],
      });
      if (data) {
        if (!data.upvote) {
          setError({
            show: true,
            message: 'You have already upvoted this post',
          });
          return;
        }
        setCommentMode((prev) => ({
          ...prev,
          [post.id]: { open: true, comment: '' },
        }));
        setRefresh(!refresh);
      }
    } catch (err) {
      console.error(err);
      setError({ show: true, message: err.message });
    }
  };
  return (
    <>
      <Card style={{ margin: '1rem', padding: '1rem 1rem 0rem 1rem' }}>
        <CardHeader title={post.title} />
        {post?.user?.username && (
          <Typography sx={{ m: 0.5, pl: 2 }} color='text.secondary'>
            Posted by {post.user.username} on {DateFilter(post.createdAt)}
          </Typography>
        )}
        <CardContent>
          <a href={post.post_url} rel='noreferrer' target='_blank'>
            {post.post_url}
          </a>
          <Divider style={{ paddingTop: '2rem' }} />
          <CardActions disableSpacing>
            <IconButton aria-label='like' onClick={submitUpvote}>
              <FavoriteIcon
                color={
                  post.votes?.some((vote) => vote.user_id === user.id)
                    ? 'primary'
                    : ''
                }
              />
            </IconButton>
            {!!post.votes?.length && (
              <Typography
                variant='body2'
                color={
                  post.votes?.some((vote) => vote.user_id === user.id)
                    ? 'primary'
                    : 'secondary'
                }
              >
                {post.votes?.length}{' '}
                {post.votes?.length === 1 ? 'like' : 'likes'}
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
              <QuestionAnswerIcon
                color={
                  post.comments?.some((comment) => comment.user_id === user.id)
                    ? 'primary'
                    : ''
                }
              />
            </IconButton>
            {!!post.comments?.length && (
              <Typography
                variant='body2'
                color={
                  post.comments?.some((comment) => comment.user_id === user.id)
                    ? 'primary'
                    : ''
                }
              >
                {post.comments?.length}{' '}
                {post.comments?.length === 1 ? 'comment' : 'comments'}
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
                    <FilledInput
                      fullWidth
                      disableUnderline={true}
                      value={comment.comment_text}
                      disabled
                    />
                    <Typography
                      variant='body3'
                      color='text.primary'
                      style={{
                        float: 'right',
                        opacity: '0.6',
                        padding: '0.2rem',
                        margin: '0.2rem',
                      }}
                    >
                      Commented by {comment.user?.username} on{' '}
                      {DateFilter(comment.createdAt)}
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
      <ErrorToast props={{ open: error.show, message: error.message }} />
    </>
  );
};

export default Post;
