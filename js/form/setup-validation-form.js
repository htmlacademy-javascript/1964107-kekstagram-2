const form = document.querySelector('.img-upload__form');
const commentInput = form.querySelector('.text__description');
const hashTagsInput = form.querySelector('.text__hashtags');
const RULES_HASH_TAGS = /^#[а-яa-zё0-9]{1,19}$/i;
const MAX_SUM_TAGS = 5;
const MAX_LENGTH_TAG = 20;
const MAX_LENGTH_COMMENT = 140;

let errorMessage = '';

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag : 'div',
});

const error = () => errorMessage;

const isValidComment = (value) => value.length <= MAX_LENGTH_COMMENT;

const isValidHashTags = (value) => {
  errorMessage = '';

  if (value.trim().length === 0) {

    return true;
  }

  const tagsList = value.toLowerCase().trim().split(' ');

  const checkRules = [
    {
      check : tagsList.length !== new Set(tagsList).size,
      error : 'Хэштеги повторяются',
    },
    {
      check : tagsList.length > MAX_SUM_TAGS,
      error : `Превышено количество хэштегов, не больше, ${MAX_SUM_TAGS}`,
    },
    {
      check : tagsList.some((tag) => !RULES_HASH_TAGS.test(tag)),
      error : `Введён неправильный хэштег,содержит запрещенные символы,не содержит #,добавьте пробел перед новым хештегом,
      превышает длину в ${MAX_LENGTH_TAG} символов`
    },
  ];

  return checkRules.every((rule) => {
    const isNoValid = rule.check;

    if (isNoValid) {
      errorMessage = rule.error;
    }

    return !isNoValid;
  });
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    form.submit();
  }
};

const setupValidation = () => {
  form.addEventListener('submit', onFormSubmit);
  pristine.addValidator(commentInput, isValidComment, `Максимально ${MAX_LENGTH_COMMENT} символов`);
  pristine.addValidator(hashTagsInput, isValidHashTags, error);
};

export { setupValidation };
