import { useUserContext } from '../utils/UserContext';
import { usePostsContext } from '../utils/PostsContext';
import Post from '../components/Post';
import NewPost from '../components/NewPost';

export const Landing = () => {
  const {
    state: { user },
  } = useUserContext();

  const { posts, setPosts } = usePostsContext();

  return (
    <>
      {user && (
        <>
          <NewPost setPosts={setPosts} />
          {!!posts.length &&
            posts.map((post) => <Post key={post.id} post={post} />)}
        </>
      )}
    </>
  );
};

export default Landing;
