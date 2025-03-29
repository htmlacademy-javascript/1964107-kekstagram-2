import { isEscapeKey } from './utils';
import { getValidation } from './validation-form.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadOwerlay = uploadForm.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const closeButton = uploadForm.querySelector('.img-upload__cancel');
const commentInput = uploadForm.querySelector('.text__description');
const hashtagInput = uploadForm.querySelector('.text__hashtags');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadPicture();
  }
};

const notCloseUpload = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const addKeydownHandler = () => {
  commentInput.addEventListener('keydown', notCloseUpload);
};

function removeKeydown () {
  commentInput.removeEventListener('keydown', notCloseUpload);
}

const uploadPicture = () => {
  uploadOwerlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  getValidation();
};

function closeUploadPicture () {
  uploadOwerlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadInput.value = '';
}

const initUploadPicture = () => {
  uploadInput.addEventListener('change', uploadPicture);
  closeButton.addEventListener('click', closeUploadPicture);
  commentInput.addEventListener('focus', addKeydownHandler);
  commentInput.addEventListener('blur', removeKeydown);
};

export { initUploadPicture };
