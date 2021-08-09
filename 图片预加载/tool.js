function preLoad(srcs) {
  if (!srcs instanceof Array) {
    srcs = [srcs];
  }

  srcs.forEach((src) => {
    let img = new Image();
    img.src = src;
  });
}
