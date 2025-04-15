import { isEscapeKey } from '../utils.js';
import { setupValidation, validateForm, resetValidation } from './setup-validation.js';
import { initChangeSizeImage, resetImageSizeValue } from './picture-size-editing.js';
import { initEffectSlider, resetFilter } from './range-bar-effect.js';
import { sendData } from '../api.js';
import { getMessage } from './popups-massages.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const closeButton = uploadForm.querySelector('.img-upload__cancel');
const commentInput = uploadForm.querySelector('.text__description');
const hashTagInput = uploadForm.querySelector('.text__hashtags');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const successMessage = document.querySelector('#success').content.querySelector('.success');

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
  initEffectSlider();
  initChangeSizeImage();
};

function closeForm() {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);

  uploadInput.value = '';
  resetImageSizeValue();
  uploadForm.reset();
  resetFilter();
  resetValidation();
}

const onButtonClick = () => closeForm();

const onUploadInputChange = () => {
  openForm();
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = validateForm();

  if (isValid) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(() =>{
        closeForm();
        getMessage(successMessage);
      })
      .catch(() => {
        getMessage(errorMessage);
      })
      .finally(unblockSubmitButton);
  }
};

const initUploadForm = () => {
  uploadForm.addEventListener('submit', onFormSubmit);
  uploadInput.addEventListener('change', onUploadInputChange);
  closeButton.addEventListener('click', onButtonClick);
  setupValidation();
};

export { initUploadForm, closeForm };
