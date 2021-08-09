function observer(imgEl) {
  if (!imgEl) return;

  var ob = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.intersectionRatio > 0) {
          // 把data-src上的真正的地址赋值给src
          e.target.src = e.target.getAttribute("data-src");
          ob.unobserve(e.target);
        }
      });
    },
    {
      threshold: [0.1], // 可见度比例多少时触发
    }
  );

  imgEl.forEach((img) => {
    ob.observe(img);
  });
}
