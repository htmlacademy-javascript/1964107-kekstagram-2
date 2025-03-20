const bigPicture = document.querySelector('.big-picture');
const bigPictureClose = document.querySelector('#picture-cancel');
const container = document.querySelector('.pictures');
const body = document.querySelector('body');
const likesCoint = bigPicture.querySelector('.likes-count');
const bigDescription = bigPicture.querySelector('.social__caption');
//const socialHidden = bigPicture.querySelector('.social__comment-count');
//const commentHidden = bigPicture.querySelector('.comments-loader');
const commentNumber = bigPicture.querySelector('.social__comment-total-count');

const fillModal = (photo) => {
  // TODO заполнение модалки
  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  likesCoint.textContent = photo.likes;
  bigDescription.textContent = photo.description;
  commentNumber.textContent = photo.comment.length;

  //console.log(photo);
};


const openModalPicture = (photos) => {
  container.addEventListener('click', (evt) => {
    if (evt.target.matches('img')) {
      bigPicture.classList.remove('hidden');
      //socialHidden.classList.add('hidden');
      //commentHidden.classList.add('hidden');
      body.classList.add('modal-open');
      const idThumbnails = Number(evt.target.closest('a').dataset.id);
      const photo = photos.find(({id}) => id === idThumbnails);
      fillModal(photo);
    }
  });
};


const closeModalPicture = () => {
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      bigPicture.classList.add('hidden');
    }
    body.classList.remove('modal-open');
  });

  bigPictureClose.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
  });
  body.classList.remove('modal-open');
};

export { openModalPicture, closeModalPicture};

