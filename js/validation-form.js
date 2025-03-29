const form = document.querySelector('.img-upload__form');
//const hashTagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

function isValidComment (value) {
  return value.length <= 140;
}

const getValidation = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });
};

pristine.addValidator(commentInput, isValidComment, 'Максимально 140 символов');

export { getValidation };
