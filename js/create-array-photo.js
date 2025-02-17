import {getRandomNumber} from './util.js';
import {NAMES, COMMENTS} from './const.js';

const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_AVATAR_ID = 1;
const MAX_AVATAR_ID = 6;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const NUM_OBJECTS = 25;

let photoId = 0;
let commentId = 0;

const getRandomElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const createComment = () => {
  commentId++;
  const numAvatar = getRandomNumber(MIN_AVATAR_ID, MAX_AVATAR_ID);

  return {
    id: commentId,
    avatar: `img/avatar-${numAvatar}.svg`,
    message: `${getRandomElement(COMMENTS)}`,
    name: `${getRandomElement(NAMES)}`,
  };
};

const createPhoto = () => {
  photoId++;
  const numLikes = getRandomNumber(MIN_LIKES, MAX_LIKES);
  const numComments = getRandomNumber(MIN_COMMENTS, MAX_COMMENTS);

  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: `Фото номер ${photoId}`,
    likes: numLikes,
    comment: Array.from({ length: numComments }, createComment),
  };
};

const photoObjects = Array.from({ length: NUM_OBJECTS }, createPhoto);

export {photoObjects};
