'use strict';

const FIRST_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Лопита`, `Вашингтон`];
const SECOND_NAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
const WIZARD_COUNT = 4;
const userDialog = document.querySelector(`.setup`);
const userSimilar = document.querySelector(`.setup-similar`);
const similarListElement = document.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);
let wizards = [];

userDialog.classList.remove(`hidden`);
userSimilar.classList.remove(`hidden`);

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
