import { openForm } from './upload-form.js';

const FILE_TYPES_NAME = ['.jpg', '.jpeg', '.png'];

const fileChooser = document.querySelector('.img-upload__start input[type=file]');
const preview = document.querySelector('.img-upload__preview img');
const previewThumbnails = document.querySelectorAll('.effects__preview');

const clearImgPreview = () => {
  preview.src = '';
};

const onChangeImagePreview = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES_NAME.some((item) => fileName.endsWith(item));

  if (!matches) {
    return;
  }

  preview.src = URL.createObjectURL(file);
  const urlPreview = preview.src;

  function effectsImgPreview (effect) {
    effect.style.backgroundImage = `url("${urlPreview}")`;
  }

  previewThumbnails.forEach((effectPreview) => effectsImgPreview(effectPreview));
  openForm();
};

const initChoiceImg = () => {
  fileChooser.addEventListener('change', onChangeImagePreview);
};

export { initChoiceImg, clearImgPreview };

