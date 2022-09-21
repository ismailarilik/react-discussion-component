/* global luxon */

const DateTime = luxon.DateTime

const generateName = () => {
  const names = [
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
  return names[randomIndex]
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
      name = generateName(),
      avatar = generateAvatar(),
      date = DateTime.now(),
      comment,
      upvotes = 0,
      comments = []
    } = {}
  ) {
    this.name = name
    this.avatar = avatar
    this.date = date
    this.comment = comment
    this.upvotes = upvotes
    this.comments = comments
  }
}

const comments = [
  new Comment({
    comment: `Cras interdum ullamcorper neque at pretium.
      Sed vulputate finibus orci accumsan pulvinar.
      Duis molestie malesuada enim ut efficitur.`
  }),
  new Comment({
    comment: `Morbi auctor facilisis augue in scelerisque.
    Donec aliquam orci turpis, eu molestie arcu ultricies et.
    Donec consequat mi pellentesque posuere ultrices.`,
    comments: [
      new Comment({
        comment: `Integer congue scelerisque elit quis elementum.
        Quisque ligula felis, malesuada a vestibulum id, eleifend et ipsum.
        Etiam non vestibulum turpis, a cursus quam.`
      }),
      new Comment({
        comment: `Nam eleifend nunc non elit scelerisque mollis.
        Suspendisse volutpat dignissim facilisis.
        Sed consequat finibus tortor, sed gravida diam laoreet egestas.`
      })
    ]
  }),
  new Comment({
    comment: `Vivamus rutrum ultrices tortor, quis vestibulum dolor rhoncus a.
    Nam quam lorem, laoreet vitae nisi a, scelerisque blandit mauris.
    Nunc commodo rutrum vestibulum.`
  })
]

const getCommentFragment = comment => {
  return `
    <li class="flex gap-x-3 mt-8">
      <div class="flex-none flex flex-col">
        <img src="${comment.avatar}" alt="Avatar" class="w-8 h-8"/>
        <div class="h-full ml-4 border-l-2 ${comment.comments.length === 0 ? 'hidden' : ''}"></div>
      </div>
      <div>
        <div class="flex gap-x-3">
          <!-- User name -->
          <div class="font-medium">${comment.name}</div>
          <!-- Separator -->
          <div>&middot;</div>
          <!-- Time -->
          <div class="text-sm my-auto text-slate-400">${comment.date.toRelative({ style: 'narrow' })}</div>
        </div>
        <div>
          <!-- Comment -->
          <div>
            ${comment.comment}
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
          ${comment.comments.map(comment => getCommentFragment(comment)).join('')}
        </ul>
      </div>
    </li>
  `
}

// Add new commenter image
document.getElementById('new-commenter-image').src = generateAvatar()

// Iterate over comments and display them in HTML
const commentsElement = document.getElementById('comments')
comments.forEach(comment => {
  commentsElement.innerHTML += getCommentFragment(comment)
})
