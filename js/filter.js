import { getRandomNumber, debonce } from './utils';
import { renderThumbnails, clearContainerImages } from './thumbnails.js';

const FILTERS = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed',
};
const ACTIVE_BUTTON = 'img-filters__button--active';
const MAX_COINT_IMAGES = 10;

const form = document.querySelector('.img-filters');
const filterButton = form.querySelectorAll('.img-filters__button');

let currentFilter = FILTERS.default;
let photos = [];

const renderPhotos = debonce((newPictures) => {
  clearContainerImages();
  renderThumbnails(newPictures);
});

const setFilterImg = (element) => {
  let filterImg = [];
  const clonePhotos = [...photos];

  switch(element) {
    case FILTERS.random:
      filterImg = clonePhotos.sort(getRandomNumber).slice(0, MAX_COINT_IMAGES);
      break;
    case FILTERS.discussed:
      filterImg = clonePhotos.sort((a, b) => b.comments.length - a.comments.length);
      break;
    default:
      filterImg = photos;
      break;
  }

  renderPhotos(filterImg);
};

const onFilterClick = (evt) => {
  const targetButton = evt.target.closest('button');

  if (!targetButton || targetButton.id === currentFilter) {
    return;
  }

  filterButton.forEach((element) => element.classList.remove(`${ACTIVE_BUTTON}`));

  const activeFilter = targetButton.id;
  targetButton.classList.add(`${ACTIVE_BUTTON}`);
  currentFilter = activeFilter;

  setFilterImg(currentFilter);
};

const initSortImg = (element) => {
  form.classList.remove('img-filters--inactive');
  form.addEventListener('click', onFilterClick);
  photos = [...element];
};

export { initSortImg };

