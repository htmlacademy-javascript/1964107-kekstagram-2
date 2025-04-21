import { isEscapeKey } from '../utils.js';
import { setupValidation, validateForm, resetValidation } from './setup-validation.js';
import { initChangeSizeImage, resetImageSizeValue } from './picture-size-editing.js';
import { initEffectSlider, resetFilter } from './range-bar-effect.js';
import { sendData } from '../api.js';
import { showErrorMessage, showSuccessMessage } from './popups-messages.js';
import { initChoiceImg, clearImgPreview } from './choice-image.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const closeButton = uploadForm.querySelector('.img-upload__cancel');
const commentInput = uploadForm.querySelector('.text__description');
const hashTagInput = uploadForm.querySelector('.text__hashtags');
const submitButton = uploadForm.querySelector('.img-upload__submit');

const onDocumentKeydown = (evt) => {
  const hasActiveElement = document.activeElement === commentInput || document.activeElement === hashTagInput;

  if (isEscapeKey(evt) && !hasActiveElement && !document.body.classList.contains('error')) {
    evt.preventDefault();
    closeForm();
  }
};

const openForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  initEffectSlider();
  initChangeSizeImage();
};

function closeForm() {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);

  uploadInput.value = '';
  clearImgPreview();
  resetImageSizeValue();
  uploadForm.reset();
  resetFilter();
  resetValidation();
}

const onButtonClick = () => closeForm();

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
        showSuccessMessage();
      })
      .catch(() => {
        showErrorMessage();
      })
      .finally(unblockSubmitButton);
  }
};

const initUploadForm = () => {
  uploadForm.addEventListener('submit', onFormSubmit);
  closeButton.addEventListener('click', onButtonClick);
  setupValidation();
  initChoiceImg();
};

export { initUploadForm, closeForm, openForm };
