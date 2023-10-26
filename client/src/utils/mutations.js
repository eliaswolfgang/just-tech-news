import { gql } from '@apollo/client';

export const createNewUser = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      email
      id
      username
    }
  }
`;

export const loginUser = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      message
      user {
        id
        email
        username
      }
    }
  }
`;

export const updateSingleUser = gql`
  mutation UpdateUser($id: Int!, $email: String, $password: String) {
    updateUser(id: $id, email: $email, password: $password) {
      id
      email
      username
    }
  }
`;

export const deleteSingleUser = gql`
  mutation DeleteUser($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

export const createNewPost = gql`
  mutation CreatePost($title: String!, $post_url: String!, $user_id: Int!) {
    createPost(title: $title, post_url: $post_url, user_id: $user_id) {
      createdAt
      id
      post_url
      title
    }
  }
`;

export const upvotePost = gql`
  mutation Upvote($user_id: Int!, $post_id: Int) {
    upvote(user_id: $user_id, post_id: $post_id) {
      id
      title
      post_url
      votes {
        id
      }
    }
  }
`;

export const updateSinglePost = gql`
  mutation UpdatePost($post_id: Int!, $title: String, $post_url: String) {
    updatePost(post_id: $post_id, title: $title, post_url: $post_url) {
      id
      title
      post_url
      createdAt
      updatedAt
      votes {
        id
      }
      user {
        id
      }
    }
  }
`;

export const deleteSinglePost = gql`
  mutation DeletePost($post_id: Int!) {
    deletePost(post_id: $post_id) {
      id
    }
  }
`;

export const createNewComment = gql`
  mutation CreateComment(
    $comment_text: String!
    $user_id: Int!
    $post_id: Int!
  ) {
    createComment(
      comment_text: $comment_text
      user_id: $user_id
      post_id: $post_id
    ) {
      comment_text
      createdAt
      id
      post_id
      updatedAt
      user {
        username
      }
    }
  }
`;

export const deleteSingleComment = gql`
  mutation DeleteComment($comment_id: Int!) {
    deleteComment(comment_id: $comment_id) {
      id
    }
  }
`;
