export const _errTips = (errMsg) => {
  alert(errMsg);
};

export function throttle(fn, interval) {
  let isThrottling = false,
    savedThis = null,
    savedArgs = null;

  return function wrapper(...args) {
    if (isThrottling) {
      savedThis = this;
      savedArgs = args;
      return;
    }
    isThrottling = true;
    fn.apply(this, args);
    setTimeout(() => {
      isThrottling = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedThis = null;
        savedArgs = null;
      }
    }, interval);
  };
}
