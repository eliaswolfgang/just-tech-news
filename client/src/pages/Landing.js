import { useUserContext } from '../utils/UserContext';
import { usePostsContext } from '../utils/PostsContext';
import Post from '../components/Post';
import NewPost from '../components/NewPost';

export const Landing = () => {
  const {
    state: { user },
  } = useUserContext();

  const { posts, refresh, setRefresh } = usePostsContext();

  return (
    <>
      {user && (
        <>
          <NewPost refresh={refresh} setRefresh={setRefresh} />
          {!!posts.length &&
            posts.map((post) => (
              <Post
                key={post.id}
                post={post}
                refresh={refresh}
                setRefresh={setRefresh}
              />
            ))}
        </>
      )}
    </>
  );
};

export default Landing;
