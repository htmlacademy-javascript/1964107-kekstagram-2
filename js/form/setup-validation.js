const RULES_HASH_TAGS = /^#[а-яa-zё0-9]{1,19}$/i;
const MAX_SUM_TAGS = 5;
const MAX_LENGTH_TAG = 20;
const MAX_LENGTH_COMMENT = 140;

const form = document.querySelector('.img-upload__form');
const commentInput = form.querySelector('.text__description');
const hashTagsInput = form.querySelector('.text__hashtags');

let errorMessage = '';

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag : 'div',
});

const getErrorMessage = () => errorMessage;

const isValidComment = (value) => value.length <= MAX_LENGTH_COMMENT;

const checkHashtagRules = [
  {
    check: (tags) => tags.length !== new Set(tags).size,
    error: 'Хэштеги повторяются',
  },
  {
    check: (tags) => tags.length > MAX_SUM_TAGS,
    error: `Превышено количество хэштегов, не больше, ${MAX_SUM_TAGS}`,
  },
  {
    check: (tags) => tags.some((tag) => !RULES_HASH_TAGS.test(tag)),
    error: `Введён неправильный хэштег,содержит запрещенные символы,не содержит #,добавьте пробел перед новым хештегом,
    превышает длину в ${MAX_LENGTH_TAG} символов`
  },
];

const isValidHashTags = (value) => {
  errorMessage = '';

  if (value.trim().length === 0) {
    return true;
  }

  const tagsList = value.toLowerCase().trim().split(' ').filter((tag) => tag.length !== 0);

  return checkHashtagRules.every((rule) => {
    const isNoValid = rule.check(tagsList);

    if (isNoValid) {
      errorMessage = rule.error;
    }

    return !isNoValid;
  });
};

const setupValidation = () => {
  pristine.addValidator(commentInput, isValidComment, `Максимально ${MAX_LENGTH_COMMENT} символов`);
  pristine.addValidator(hashTagsInput, isValidHashTags, getErrorMessage);
};

const resetValidation = () => pristine.reset();

const validateForm = () => pristine.validate();

export { setupValidation, validateForm, resetValidation };
