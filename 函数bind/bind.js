Function.prototype.bind = function (obj) {
  var _fun = this;
  var _this = obj;
  return function () {
    var _arguments = [];
    for (var i = 0; i < arguments.length; i++) {
      _arguments[i] = arguments[i];
    }

    return _fun.apply(_this, _arguments);
  };
};
