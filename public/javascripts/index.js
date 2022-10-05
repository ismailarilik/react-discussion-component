/* global luxon */

const DateTime = luxon.DateTime

const generateUsername = () => {
  const usernames = [
    'Clarence Richardson',
    'Nellie Zavala',
    'Millie-Mae Hawes',
    'Sean Coffey',
    'Essa Heaton',
    'Omari Jackson',
    'Lukasz Moyer',
    'Imogen Oakley',
    'Yu Horton',
    'Mariella Howell'
  ]
  const randomIndex = Math.floor(Math.random() * 10)
  return usernames[randomIndex]
}

const generateAvatar = () => {
  const avatars = [
    '/images/avatar-0.svg',
    '/images/avatar-1.svg',
    '/images/avatar-2.svg',
    '/images/avatar-3.svg',
    '/images/avatar-4.svg',
    '/images/avatar-5.svg',
    '/images/avatar-6.svg',
    '/images/avatar-7.svg',
    '/images/avatar-8.svg',
    '/images/avatar-9.svg'
  ]
  const randomIndex = Math.floor(Math.random() * 10)
  return avatars[randomIndex]
}

class Comment {
  constructor (
    {
      id = null,
      username = generateUsername(),
      avatar = generateAvatar(),
      commentDate = DateTime.now(),
      commentText,
      upvotes = 0,
      parentCommentId = null
    } = {}
  ) {
    this.id = id
    this.username = username
    this.avatar = avatar
    this.commentDate = commentDate
    this.commentText = commentText
    this.upvotes = upvotes
    this.parentCommentId = parentCommentId
  }
}

const getCommentFragment = (comment, comments) => {
  const childComments = comments.filter(c => c.parentCommentId === comment.id)

  return `
    <li class="flex gap-x-3 mt-8">
      <div class="flex-none flex flex-col">
        <img src="${comment.avatar}" alt="Avatar" class="w-8 h-8"/>
        <div class="h-full ml-4 border-l-2 ${childComments.length === 0 ? 'hidden' : ''}"></div>
      </div>
      <div>
        <div class="flex gap-x-3">
          <!-- User name -->
          <div class="font-medium">${comment.username}</div>
          <!-- Separator -->
          <div>&middot;</div>
          <!-- Time -->
          <div class="text-sm my-auto text-slate-400">${comment.commentDate.toRelative({ style: 'narrow' })}</div>
        </div>
        <div>
          <!-- Comment -->
          <div>
            ${comment.commentText}
          </div>
        </div>
        <div class="mt-3 font-medium text-sm text-slate-500">
          <!-- Upvote button -->
          <button>&#9650; Upvote</button>
          <!-- Upvote count -->
          &nbsp;
          <span>${comment.upvotes}</span>
          <!-- Reply button -->
          <button class="ml-8">Reply</button>
        </div>
        <!-- Sub-comments -->
        <ul>
          ${childComments.map(comment => getCommentFragment(comment, comments)).join('')}
        </ul>
      </div>
    </li>
  `
}

const refreshCommentFragment = async () => {
  // Fetch comments and display them in screen
  const response = await fetch('/comments')
  const data = await response.json()

  const comments = data.comments
  // Iterate over comments and replace commentDate strings with Luxon DateTime objects; they will be necessary
  comments.forEach(comment => {
    comment.commentDate = DateTime.fromISO(comment.commentDate)
  })
  // Sort comments by their commentDate attributes
  comments.sort((a, b) => b.commentDate - a.commentDate)
  // Iterate over root comments and display them in HTML
  const commentsElement = document.getElementById('comments')
  commentsElement.innerHTML = ''
  comments.filter(comment => comment.parentCommentId === null).forEach(comment => {
    commentsElement.innerHTML += getCommentFragment(comment, comments)
  })
}

// Add new commenter image
document.getElementById('new-commenter-image').src = generateAvatar()
// addEventListener for create-comment button
const createCommentButton = document.getElementById('create-comment')
createCommentButton.addEventListener('click', async () => {
  const commentInput = document.querySelector('#new-comment input#comment')
  const commentInputValue = commentInput.value
  const comment = new Comment({ commentText: commentInputValue })

  await fetch('/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      comment: {
        username: comment.username,
        avatar: comment.avatar,
        commentDate: comment.commentDate,
        commentText: comment.commentText,
        upvotes: comment.upvotes,
        parentCommentId: comment.parentCommentId
      }
    })
  })

  refreshCommentFragment()
})

refreshCommentFragment()
