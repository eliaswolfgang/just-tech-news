const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  type Vote {
    id: Int
    user_id: Int
    post_id: Int
  }

  type Comment {
    id: Int
    comment_text: String
    user: User
    post_id: Int
    createdAt: String
    updatedAt: String
  }

  type Post {
    id: Int
    title: String
    post_url: String
    createdAt: Date
    comments: [Comment]
    votes: [Vote]
    user: User
  }

  type User {
    id: Int
    username: String
    email: String
    posts: [Post]
    voted_posts: [Post]
    comments: [Comment]
  }

  type Auth {
    message: String
    user: User
  }

  type Query {
    getUsers: [User]
    getUser(id: Int!): User
    getPosts: [Post]
    getPost(post_id: Int!): Post
    getComments: [Comment]
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): Auth
    updateUser(id: Int!, email: String, password: String): User
    deleteUser(id: Int!): User
    createPost(title: String!, post_url: String!, user_id: Int!): Post
    upvote(user_id: Int!, post_id: Int): Post
    updatePost(post_id: Int!, title: String, post_url: String): Post
    deletePost(post_id: Int!): Post
    createComment(comment_text: String!, user_id: Int!, post_id: Int!): Comment
    deleteComment(comment_id: Int!): Comment
  }
`;

module.exports = typeDefs;
