import React, { createContext, useState, useContext, useEffect } from 'react';
import API from './API';

const PostsContext = createContext({});
const { Provider } = PostsContext;

const PostsProvider = ({ ...props }) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      const allPosts = await API.getAllPosts();
      setPosts(allPosts.data);
    };
    getPosts();
  }, []);

  return <Provider value={{ posts, setPosts }} {...props} />;
};

const usePostsContext = () => useContext(PostsContext);

export { PostsProvider, usePostsContext };
