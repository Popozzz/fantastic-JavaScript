function Container(dom, distance) {
  this.containerDom = dom;
  this.distance = distance || 0; // 希望距离底部多少触发触底事件,默认是0
}

Container.prototype.init = function () {
  this.updateScrollHeight();
  this.updateContainerHeight();
};

Container.prototype.updateScrollHeight = function () {
  var scrollHeight = this.containerDom.scrollHeight || 0;
  this.scrollHeight = scrollHeight;
  return scrollHeight;
};

Container.prototype.updateContainerHeight = function () {
  var containerHeight = this.containerDom.clientHeight || 0;
  this.containerHeight = containerHeight;
  return containerHeight;
};

Container.prototype.getScrollTop = function () {
  return this.containerDom.scrollTop || 0;
};

Container.prototype.addScrollEvent = function (fn) {
  this.containerDom.addEventListener("scroll", (event) => fn(event));
};
