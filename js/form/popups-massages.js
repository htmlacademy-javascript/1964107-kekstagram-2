import { isEscapeKey } from '../utils';

const ALERT_SHOW_TIME = 5000;

const container = document.body;
const dataError = document.querySelector('#data-error').content.querySelector('.data-error');

const onKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    console.log('test' , { 'test': evt.target, });
    //deleteMessage();
  }
};

function deleteMessage(element) {
  element.removeEventListener('keydown', onKeydown);
  element.remove();
}

const onButtonClick = (evt) => {
  const target = evt.target.closest('button');

  if (!target) {
    return;
  }

  const message = target.closest('section');

  deleteMessage(message);
};

const setMessagePopup = (element) => {
  const message = element.cloneNode(true);
  container.append(message);
  message.addEventListener('keydown', (evt) => {
    evt.stopPropagation();
    onKeydown(evt);
  });
  message.addEventListener('click', onButtonClick);

  return message;
};

const getDataError = () => {
  const message = dataError.cloneNode(true);
  container.append(message);

  setTimeout(() => {
    message.remove();
  }, ALERT_SHOW_TIME);
};

const getMessage = (element) => {
  setMessagePopup(element);
};

export { getDataError, getMessage };

