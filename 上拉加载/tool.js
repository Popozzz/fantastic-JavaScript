function ScrollContainer(footerEl) {
  this.events = [];
  this.init(footerEl);
}

ScrollContainer.prototype.init = function (footerEl) {
  if (!footerEl) return;

  var ob = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        const { target, intersectionRatio } = e;
        if (target === footerEl && intersectionRatio > 0.9) {
          this.events.forEach((fn) => fn());
        }
      });
    },
    {
      threshold: [0.9], // 可见度比例多少时触发
    }
  );

  ob.observe(footerEl);
};

ScrollContainer.prototype.addScrollBottomEvent = function (fn) {
  this.events.push(fn);
};
