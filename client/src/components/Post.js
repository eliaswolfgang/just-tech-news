export const Post = ({ post }) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.post_url}</p>
    </div>
  );
};

export default Post;
