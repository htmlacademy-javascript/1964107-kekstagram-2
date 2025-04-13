import { getData } from './api.js';
import { renderThumbnails } from './thumbnails.js';
import { initPreviewPictures } from './big-picture.js';
import { initUploadForm } from './form/upload-form.js';
import { setErrorData } from './utils';

getData()
  .then((fotos) => {
    renderThumbnails(fotos);
    initPreviewPictures(fotos);
  })
  .catch(() => setErrorData());

initUploadForm();
