const bigPicture = document.querySelector('.big-picture');
const socialCommentTemplate = bigPicture.querySelector('.social__comment');
const commentsContainer = bigPicture.querySelector('.social__comments');

const renderComments = (photos) => {
  const socialCommentsFragment = document.createDocumentFragment();

  photos.forEach((comments) => {
    const commentFragment = socialCommentTemplate.cloneNode(true);
    const image = commentFragment.querySelector('.social__picture');

    image.src = comments.avatar;
    image.alt = comments.name;
    commentFragment.querySelector('.social__text').textContent = comments.message;

    socialCommentsFragment.appendChild(commentFragment);
  });

  commentsContainer.append(socialCommentsFragment);
};

export { renderComments };
