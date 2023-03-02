const BASE_URL = 'https://restcountries.com';

function fetchCountries(name) {
  return fetch(
    `${BASE_URL}/v2/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      return Promise.reject(new Error());
    }
    return response.json();
  });
}

fetchCountries();

export { fetchCountries };
