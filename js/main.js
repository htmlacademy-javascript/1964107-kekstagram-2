import { createPhotos } from './create-array-photo.js';
import { renderThumbnails } from './thumbnails.js';
import { initPreviewPictures } from './big-picture.js';
import { initUploadPicture } from './validation-form.js';

const photos = createPhotos();
renderThumbnails(photos);
initPreviewPictures(photos);
initUploadPicture();
