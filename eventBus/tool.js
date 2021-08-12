function Bus() {
  this.listener = {};
}

// 注册监听者和它的回调
Bus.prototype.$on = function (eventName, callback) {
  if (this.listener[eventName]) {
    this.listener[eventName].push(callback);
  } else {
    this.listener[eventName] = [callback];
  }
};

// 移除监听者和它的回调
Bus.prototype.$off = function (eventName, callback) {
  if (!this.listener[eventName]) return;

  const index = this.listener[eventName].findIndex((cb) => cb === callback);
  this.listener[eventName].splice(index, 1);
};

// 发布事件
Bus.prototype.$emit = function (eventName, ...params) {
  if (!this.listener[eventName]) return;

  this.listener[eventName].forEach((callback) => {
    callback.apply(null, params);
  });
};
