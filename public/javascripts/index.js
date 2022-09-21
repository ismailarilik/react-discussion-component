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
// Add new commenter image
document.getElementById('new-commenter-image').src = generateAvatar()
