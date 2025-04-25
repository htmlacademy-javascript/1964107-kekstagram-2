import { getRandomNumber, debounce } from './utils.js';
import { renderThumbnails, clearContainerImages } from './thumbnails.js';

const FILTERS = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed',
};

const ACTIVE_BUTTON = 'img-filters__button--active';
const MAX_COUNT_IMAGES = 10;

const form = document.querySelector('.img-filters');
const filterButtons = form.querySelectorAll('.img-filters__button');

let currentFilter = FILTERS.default;
let photos = [];

const renderPhotos = (newPictures) => {
  clearContainerImages();
  renderThumbnails(newPictures);
};

const filterPhotos = () => {
  let filterImages = [];
  const clonePhotos = [...photos];

  switch(currentFilter) {
    case FILTERS.random:
      filterImages = clonePhotos.sort(getRandomNumber).slice(0, MAX_COUNT_IMAGES);
      break;
    case FILTERS.discussed:
      filterImages = clonePhotos.sort((a, b) => b.comments.length - a.comments.length);
      break;
    case FILTERS.default:
      filterImages = photos;
      break;
    default:
      throw new Error(`Unknown filter type: ${currentFilter}`);
  }

  renderPhotos(filterImages);
};

const filterPhotosWithDebounce = debounce(filterPhotos);

const onFilterClick = (evt) => {
  const targetButton = evt.target.closest('button');

  if (!targetButton) {
    return;
  }

  filterButtons.forEach((button) => button.classList.remove(`${ACTIVE_BUTTON}`));
  const activeFilter = targetButton.id;
  targetButton.classList.add(`${ACTIVE_BUTTON}`);
  currentFilter = activeFilter;

  filterPhotosWithDebounce();
};

const initFilterImg = (elements) => {
  form.classList.remove('img-filters--inactive');
  form.addEventListener('click', onFilterClick);
  photos = [...elements];
};

export { initFilterImg };

