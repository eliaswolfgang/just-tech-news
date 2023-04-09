const { User, Post, Comment, Vote } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const sequelize = require('sequelize');

const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        const users = await User.findAll({
          attributes: { exclude: ['password'] },
          include: [
            {
              model: Post,
              attributes: ['id', 'title', 'post_url', 'createdAt'],
            },
            {
              model: Comment,
              attributes: ['id', 'comment_text', 'createdAt'],
              include: {
                model: Post,
                attributes: ['title'],
              },
            },
            {
              model: Post,
              attributes: ['title'],
              through: Vote,
              as: 'voted_posts',
            },
          ],
        });
        return users;
      } catch (err) {
        console.error(err);
      }
    },
    getUser: async (parent, { id }) => {
      try {
        const user = await User.findOne({
          attributes: { exclude: ['password'] },
          where: {
            id: id,
          },
          include: [
            {
              model: Post,
              attributes: ['id', 'title', 'post_url', 'createdAt'],
            },
            {
              model: Comment,
              attributes: ['id', 'comment_text', 'createdAt'],
              include: {
                model: Post,
                attributes: ['title'],
              },
            },
            {
              model: Post,
              attributes: ['title'],
              through: Vote,
              as: 'voted_posts',
            },
          ],
        });
        return user;
      } catch (err) {
        console.error(err);
      }
    },
    getPosts: async () => {
      try {
        const posts = await Post.findAll({
          attributes: ['id', 'post_url', 'title', 'createdAt'],
          order: [['createdAt', 'DESC']],
          include: [
            {
              model: Comment,
              attributes: [
                'id',
                'comment_text',
                'post_id',
                'user_id',
                'createdAt',
              ],
              order: [['createdAt', 'DESC']],
              include: {
                model: User,
                attributes: ['username'],
              },
            },
            {
              model: User,
              attributes: ['id', 'username', 'email'],
            },
            {
              model: Vote,
              attributes: ['id', 'user_id', 'post_id'],
            },
          ],
        });
        return posts;
      } catch (err) {
        console.error(err);
      }
    },
    getPost: async (parent, { post_id }) => {
      try {
        const post = await Post.findOne({
          where: {
            id: post_id,
          },
          attributes: ['id', 'post_url', 'title', 'createdAt'],
          include: [
            {
              model: Comment,
              attributes: [
                'id',
                'comment_text',
                'post_id',
                'user_id',
                'createdAt',
              ],
              order: [['createdAt', 'DESC']],
              include: {
                model: User,
                attributes: ['username'],
              },
            },
            {
              model: User,
              attributes: ['id', 'username', 'email'],
            },
            {
              model: Vote,
              attributes: ['id', 'user_id', 'post_id'],
            },
          ],
        });
        return post;
      } catch (err) {
        console.error(err);
      }
    },
  },
  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });
        return user;
      } catch (err) {
        console.error(err);
      }
    },
    login: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
          throw new AuthenticationError('Incorrect credentials');
        }
        const correctPw = await user.checkPassword(password);
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }

        return { message: `Logged in as ${user.username}`, user };
      } catch (err) {
        console.error(err);
        throw new AuthenticationError('Incorrect credentials');
      }
    },
    updateUser: async (parent, { id, email, password }) => {
      try {
        const user = await User.update(
          { email, password },
          {
            individualHooks: true,
            where: { id: id },
          }
        );
        return user;
      } catch (err) {
        console.error(err);
      }
    },
    deleteUser: async (parent, { id }) => {
      try {
        const user = await User.destroy({
          where: { id: id },
        });
        return user;
      } catch (err) {
        console.error(err);
      }
    },
    createPost: async (parent, { title, post_url, user_id }) => {
      try {
        const post = await Post.create({
          title,
          post_url,
          user_id,
        });
        return post.dataValues;
      } catch (err) {
        console.error(err);
      }
    },
    upvote: async (parent, { user_id, post_id }) => {
      try {
        const vote = await Post.upvote({ user_id, post_id });
        return vote;
      } catch (err) {
        console.error(err);
      }
    },
    updatePost: async (parent, { post_id, title, post_url }) => {
      try {
        const post = await Post.update(
          { title, post_url },
          {
            where: { id: post_id },
          }
        );
        return post;
      } catch (err) {
        console.error(err);
      }
    },
    deletePost: async (parent, { post_id }) => {
      try {
        const post = await Post.destroy({
          where: { id: post_id },
        });
        return post;
      } catch (err) {
        console.error(err);
      }
    },
    createComment: async (parent, { comment_text, user_id, post_id }) => {
      try {
        const comment = await Comment.create({
          comment_text,
          user_id,
          post_id,
        });
        return comment;
      } catch (err) {
        console.error(err);
      }
    },
    deleteComment: async (parent, { comment_id }) => {
      try {
        const comment = await Comment.destroy({
          where: { id: comment_id },
        });
        return comment;
      } catch (err) {
        console.error(err);
      }
    },
  },
};

module.exports = resolvers;
