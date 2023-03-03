import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onInputHandler, DEBOUNCE_DELAY));

function onInputHandler(event) {
  const countryName = event.target.value.trim();

  if (!countryName) {
    clearTemplate();
    return;
  }

  fetchCountries(countryName)
    .then(data => {
      if (data.length > 10) {
        specificAlert();
        clearTemplate();
        return;
      }
      renderTemplate(data);
    })
    .catch(error => {
      clearTemplate();
      errorAlert();
    });
}

function renderTemplate(elements) {
  let template = '';
  let templateHandle = '';
  clearTemplate();

  if (elements.length === 1) {
    template = createCountryNameInfo(elements);
    templateHandle = countryInfo;
  } else {
    template = createCountryNameList(elements);
    templateHandle = countryList;
  }
  createTemplate(templateHandle, template);
}

function createCountryNameList(elements) {
  return elements
    .map(({ flags, name }) => {
      return `<li class='country-list__item'> 
      <img class='country-list__image' 
      src='${flags.svg}' 
      alt='${name.official}' 
      width='40' 
      height='25'>
      <span class='country-list__name'>${name.official}</span>
    </li>`;
    })
    .join('');
}

function createCountryNameInfo(elements) {
  return elements
    .map(({ name, capital, population, flags, languages }) => {
      return `<div class='country-info__box'>
      <img class='country-info__image' 
        src='${flags.svg}' 
        alt='${name.official}' 
        width="45" 
        height="35">
    <h1 class='country-info__title'>
      ${name.official}
    </h1>
    </div>
    <ul class='country-info__list'>
      <li class='country-info__item'>
          <span class='country-info__wrap'>Capital:</span>
          ${capital}
      </li>
      <li class='country-info__item'>
          <span class='country-info__wrap'>Population:</span>
          ${population}
      </li>
      <li class='country-info__item'>
          <span class='country-info__wrap'>Languages:</span>
          ${Object.values(languages)}
      </li>
    </ul>
    `;
    })
    .join('');
}

function specificAlert() {
  Notify.info('Too many matches found. Please enter a more specific name.');
}

function errorAlert() {
  Notify.warning('Oops, there is no country with that name');
}

function clearTemplate() {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
}

function createTemplate(refs, markup) {
  refs.innerHTML = markup;
}
