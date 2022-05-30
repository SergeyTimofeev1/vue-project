// Своя кастомная директива для отслеживанрия пересечения какого-либо объекта(чтобы посты подгружались автоматически)

export default {
  mounted(el, binding) {
    const options = {
      rootMargin: "0px",
      threshold: 1.0,
    };
    const callback = (entries, observer) => {
      if (entries[0].isIntersecting) {
        binding.value();
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(el);
  },
  name: 'intersection',
}