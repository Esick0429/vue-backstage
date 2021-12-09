export function debounce(func, wait) {
  let timeout;
  return function(event) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.call(this, event);
    }, wait);
  };
}
