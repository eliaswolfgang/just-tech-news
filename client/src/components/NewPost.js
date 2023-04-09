import { useReducer, useState } from 'react';
import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { useUserContext } from '../utils/UserContext';
import CardActions from '@mui/material/CardActions';
import AddCircleIcon from '@mui/icons-material/AddCircle';
// import API from '../utils/API';
import ErrorToast from './ErrorToast';
import { useMutation } from '@apollo/client';
import { createNewPost } from '../utils/mutations';
import { getAllPosts } from '../utils/queries';

export const NewPost = ({ refresh, setRefresh }) => {
  const {
    state: { user },
  } = useUserContext();
  const [createPost] = useMutation(createNewPost);
  const newPostReducer = (state, action) => {
    switch (action.type) {
      case 'fieldSet':
        return { ...state, [action.field]: action.payload };
      case 'reset':
        state = { title: '', post_url: '' };
        return state;
      default:
        return state;
    }
  };

  const [newPostState, newPostDispatch] = useReducer(newPostReducer, {
    title: '',
    post_url: '',
  });

  const [error, setError] = useState(false);

  const submitPost = async (e) => {
    e.preventDefault();
    if (!newPostState.title || !newPostState.post_url) {
      e.stopPropagation();
      setError(true);
      return;
    }
    setError(false);
    try {
      const { data } = await createPost({
        variables: {
          title: newPostState.title,
          post_url: newPostState.post_url ?? null,
          user_id: user.id,
        },
        refetchQueries: [{ query: getAllPosts }, 'getAllPosts'],
      });
      if (data) {
        setRefresh(!refresh);
        newPostDispatch({ type: 'reset' });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Card style={{ margin: '1rem', padding: '1rem' }}>
        <CardHeader title={`What's up, ${user.username}?`} />
        <CardContent>
          <TextField
            type='textarea'
            label='Share your thoughts!'
            fullWidth
            value={newPostState.title}
            onChange={(e) => {
              newPostDispatch({
                type: 'fieldSet',
                field: 'title',
                payload: e.target.value,
              });
            }}
          />
          <TextField
            style={{ marginTop: '1rem' }}
            type='textarea'
            label='Share a link!'
            value={newPostState.post_url}
            fullWidth
            onChange={(e) => {
              newPostDispatch({
                type: 'fieldSet',
                field: 'post_url',
                payload: e.target.value,
              });
            }}
          />
          <CardActions style={{ float: 'right' }}>
            <AddCircleIcon onClick={submitPost} />
          </CardActions>
        </CardContent>
      </Card>
      <ErrorToast
        props={{
          open: error,
          message: 'Please fill out all fields to create a new post!',
        }}
      />
    </>
  );
};

export default NewPost;
