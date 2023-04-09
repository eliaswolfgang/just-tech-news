import React, { createContext, useState, useContext, useEffect } from 'react';
import { useQuery } from '@apollo/client';
// import API from './API';
import { getAllPosts } from './queries';

const PostsContext = createContext({});
const { Provider } = PostsContext;

const PostsProvider = ({ ...props }) => {
  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { data } = useQuery(getAllPosts);
  useEffect(() => {
    if (data?.getPosts?.length) {
      setPosts(data.getPosts);
    } else {
      setPosts([]);
    }
  }, [data, refresh]);

  return (
    <Provider value={{ posts, setPosts, refresh, setRefresh }} {...props} />
  );
};

const usePostsContext = () => useContext(PostsContext);

export { PostsProvider, usePostsContext };
