// In mobile / responsive mode, enable responsive navbar
function responsiveNavbar() {
  var x = document.getElementById('top');
  if (x.classList.contains('responsive')) {
    x.classList.remove('responsive');
  } else {
    x.classList.add('responsive');
  }
}

// Toggle showing details on annotation cards
const annotationToggle = document.querySelector(
  '.annotation.card > .card-title > i'
);
const annotation = document.querySelector('.annotation.card');
if (annotationToggle !== null) {
  annotationToggle.addEventListener('click', function (e) {
    e.preventDefault();
    const icon = annotation.querySelector('.card-title > i');
    const isExpanded = icon.classList.contains('fa-chevron-up');
    if (isExpanded) {
      icon.classList.remove('fa-chevron-up');
      icon.classList.add('fa-chevron-down');
    } else {
      icon.classList.add('fa-chevron-up');
      icon.classList.remove('fa-chevron-down');
    }
    annotation.querySelector('.description').classList.toggle('expanded');
    annotation.querySelector('form').classList.toggle('expanded');
  });
}

const searchParams = new URL(window.location.href).searchParams;
if (searchParams.get('dev') === 'true') {
  document.getElementById('debug-utils').style.display = 'block';
}