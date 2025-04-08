import { effectsObjectList } from './const-filter';

const form = document.querySelector('.img-upload__form');
const slider = form.querySelector('.effect-level__slider');
const imgWrapperEffect = form.querySelector('.img-upload__effects');
const effectLevelValue = form.querySelector('.effect-level__value');
const imgUploadStile = form.querySelector('.img-upload__preview img');
const sliderContainer = form.querySelector('.img-upload__effect-level');
const DEFOLT_EFFECT = effectsObjectList[0];
let currentEffect = DEFOLT_EFFECT;

const openSlider = () => {
  sliderContainer.classList.remove('hidden');
};

const closeSlider = () => {
  sliderContainer.classList.add('hidden');
};

const isDefoltStyle = () => currentEffect.name === 'none';

const UpdateEffect = () => {
  slider.noUiSlider.updateOptions({
    range: {
      'min': currentEffect.min,
      'max': currentEffect.max,
    },
    start: currentEffect.start,
    step: currentEffect.step,
  });

  if (isDefoltStyle()){
    closeSlider();
  } else {
    openSlider();
  }
};

const onSliderEffect = (evt) => {
  const target = evt.target;

  if(!target){
    return;
  }
  currentEffect = effectsObjectList.find((element) => element.name === evt.target.value);
  const styleEffect = currentEffect.effect;
  imgUploadStile.style.filter = `${styleEffect}`;
  UpdateEffect();
};

const onUpdateEffect = () => {
  const sliderValue = slider.noUiSlider.get();

  if (isDefoltStyle()) {
    imgUploadStile.style.filter = DEFOLT_EFFECT.style;
  }
  imgUploadStile.style.filter = `${currentEffect.effect}(${sliderValue}${currentEffect.unit})`;
  effectLevelValue.value = sliderValue;
};

const resetFilter = () => {
  currentEffect = DEFOLT_EFFECT;
  imgUploadStile.style.filter = 'none';
  UpdateEffect();
};

noUiSlider.create(slider, {
  range: {
    'min': DEFOLT_EFFECT.min,
    'max': DEFOLT_EFFECT.max,
  },
  start: DEFOLT_EFFECT.start,
  step: DEFOLT_EFFECT.step,
  connect: 'lower',
});
closeSlider();

const initEffectSlider = () => {
  imgWrapperEffect.addEventListener('change', onSliderEffect);
  slider.noUiSlider.on('update', onUpdateEffect);
};

export { initEffectSlider, resetFilter };
