import { isEscapeKey } from '../utils.js';

const ALERT_SHOW_TIME = 5000;

const dataError = document.querySelector('#data-error').content.querySelector('.data-error');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const successMessage = document.querySelector('#success').content.querySelector('.success');

const showMessagePopup = (element) => {
  const message = element.cloneNode(true);

  const closePopup = () => {
    document.body.classList.remove('error');
    message.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onButtonClick);
  };

  function onDocumentKeydown (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closePopup();
    }
  }

  function onButtonClick (evt) {
    const targetButton = evt.target.closest('button');
    const target = evt.target;

    if (target === evt.currentTarget || (!targetButton && target.tagName === 'DIV')) {
      return;
    }

    closePopup();
  }

  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onButtonClick);
  message.addEventListener('click', onButtonClick);

  document.body.append(message);
};

const getDataError = () => {
  const message = dataError.cloneNode(true);
  document.body.append(message);

  setTimeout(() => {
    message.remove();
  }, ALERT_SHOW_TIME);
};

const showErrorMessage = () => {
  document.body.classList.add('error');
  showMessagePopup(errorMessage);
};

const showSuccessMessage = () => showMessagePopup(successMessage);

export { getDataError, showErrorMessage, showSuccessMessage};

