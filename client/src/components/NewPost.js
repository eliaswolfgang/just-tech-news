import { useReducer } from 'react';
import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { useUserContext } from '../utils/UserContext';
// import API from '../utils/API';

export const NewPost = () => {
  const {
    state: { user },
  } = useUserContext();

  const newPostReducer = (state, action) => {
    switch (action.type) {
      case 'fieldSet':
        return { ...state, [action.field]: action.payload };
      default:
        return state;
    }
  };

  const [newPostState, newPostDispatch] = useReducer(newPostReducer, {
    title: '',
    post_url: '',
  });
  return (
    <Card style={{ width: '50%', margin: '1rem' }}>
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
      </CardContent>
    </Card>
  );
};

export default NewPost;
