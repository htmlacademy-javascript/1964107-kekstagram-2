import { effectsList } from './effects';

const DEFAULT_EFFECT = effectsList[0];

const form = document.querySelector('.img-upload__form');
const slider = form.querySelector('.effect-level__slider');
const imgWrapperEffect = form.querySelector('.img-upload__effects');
const effectLevelValue = form.querySelector('.effect-level__value');
const uploadedImg = form.querySelector('.img-upload__preview img');
const sliderContainer = form.querySelector('.img-upload__effect-level');

let currentEffect = DEFAULT_EFFECT;

const openSlider = () => {
  sliderContainer.classList.remove('hidden');
};

const hideSlider = () => {
  sliderContainer.classList.add('hidden');
  uploadedImg.style.removeProperty('filter');
};

const isDefaultEffect = () => currentEffect.name === 'none';

const updateEffect = () => {
  if (isDefaultEffect()){
    hideSlider();
  } else {
    openSlider();
  }
  slider.noUiSlider.updateOptions({
    range: {
      'min': currentEffect.min,
      'max': currentEffect.max,
    },
    start: currentEffect.start,
    step: currentEffect.step,
  });
};

const onSliderEffect = (evt) => {
  effectLevelValue.value = 0;
  const target = evt.target;

  if(!target){
    return;
  }

  currentEffect = effectsList.find((element) => element.name === evt.target.value);
  updateEffect();
};

const onUpdateEffect = () => {
  const sliderValue = slider.noUiSlider.get();
  uploadedImg.style.filter = `${currentEffect.effect}(${sliderValue}${currentEffect.unit})`;
  effectLevelValue.value = sliderValue;
};

const initSlider = () => {
  noUiSlider.create(slider, {
    range: {
      'min': DEFAULT_EFFECT.min,
      'max': DEFAULT_EFFECT.max,
    },
    start: DEFAULT_EFFECT.start,
    step: DEFAULT_EFFECT.step,
    connect: 'lower',
  });
};

const destroySlider = () => {
  slider.noUiSlider.destroy();
};

const resetFilter = () => {
  currentEffect = DEFAULT_EFFECT;
  uploadedImg.style.filter = 'none';
  destroySlider();
};

const initEffectSlider = () => {
  initSlider();
  hideSlider();
  imgWrapperEffect.addEventListener('change', onSliderEffect);
  slider.noUiSlider.on('update', onUpdateEffect);
};

export { initEffectSlider, resetFilter };
