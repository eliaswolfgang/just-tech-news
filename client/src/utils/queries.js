import { gql } from '@apollo/client';

export const getAllUsers = gql`
  query GetUsers {
    getUsers {
      id
      username
      email
      posts {
        id
        title
        post_url
        createdAt
        votes {
          id
        }
        comments {
          id
          comment_text
          user_id
          post_id
          createdAt
          updatedAt
        }
      }
    }
  }
`;

export const getSingleUser = gql`
  query GetUser($getUserId: Int!) {
    getUser(id: $getUserId) {
      id
      username
      email
      posts {
        title
        post_url
        id
        createdAt
        vote_count
        comments {
          post_id
          user_id
          id
          createdAt
          updatedAt
          comment_text
        }
      }
    }
  }
`;

export const getAllPosts = gql`
  query GetPosts {
    getPosts {
      title
      post_url
      id
      createdAt
      votes {
        id
      }
      user {
        id
        username
      }
      comments {
        comment_text
        id
        post_id
        user {
          username
        }
        createdAt
        updatedAt
      }
    }
  }
`;

export const getSinglePost = gql`
  query GetPost($id: Int!) {
    getPost(post_id: $id) {
      id
      title
      post_url
      createdAt
      votes {
        id
      }
      user {
        id
      }
      comments {
        id
        post_id
        user_id
        createdAt
        updatedAt
        comment_text
      }
    }
  }
`;
