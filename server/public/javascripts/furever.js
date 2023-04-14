// In mobile / responsive mode, enable responsive navbar
function responsiveNavbar() {
  var x = document.getElementById('top');
  if (x.classList.contains('responsive')) {
    x.classList.remove('responsive');
  } else {
    x.classList.add('responsive');
  }
}

const annotationCards = document.querySelectorAll('.annotation > .card')

annotationCards.forEach((annotationCard) => {
  const annotationToggle = annotationCard.querySelector('.card-title > i')
  if (annotationToggle !== null) {
    annotationToggle.addEventListener('click', function (e) {
      e.preventDefault();
      const icon = annotationCard.querySelector('.card-title > i');
      const isExpanded = icon.classList.contains('fa-chevron-up');
      if (isExpanded) {
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
      } else {
        icon.classList.add('fa-chevron-up');
        icon.classList.remove('fa-chevron-down');
      }
      annotationCard.querySelector('.description').classList.toggle('expanded');
      annotationCard.querySelector('form').classList.toggle('expanded');
    });
  }
});

const searchParams = new URL(window.location.href).searchParams;
if (searchParams.get('dev') === 'true') {
  document.getElementById('debug-utils').style.display = 'block';
}