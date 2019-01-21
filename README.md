# delayed-promises
Resolve an array of promises, one after another but with delays

All notable changes to this project are documented in [CHANGELOG.md](https://github.com/staskolukasz/delayed-promises/blob/master/CHANGELOG.md) file.

## Idea

The main purpose of this library is to delay resolving of succeeding promises:

```
                 delay                       delay
|----------|----------------|----------|---------------|...

^                           ^
Resolve a first promise       Resolve a second promise

```

## Installation

Run `npm install delayed-promises --save` to install the library.

## Usage

### Importing

Import the module

```javascript
const delayedPromises = require('delayed-promises');
```

### Invoking
Invoke delayedPromises method with the following arguments

```javascript
delayedPromises(data, options).then(results => ... );
```

#### data
An object with data to be used to build each request

#### options
An object with configuration properties, implementing following interface:

```typescript
interface IDefaultOptions {
  delay: number;
  delayFirst: boolean;
  createPromiseFn: () => Promise<any>;
  extractResponseFn: (response: any) => any;
  middlewareFn: (response: any) => void;
  extractErrorFn: (error: any) => any;
}
```
Example of default options:
```javascript
const defaultOptions = {
  delay: 1000,
  delayFirst: false,
  createPromiseFn: null,
  extractResponseFn: response => response,
  middlewareFn: response => response,
  extractErrorFn: error => error.message,
}
```

- delay - delay between promises
- delayFirst - define whether first request should be delayed or not
- createPromiseFn - callback function to create a promise to be resolved later
- extractResponseFn - callback function to extract incoming data from http client
- middlewareFn - callback function for different purposes, like logging data
- extractErrorFn - callback function to extract incoming data from error object

## Example
### Examples to run locally
Examples with axios or fetch clients can be found in "examples" directory. To run these examples, clone repo and run following commands:

```bash
npm install
npm run example:axios
npm run example:fetch
```
### Full example

```javascript
const axios = require('axios');
const delayedPromises = require('delayed-promises');

delayedPromises(
  [
    'https://httpbin.org/delay/0',
    'https://httpbin.org/delay/0',
    'https://httpbin.org/delay/0',
  ],
  {
    createPromiseFn: dataRow => axios.get(dataRow),
    extractResponseFn: response => response.data,
  }
)
.then((results) => {
  console.log(results);
})

```