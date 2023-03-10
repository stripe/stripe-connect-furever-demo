// Edit the relevant links to persist URL query params

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a').forEach((el) => {
    const href = el.getAttribute('href');
    // Only if it's a relative path
    if (href && href.startsWith('/')) {
      el.setAttribute('href', href + window.location.search);
    }
  });
});
