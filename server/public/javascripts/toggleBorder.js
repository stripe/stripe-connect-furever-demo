// Internal only: enable borders
function toggleBorder() {
  if (+window.localStorage.getItem('enableBorder')) {
    window.localStorage.setItem('enableBorder', 0);
  } else {
    window.localStorage.setItem('enableBorder', 1);
  }
  location.reload();
}

const enableBorder = +window.localStorage.getItem('enableBorder');
document.querySelectorAll('div.enable-border').forEach((el) => {
  if (enableBorder) {
    el.style.border = '2px solid #625afa';
    el.style['border-radius'] = '4px';
    el.style['min-width'] = 'fit-content';
  } else {
    el.style.border = 'none';
    el.style['border-radius'] = '0px';
  }
});

document.querySelectorAll('.enable-border-text').forEach((el) => {
  if (enableBorder) {
    el.innerText = 'Disable border';
  } else {
    el.innerText = 'Enable border';
  }
});
