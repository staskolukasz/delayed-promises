
const defaultOptions = {
  delay: 1000,
  delayFirst: false,
  createPromiseFn: null,
  extractResponseFn: response => response,
  middlewareFn: response => response,
  extractErrorFn: error => error.message,
}

const getCurrentDelay = (delay, delayFirst, i) => {
  if (i === 0) {
    return delayFirst ? delay : 0;
  }

  return delay;
}

const delayedPromises = (data, options = {}, results = [], i = 0) => (
  new Promise((resolve) => {
    const currentOptions = { ...defaultOptions, ...options };
    const { delay, delayFirst } = currentOptions;
    const currentDelay = getCurrentDelay(delay, delayFirst, i)

    setTimeout(() => {
      currentOptions.createPromiseFn(data[i])
        .then(currentOptions.extractResponseFn)
        .then((response) => { currentOptions.middlewareFn(response); return response;})
        .then((response) => {
          results.push(response);
          if (i < data.length - 1) {
            delayedPromises(data, options, results, i + 1).then(res => resolve(res));
          } else {
            resolve(results);
          }
        }).catch(error => {
          const extractedError = currentOptions.extractErrorFn(error);
          results.push(extractedError);
          resolve(results);
        })
    }, currentDelay);
  })
);

module.exports = delayedPromises;
