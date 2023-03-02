const BASE_URL = 'https://restcountries.com';

function fetchCountries(name) {
  return fetch(
    `${BASE_URL}/v2/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    console.log(response);
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export { fetchCountries };