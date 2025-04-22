import { isEscapeKey } from './utils.js';
import { renderComments } from './render-comments.js';

const COMMENTS_COINT_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = document.querySelector('#picture-cancel');
const container = document.querySelector('.pictures');
const body = document.querySelector('body');
const likesCoint = bigPicture.querySelector('.likes-count');
const bigDescription = bigPicture.querySelector('.social__caption');
const socialCommentsCoint = bigPicture.querySelector('.social__comment-count');
const commentsButton = bigPicture.querySelector('.social__comments-loader');
const commentNumber = bigPicture.querySelector('.social__comment-total-count');
const commentsContainer = bigPicture.querySelector('.social__comments');
const socialShowCount = bigPicture.querySelector('.social__comment-shown-count');

let commentsList = [];
let count = 5;

const renderModal = (photo) => {
  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  likesCoint.textContent = photo.likes;
  bigDescription.textContent = photo.description;
  commentNumber.textContent = photo.comments.length;
};

const onDocumentKeydown = (evt) => {

  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalUser();
  }
};

const openModal = (photo) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  renderModal(photo);

  document.addEventListener('keydown', onDocumentKeydown);
};

function closeModalUser () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  commentsButton.classList.add('hidden');
  socialCommentsCoint.classList.add('hidden');
  socialShowCount.textContent = 5;
  count = 5;

  document.removeEventListener('keydown', onDocumentKeydown);
}

const onPictureContainerClick = (evt, photos) => {
  const picture = evt.target.closest('.picture');

  if (!picture) {
    return;
  }

  const thumbnailId = Number(picture.dataset.id);
  const currentPhoto = photos.find(({id}) => id === thumbnailId);
  commentsContainer.innerHTML = '';

  if (!currentPhoto) {
    return;
  }

  commentsList = currentPhoto.comments;

  if (commentsList.length > COMMENTS_COINT_STEP) {
    commentsButton.classList.remove('hidden');
    socialCommentsCoint.classList.remove('hidden');
    const comments = commentsList.slice(0, COMMENTS_COINT_STEP);
    renderComments(comments);
  } else {
    renderComments(commentsList);
  }

  openModal(currentPhoto);
};

const onButtonClick = (comments, evt) => {
  evt.target.closest('button');
  const commentsPaint = comments.slice(count, count + COMMENTS_COINT_STEP);
  count += COMMENTS_COINT_STEP;
  socialShowCount.textContent = count;

  if (socialShowCount.textContent >= commentNumber.textContent) {
    commentsButton.classList.add('hidden');
    socialCommentsCoint.classList.add('hidden');
  }

  renderComments(commentsPaint);
};

const initPreviewPictures = (photos) => {
  container.addEventListener('click', (evt) => onPictureContainerClick (evt, photos));
  bigPictureClose.addEventListener('click', () => closeModalUser());
  commentsButton.addEventListener('click', (evt) => onButtonClick(commentsList, evt));
  commentsButton.classList.add('hidden');
  socialCommentsCoint.classList.add('hidden');
};

export { initPreviewPictures };
