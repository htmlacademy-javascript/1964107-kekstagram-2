import {getRandomNumber, getRandomElement} from './utils.js';

const NAMES = ['Иван', 'Мария', 'Юлия', 'Лола', 'Дима', 'Артемий'];
const COMMENTS = ['Всё отлично!','В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_AVATAR_ID = 1;
const MAX_AVATAR_ID = 6;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const NUM_OBJECTS = 25;

let photoId = 0;
let commentId = 0;

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

const createPhotos = () => Array.from({ length: NUM_OBJECTS }, createPhoto);

export { createPhotos };
