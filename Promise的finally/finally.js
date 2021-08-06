// finally是then的一种特例
Promise.prototype.finally = function (callback) {
  return this.then(function () {
    return Promise.resolve(callback());
  }).catch(function (error) {
    callback();
    return Promise.reject(error);
  });
};
