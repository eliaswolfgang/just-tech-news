import { useUserContext } from '../utils/UserContext';
import { usePostsContext } from '../utils/PostsContext';
import Post from '../components/Post';
import NewPost from '../components/NewPost';

export const Landing = () => {
  const {
    state: { user },
  } = useUserContext();

  const {
    state: { posts },
  } = usePostsContext();

  return (
    <>
      {user && (
        <>
          <NewPost />
          <div>
            {posts && posts.map((post) => <Post key={post.id} post={post} />)}
          </div>
        </>
      )}
    </>
  );
};

export default Landing;
