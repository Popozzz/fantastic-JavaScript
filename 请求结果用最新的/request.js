var requestMap = {};

// time是模拟请求用时
function request(url, time = 1000) {
  if (!requestMap[url]) {
    requestMap[url] = {
      weight: 0, // 权重
      currentWeight: 0, // 当前最大权重
    };
  }

  let selfWeight = ++requestMap[url].weight;

  return new Promise((resolve) => {
    setTimeout(resolve, time);
  }).then(() => {
    console.log("selfWeight", selfWeight, requestMap[url]);
    if (selfWeight > requestMap[url].currentWeight) {
      requestMap[url].currentWeight = selfWeight;
      return "ok";
    } else {
      return Promise.reject("outDate");
    }
  });
}
