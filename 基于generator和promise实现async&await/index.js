function nextStep(iterator, resolve, reject, _next, _throw, key, args) {
  try {
    var info = iterator[key](args);
    var done = info.done;
    var value = info.value;

    if (done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  } catch (e) {
    reject(e);
  }
}

function asyncToGenerator(gen) {
  var iterator = gen();

  return new Promise((resolve, reject) => {
    function _next(value) {
      nextStep(iterator, resolve, reject, _next, _throw, "next", value);
    }

    function _throw(error) {
      nextStep(iterator, resolve, reject, _next, _throw, "throw", error);
    }

    _next(undefined);
  });
}
