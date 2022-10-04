'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Comment.belongsTo(Comment, { foreignKey: 'parent_comment_id' })
      Comment.hasMany(Comment, { foreignKey: 'parent_comment_id' })
    }
  }
  Comment.init({
    username: DataTypes.STRING,
    avatar: DataTypes.STRING,
    comment_date: DataTypes.DATE,
    comment_text: DataTypes.TEXT,
    upvotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    parent_comment_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment'
  })
  return Comment
}
