'use strict';

const FIRST_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Лопита`, `Вашингтон`];
const SECOND_NAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
const FIREBALLS_COLORS = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];
const WIZARD_COUNT = 4;
const userSimilar = document.querySelector(`.setup-similar`);
const similarListElement = document.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);
const setupOpen = document.querySelector(`.setup-open`);
const setup = document.querySelector(`.setup`);
const setupClose = setup.querySelector(`.setup-close`);
const setupUserName = setup.querySelector(`.setup-user-name`);
const coatColorInput = setup.querySelector(`input[name=coat-color]`);
const eyesColorInput = setup.querySelector(`input[name=eyes-color]`);
const fireballColorInput = setup.querySelector(`input[name=fireball-color]`);
const wizardCoat = setup.querySelector(`.setup-wizard .wizard-coat`);
const wizardEyes = setup.querySelector(`.setup-wizard .wizard-eyes`);
const wizardFireball = setup.querySelector(`.setup-fireball-wrap`);
let wizards = [];

userSimilar.classList.remove(`hidden`);

const openPopup = function () {
  setup.classList.remove(`hidden`);
  document.addEventListener(`keydown`, onPopupEscPress);
};

const closePopup = function () {
  setup.classList.add(`hidden`);
  document.removeEventListener(`keydown`, onPopupEscPress);
};

const onPopupEscPress = function (evt) {
  if (evt.key === `Escape` && document.activeElement !== setupUserName) {
    evt.preventDefault();
    closePopup();
  }
};

setupOpen.addEventListener(`click`, function () {
  openPopup();
});

setupOpen.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    openPopup();
  }
});

setupClose.addEventListener(`click`, function () {
  closePopup();
});

setupClose.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    closePopup();
  }
});

wizardCoat.addEventListener(`click`, function () {
  wizardCoat.style.fill = randomArrayItem(COAT_COLORS);
  coatColorInput.value = wizardCoat.style.fill;
});

wizardEyes.addEventListener(`click`, function () {
  wizardEyes.style.fill = randomArrayItem(EYES_COLORS);
  eyesColorInput.value = wizardEyes.style.fill;
});

wizardFireball.addEventListener(`click`, function () {
  wizardFireball.style.background = randomArrayItem(FIREBALLS_COLORS);
  fireballColorInput.value = wizardFireball.style.background;
});

const randomInteger = function (min, max) {
  let randomNumber = min + Math.random() * (max + 1 - min);
  return Math.floor(randomNumber);
};

const randomArrayItem = function (array) {
  const rundomIndex = randomInteger(0, array.length);
  return array[rundomIndex];
};

const generateWizardDataArray = function () {
  const wizardArray = [];
  for (let i = 0; i < WIZARD_COUNT; i++) {
    const wizardItem = {
      name: randomArrayItem(FIRST_NAMES) + ` ` + randomArrayItem(SECOND_NAMES),
      coatColor: randomArrayItem(COAT_COLORS),
      eyesColor: randomArrayItem(EYES_COLORS)
    };
    wizardArray.push(wizardItem);
  }
  return wizardArray;
};

wizards = generateWizardDataArray();

const renderWizard = function (wizard) {
  const wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return wizardElement;
};

const generateElements = function () {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
};

generateElements();
