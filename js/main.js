import { createPhotos } from './create-array-photo.js';
import { renderThumbnails } from './thumbnails.js';
import { openModalPicture, closeModalPicture } from './big-picture.js';


export const photos = createPhotos();
renderThumbnails(photos);
openModalPicture(photos);
closeModalPicture();
