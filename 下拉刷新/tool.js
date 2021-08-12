function ScrollContainer(containerEl) {
  this.pullDownEvents = [];
  this.init(containerEl);
}

ScrollContainer.prototype.init = function (containerEl) {
  let isTop = false,
    startY = 0,
    endY = 0,
    topDistance = 100;
  let pulling = false;

  // 开始触摸事件
  containerEl.addEventListener("touchstart", (e) => {
    if (pulling) {
      e.preventDefault();
      return;
    }

    isTop = containerEl.scrollTop <= 0;
    if (!isTop) return;

    let touch = e.targetTouches[0];
    if (touch) {
      startY = touch.pageY;
    }
  });

  // 触摸移动事件
  containerEl.addEventListener("touchmove", (e) => {
    if (pulling) {
      e.preventDefault();
      return;
    }
    if (!isTop) return;

    let touch = e.targetTouches[0];
    if (touch) {
      endY = touch.pageY;
    }

    const distance = endY - startY;

    if (distance <= 0) {
      isTop = false;
      return;
    }

    containerEl.style.transform = `translateY(${Math.min(
      topDistance,
      distance
    )}px)`;
  });

  // 停止触摸事件
  containerEl.addEventListener("touchend", (e) => {
    if (pulling) {
      e.preventDefault();
      return;
    }
    if (!isTop) return;

    let touch = e.targetTouches[0];
    if (touch) {
      endY = touch.pageY;
    }

    const distance = endY - startY;
    if (distance < topDistance / 2) {
      containerEl.style.transform = "translateY(0)";
      return;
    }

    containerEl.style.transform = `translateY(${topDistance}px)`;

    pulling = true;

    let p = this.pullDownEvents.reduce((prev, fn) => {
      const result = fn();
      if (result instanceof Promise) {
        prev.push(result);
      }
      return prev;
    }, []);

    Promise.all(p).finally(() => {
      pulling = false;
      containerEl.style.transform = "translateY(0)";
    });
  });
};

// 注册下拉刷新事件
ScrollContainer.prototype.addPullDownRefresh = function (fn) {
  this.pullDownEvents.push(fn);
};
