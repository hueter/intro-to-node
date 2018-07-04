const axios = require('axios');

const endpoint = process.argv[2];
const validEndpoints = new Set(['people', 'planets', 'films', 'vehicles']);

if (!validEndpoints.has(endpoint)) {
  console.log(`'${endpoint}' is not a valid Star Wars API endpoint!`);
  process.exit(1);
}

axios
  .get(`https://swapi.co/api/${endpoint}`)
  .then(response => {
    console.log(`There are ${response.data.count} ${endpoint} on this API.`);
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
