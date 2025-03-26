import { isEscapeKey } from './utils';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadOwerlay = uploadForm.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const closeButton = uploadForm.querySelector('.img-upload__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadPicture();
  }
};

const uploadPicture = () => {
  uploadOwerlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

function closeUploadPicture () {
  uploadOwerlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadInput.value = '';
  document.removeEventListener('keydown', onDocumentKeydown);
}

const initUploadPicture = () => {
  uploadInput.addEventListener('change', uploadPicture);
  closeButton.addEventListener('click', closeUploadPicture);
};

export { initUploadPicture };
