import { useUserContext } from '../utils/UserContext';
import { usePostsContext } from '../utils/PostsContext';
import Post from '../components/Post';
export const UserPosts = () => {
  const { posts, refresh, setRefresh } = usePostsContext();
  const {
    state: { user },
  } = useUserContext();
  console.log(posts);
  return (
    <>
      {user && (
        <>
          {!!posts.length &&
            posts
              .filter((post) => post.user.id === user.id)
              .map((post) => (
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

export default UserPosts;
