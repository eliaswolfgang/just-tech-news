const { Model, DataTypes } = require('sequelize');
const Vote = require('./Vote');
const sequelize = require('../config/connection');

class Post extends Model {
  static async upvote(body) {
    let upvote = await Vote.create({
      user_id: body.user_id,
      post_id: body.post_id,
    });
    if (upvote) {
      return Post.findOne({
        where: {
          id: body.post_id,
        },
        attributes: [
          'id',
          'post_url',
          'title',
          'createdAt',
          [
            sequelize.literal(
              `(SELECT COUNT(*) FROM vote WHERE vote.post_id = ${body.post_id} )`
            ),
            'vote_count',
          ],
        ],
      });
    }
  }
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_url: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isURL: true,
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    timestamps: true,
    modelName: 'post',
  }
);

module.exports = Post;
