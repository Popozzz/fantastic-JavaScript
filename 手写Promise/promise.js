// promise 接受一个函数
function LikePromise(init = () => {}) {
  this.state = "pending"; // pending, fulfilled, rejected
  this.cb = []; // 回调事件
  this.result = null;

  const resolve = (res) => {
    setTimeout(() => {
      this.state = "fulfilled";
      this.result = res;
      this._handleCb();
    }, 0);
  };

  const reject = (error) => {
    setTimeout(() => {
      this.state = "rejected";
      this.result = new Error(error);
      this._handleCb();
    }, 0);
  };

  init(resolve, reject);
}

LikePromise.prototype.then = function (fn) {
  this.cb.push({ state: "success", cb: fn });

  if (this.state !== "pending") {
    this._handleCb();
  }

  return this;
};

LikePromise.prototype.catch = function (fn) {
  this.cb.push({ state: "failed", cb: fn });

  if (this.state !== "pending") {
    this._handleCb();
  }

  return this;
};

LikePromise.prototype._handleCb = function () {
  if (this.state === "pending") return;

  let status = this.state === "fulfilled" ? "success" : "failed";

  const index = this.cb.findIndex((c) => c.state === status);
  if (index > -1) {
    let target = this.cb[index];
    this.cb.splice(0, index + 1);

    let result;
    try {
      result = target.cb(this.result);

      if (!result || !(result instanceof LikePromise)) {
        // 返回的不是一个Promise
        result = LikePromise.resolve(result);
      }
    } catch (error) {
      result = LikePromise.reject(error);
    }

    this.cb.forEach((c) => {
      if (c.state === "success") {
        result.then(c.cb);
      }

      if (c.state === "failed") {
        result.catch(c.cb);
      }
    });

    return result;
  }
};

LikePromise.resolve = (data) => {
  return new LikePromise((resolve) => {
    resolve(data);
  });
};

LikePromise.reject = (data) => {
  return new LikePromise((resolve, reject) => {
    reject(data);
  });
};
