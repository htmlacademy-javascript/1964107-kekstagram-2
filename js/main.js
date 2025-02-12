const NAMES = ['Иван','Мария','Юлия','Лола','Дима','Артемий'];
const COMMENTS = ['Всё отлично!','В целом всё неплохо. Но не всё.','Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.','Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_AVATAR_ID = 1;
const MAX_AVATAR_ID = 6;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const SUM_OBJECTS = 25;

/*рандом число*/
const getRandomNumber = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

/*рандомное число для элемента массива*/
const getRandomElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

/*создаем комментарий*/
const createComment = () => {
  let id = 1;
  const sumAvatar = getRandomNumber(MIN_AVATAR_ID, MAX_AVATAR_ID);
  const comment = {};

  /* функция верни встроеную функцию \ замыкание? */
  return () => {
    comment.id = id;
    comment.avatar = `img/avatar-${sumAvatar}.svg`;
    comment.message = `${getRandomElement(COMMENTS)}`;
    comment.name = `${getRandomElement(NAMES)}`;
    id++;
    return comment;
  };
};

/*создадим сам объект для массива*/

const createObjectPfoto = () => {
  let id = 1;
  const sumLikes = getRandomNumber(MIN_LIKES, MAX_LIKES);
  const sumComments = getRandomNumber(MIN_COMMENTS, MAX_COMMENTS);
  const object = {};

  return () => {
    object.id = id;
    object.url = `photos/${id}.jpg`;
    object.descriptoin = `Фото номер ${id}`;
    object.likes = sumLikes;
    object.comment = Array.from({ length: sumComments }, createComment());
    id++;
    return object;
  };
};

/*теперь надо сделать так чтобы наш объект помещался в массив заданной длины*/

const photoObjects = Array.from({length: SUM_OBJECTS}, createObjectPfoto());

console.log(photoObjects);


/* создали 25 одинаковых объектов,что-то не то :*/


/*
const createComment = () => {
  let id = 1;
  const indexNames = getRandomNumber(0 , NAMES.length - 1);
  const indexMassage = getRandomNumber(0 ,COMMENTS.length - 1);
  const comment = {};
  const avatarId = getRandomNumber(MIN_AVATAR_ID, MAX_AVATAR_ID);
  comment.id = id;
  comment.avatar = `img/avatar-${avatarId}.svg`;
  comment.message = `${indexMassage}`;
  comment.name = `${indexNames}`;
  id ++;

  return comment;
};

const sumComments = getRandomNumber(MIN_COMMENTS, MAX_COMMENTS);
const sumLikes = getRandomNumber(MIN_LIKES, MAX_LIKES);

const createObject = () => {
  let id = 1;
  const object = {};
  object.id = id;
  object.url = `photos/${id}.jpg`;
  object.descriptoin = `Фото номер ${id}`;
  object.likes = sumLikes;
  object.comment = Array.from({ length: sumComments }, createComment());
  id++;
  return object;
};

const newObjects = Array.from ({ length: 25 }, createObject());

newObjects;*/


