import { isEscapeKey } from '../utils.js';
import { setupValidation, resetValidation } from './setup-validation-form.js';
import { initChangeSizeImage } from './picture-editing-form.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const closeButton = uploadForm.querySelector('.img-upload__cancel');
const commentInput = uploadForm.querySelector('.text__description');
const hashTagInput = uploadForm.querySelector('.text__hashtags');

const onDocumentKeydown = (evt) => {
  const hasActiveElement = document.activeElement === commentInput || document.activeElement === hashTagInput;

  if (isEscapeKey(evt) && !hasActiveElement) {
    evt.preventDefault();
    closeForm();
  }
};

const openForm = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  initChangeSizeImage();
};

function closeForm () {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);

  uploadInput.value = '';
  uploadForm.reset();
  resetValidation();
}

const onButtonClick = () => closeForm();

const onUploadInputChange = () => {
  openForm();
};

const initUploadForm = () => {
  uploadInput.addEventListener('change', onUploadInputChange);
  closeButton.addEventListener('click', onButtonClick);

  setupValidation();
};

export { initUploadForm };
