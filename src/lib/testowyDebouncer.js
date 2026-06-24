export function debounce(funkcjaDoWywołania, opoznienie) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      funkcjaDoWywołania(...args);
    }, opoznienie);
  };
}
