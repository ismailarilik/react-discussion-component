const express = require('express')
const { Comment } = require('../models')

const router = express.Router()

/* GET comments listing. */
router.get('/', async (req, res, next) => {
  const comments = await Comment.findAll()
  res.send({
    comments: comments.map(comment => ({
      id: comment.id,
      username: comment.username,
      avatar: comment.avatar,
      commentDate: comment.comment_date,
      commentText: comment.comment_text,
      upvotes: comment.upvotes,
      parentCommentId: comment.parent_comment_id
    }))
  })
})

/* Create a comment */
router.post('/', async (req, res, next) => {
  const commentPayload = req.body.comment
  const comment = await Comment.create({
    username: commentPayload.username,
    avatar: commentPayload.avatar,
    comment_date: commentPayload.commentDate,
    comment_text: commentPayload.commentText,
    upvotes: commentPayload.upvotes,
    parent_comment_id: commentPayload.parentCommentId
  })
  res.send({
    comment: {
      username: comment.username,
      avatar: comment.avatar,
      commentDate: comment.comment_date,
      commentText: comment.comment_text,
      upvotes: comment.upvotes,
      parentCommentId: comment.parent_comment_id
    }
  })
})

module.exports = router
