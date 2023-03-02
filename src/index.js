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
  const countryName = event.target.values.trim();

  fetchCountries(countryName)
    .then(data => {
      if (data.length > 10) {
        specificAlert();
        return;
      }
      renderTemplate(data);
    })
    .catch(error => {
      errorAlert();
    });
}

function renderTemplate(elements) {
  const template = '';
  const templateHandle = '';

  if (elements.length === 1) {
    template = createCountryNameInfo;
    templateHandle = countryInfo;
  } else {
    template = createCountryNameList;
    templateHandle = countryList;
  }
  createTemplate(template, templateHandle);
}

function createCountryNameList(elements) {
  return elements.map(({ flags, name }) => {
    `<li class='country-list__item'> 
      <img class='country-list__image' 
      src='${flags.svg}' 
      alt='${name.official}' 
      width='60' 
      height='40'>
      <span>${name.official}</span>
    </li>`;
  });
}

function createCountryNameInfo(elements) {
  return elements.map(({ name, capital, population, flags, languages }) => {
    `<img class='country-info__image' 
        src='${flags.svg}' 
        alt='${name.official}' 
        width="120" 
        height="80">
    <h1 class='country-info__title'>
      ${name.official}
    </h1>
    <ul class='country-info__list'>
      <li class='country-info__item'>
          <span>Capital:</span>
          ${capital}
      </li>
      <li class='country-info__item'>
          <span>Population:</span>
          ${population}
      </li>
      <li class='country-info__item'>
          <span>Languages:</span>
          ${Object.values(languages)}
      </li>
    </ul>
    `;
  });
}
console.log(createCountryNameInfo);

function specificAlert() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}

function errorAlert() {
  Notiflix.Notify.warning('Oops, there is no country with that name');
}

function createTemplate(refs, markup) {
  refs.innerHTML = markup;
}
