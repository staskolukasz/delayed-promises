const axios = require('axios');
const delayedPromises = require('../delayedPromises');

delayedPromises(
  [
    'https://httpbin.org/delay/0',
    'https://httpbin.org/delay/0',
    'https://httpbin.org/delay/0',
  ],
  {
    createPromiseFn: data => axios.get(data),
    middlewareFn: response => console.log(new Date()),
    extractResponseFn: response => response.data,
  }
)
.then((results) => {
  console.log(results);
})
