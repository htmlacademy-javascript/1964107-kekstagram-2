import { isEscapeKey } from './utils.js';
import { renderComments } from './render-comments.js';

const COMMENTS_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = document.querySelector('#picture-cancel');
const container = document.querySelector('.pictures');
const body = document.querySelector('body');
const likesCount = bigPicture.querySelector('.likes-count');
const bigDescription = bigPicture.querySelector('.social__caption');
const commentsButton = bigPicture.querySelector('.social__comments-loader');
const commentNumber = bigPicture.querySelector('.social__comment-total-count');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentsShowCount = bigPicture.querySelector('.social__comment-shown-count');

let commentsList = [];
let shownComments = COMMENTS_STEP;

const onButtonClick = () => {
  const commentsToRender = commentsList.slice(shownComments, shownComments + COMMENTS_STEP);
  shownComments += COMMENTS_STEP;
  commentsShowCount.textContent = Math.min(shownComments, commentsList.length);
  renderComments(commentsToRender);

  if (shownComments >= commentsList.length) {
    commentsButton.classList.add('hidden');
  }
};

const renderModal = (photo) => {
  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  likesCount.textContent = photo.likes;
  bigDescription.textContent = photo.description;
  commentNumber.textContent = photo.comments.length;
  commentsShowCount.textContent = Math.min(COMMENTS_STEP, photo.comments.length);
  commentsContainer.innerHTML = '';
  renderComments(commentsList.slice(0, COMMENTS_STEP));

  if (commentsList.length <= COMMENTS_STEP) {
    commentsButton.classList.add('hidden');
  } else {
    commentsButton.addEventListener('click', onButtonClick);
  }
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
  shownComments = COMMENTS_STEP;
  commentsButton.classList.remove('hidden');

  commentsButton.removeEventListener('click', onButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
}

const onPictureContainerClick = (evt, photos) => {
  const picture = evt.target.closest('.picture');

  if (!picture) {
    return;
  }

  const thumbnailId = Number(picture.dataset.id);
  const currentPhoto = photos.find(({id}) => id === thumbnailId);

  if (!currentPhoto) {
    return;
  }

  commentsList = currentPhoto.comments;

  openModal(currentPhoto);
};

const initPreviewPictures = (photos) => {
  container.addEventListener('click', (evt) => onPictureContainerClick (evt, photos));
  bigPictureClose.addEventListener('click', () => closeModalUser());
};

export { initPreviewPictures };
