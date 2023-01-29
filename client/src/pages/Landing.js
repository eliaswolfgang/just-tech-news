import { useUserContext } from '../utils/UserContext';
import { usePostsContext } from '../utils/PostsContext';
import Post from '../components/Post';

export const Landing = () => {
  const {
    state: { user },
  } = useUserContext();

  const {
    state: { posts },
  } = usePostsContext();

  return (
    <>
      {user && <div>This will be the landing page for {user.username}</div>}
      <div>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </>
  );
};

export default Landing;
