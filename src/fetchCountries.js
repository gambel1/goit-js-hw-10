const BASE_URL = 'https://restcountries.com';

async function fetchCountries(name) {
  const response = await fetch(
    `${BASE_URL}/v3.1/name/${name}?fields=name,capital,population,flags,languages`);
  return response;
}
// return await fetch(
//   `${BASE_URL}/v3.1/name/${name}?fields=name,capital,population,flags,languages`
// ).then(response => {
//   if (!response.ok) {
//     throw new Error(response.status);
//   }
//   return response.json();
// });

// }

export { fetchCountries };
