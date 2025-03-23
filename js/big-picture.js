import { isEscapeKey } from './utils';

const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = document.querySelector('#picture-cancel');
const container = document.querySelector('.pictures');
const body = document.querySelector('body');
const likesCoint = bigPicture.querySelector('.likes-count');
const bigDescription = bigPicture.querySelector('.social__caption');
const socialHidden = bigPicture.querySelector('.social__comment-count');
const commentHidden = bigPicture.querySelector('.comments-loader');
const commentNumber = bigPicture.querySelector('.social__comment-total-count');
const socialCommentTemplate = bigPicture.querySelector('.social__comment');
const commentsContainer = bigPicture.querySelector('.social__comments');

const renderModal = (photo) => {
  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  likesCoint.textContent = photo.likes;
  bigDescription.textContent = photo.description;
  commentNumber.textContent = photo.comment.length;
};

const renderComments = (photo) => {
  const socialCommentsFragment = document.createDocumentFragment();

  photo.comment.forEach((comment) => {
    const commentFragment = socialCommentTemplate.cloneNode(true);
    const image = commentFragment.querySelector('.social__picture');

    image.src = comment.avatar;
    image.alt = comment.name;
    commentFragment.querySelector('.social__text').textContent = comment.message;

    socialCommentsFragment.appendChild(commentFragment);
  });


  commentsContainer.append(socialCommentsFragment);
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
  renderComments(currentPhoto);

  if (!currentPhoto) {
    return;
  }

  socialHidden.classList.add('hidden');
  commentHidden.classList.add('hidden');
  openModal(currentPhoto);
};

const initPreviewPictures = (photos) => {
  container.addEventListener('click', (evt) => onPictureContainerClick (evt, photos));
  bigPictureClose.addEventListener('click', () => closeModalUser());
};

export { initPreviewPictures };
