import React, { createContext, useState, useContext, useEffect } from 'react';
import API from './API';

const PostsContext = createContext({});
const { Provider } = PostsContext;

const PostsProvider = ({ ...props }) => {
  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const getPosts = async () => {
      const allPosts = await API.getAllPosts();
      setPosts(allPosts.data);
    };
    getPosts();
  }, [refresh]);

  return (
    <Provider value={{ posts, setPosts, refresh, setRefresh }} {...props} />
  );
};

const usePostsContext = () => useContext(PostsContext);

export { PostsProvider, usePostsContext };
