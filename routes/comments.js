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
  try {
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
  } catch (e) {
    console.log(e)
    // NOTE: The status code 500 is intentional; it is thought as a general placeholder indicates that an error exists
    res.status(500).send(e.message)
  }
})

/* Update a comment */
const updateComment = async (req, res, next) => {
  const commentId = parseInt(req.params.id)
  const comment = req.body.comment
  try {
    await Comment.update(
      comment,
      {
        where: {
          id: commentId
        }
      }
    )
    res.sendStatus(200)
  } catch (e) {
    console.log(e)
    // NOTE: The status code 500 is intentional; it is thought as a general placeholder indicates that an error exists
    res.status(500).send(e.message)
  }
}
router.patch('/:id', updateComment)
router.put('/:id', updateComment)



router.get('/destroy', async (req, res, next) => {
  await Comment.destroy({ truncate: true })
  res.send('Oldu')
})



module.exports = router
