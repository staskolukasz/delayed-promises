const fetch = require('node-fetch');
const delayedPromises = require('../delayedPromises');

delayedPromises(
  [
    'https://httpbin.org/delay/0',
    'https://httpbin.org/delay/0',
    'https://httpbin.org/delay/0',
  ],
  {
    createPromiseFn: data => fetch(data),
    middlewareFn: response => console.log(new Date()),
    extractResponseFn: response => response.json(),
  }
)
.then((results) => {
  console.log(results);
})
