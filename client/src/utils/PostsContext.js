import React, { createContext, useReducer, useContext, useEffect } from 'react';
import API from './API';

const PostsContext = createContext({
  posts: [],
});
const { Provider } = PostsContext;

const postsReducer = (state, action) => {
  switch (action.type) {
    case 'setPosts':
      state.posts = action.payload
      return state;
    case 'updatePost':
      const updatedPost = state.posts.find(
        (p) => p.id === action.payload.postID
      );
      state.posts.splice(
        state.posts.indexOf(updatedPost),
        1,
        action.payload.updatedPost
      );
      return state;
    default:
      return state;
  }
};

const PostsProvider = ({ value = {}, ...props }) => {
  const [state, dispatch] = useReducer(postsReducer, { posts: [] });
  useEffect(() => {
    API.getAllPosts()
      .then((res) => {
        dispatch({
          type: 'setPosts',
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

  return <Provider value={{ state, dispatch }} {...props} />;
};

const usePostsContext = () => useContext(PostsContext);

export { PostsProvider, usePostsContext };
