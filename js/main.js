import { createPhotos } from './create-array-photo.js';
import { renderThumbnails } from './thumbnails.js';
import { initPreviewPictures } from './big-picture.js';


const photos = createPhotos();
renderThumbnails(photos);
initPreviewPictures(photos);
