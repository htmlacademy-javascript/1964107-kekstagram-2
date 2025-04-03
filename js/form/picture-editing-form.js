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
  } else {
    scaleControl.value = `${MIN_VALUE_SIZE}%`;
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

const changeInputSize = (evt) => {
  const scaleTextValue = Number(scaleControl.value.replace('%', ''));
  const buttonNext = evt.target.closest('.scale__control--bigger');
  const buttonBack = evt.target.closest('.scale__control--smaller');

  if (buttonBack) {
    setSizePictureBack(scaleTextValue);
  } else if (buttonNext) {
    setSizePictureNext(scaleTextValue);
  }
};

const initChangeSizeImage = () => {
  changeButtonWrapper.addEventListener('click', changeInputSize);
};

export { initChangeSizeImage };

