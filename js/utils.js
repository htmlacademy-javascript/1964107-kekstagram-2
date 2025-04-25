const TIME_OUT_DELAY = 500;

const isEscapeKey = (evt) => evt.key === 'Escape';

const getRandomNumber = () => 0.5 - Math.random();

const debounce = (cb) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => cb.apply(this, rest), TIME_OUT_DELAY);
  };
};

export { isEscapeKey, getRandomNumber, debounce };
