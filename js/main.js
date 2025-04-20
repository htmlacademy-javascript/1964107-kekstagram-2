import { getData } from './api.js';
import { renderThumbnails } from './thumbnails.js';
import { initPreviewPictures } from './big-picture.js';
import { initUploadForm } from './form/upload-form.js';
import { getDataError } from './form/popups-messages.js';
import { initSortImg } from './filter.js';

getData()
  .then((photos) => {
    renderThumbnails(photos);
    initPreviewPictures(photos);
    initSortImg(photos);
  })
  .catch(() => getDataError());

initUploadForm();
