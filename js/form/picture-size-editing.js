const SIZE_STEP = 25;
const MIN_VALUE_SIZE = 25;
const MAX_VALUE_SIZE = 100;

const form = document.querySelector('.img-upload__form');
const scaleControl = form.querySelector('.scale__control--value');
const formImage = form.querySelector('.img-upload__preview img');
const changeButtonWrapper = form.querySelector('.img-upload__scale');

const setTransformImage = (value) => {
  const scaleIndex = Number(value) / 100;
  formImage.style.transform = `scale(${scaleIndex})`;
};

const setSizePictureBack = (value) => {
  if (value > MIN_VALUE_SIZE) {
    const scaleStepResult = value - SIZE_STEP;
    scaleControl.value = `${scaleStepResult}%`;
    setTransformImage(scaleStepResult);
  }
};

const setSizePictureNext = (value) => {
  if (value < MAX_VALUE_SIZE) {
    const scaleStepResult = value + SIZE_STEP;
    scaleControl.value = `${scaleStepResult}%`;
    setTransformImage(scaleStepResult);
  } else {
    scaleControl.value = `${MAX_VALUE_SIZE}%`;
  }
};

const onButtonClick = (evt) => {
  const scaleTextValue = parseInt(scaleControl.value, 10);
  const buttonPlus = evt.target.closest('.scale__control--bigger');
  const buttonMinus = evt.target.closest('.scale__control--smaller');

  if (buttonMinus) {
    setSizePictureBack(scaleTextValue);
  } else if (buttonPlus) {
    setSizePictureNext(scaleTextValue);
  }
};

const resetImageSizeValue = () => {
  scaleControl.value = `${MAX_VALUE_SIZE}%`;
  formImage.style.transform = 'scale(1)';
};

const initChangeSizeImage = () => {
  changeButtonWrapper.addEventListener('click', onButtonClick);
};

export { initChangeSizeImage, resetImageSizeValue };

