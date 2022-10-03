'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.STRING
      },
      comment_date: {
        type: Sequelize.DATE
      },
      comment_text: {
        type: Sequelize.TEXT
      },
      upvotes: {
        type: Sequelize.INTEGER
      },
      parent_comment_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    await queryInterface.addConstraint('Comments', {
      fields: ['parent_comment_id'],
      type: 'foreign key',
      name: 'comment_comment_association',
      references: {
        table: 'Comments',
        field: 'id'
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Comments')
    await queryInterface.removeConstraint('Comments')
  }
}
