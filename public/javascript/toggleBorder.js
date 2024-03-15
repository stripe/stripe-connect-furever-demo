// Internal only: enable borders
function toggleBorder() {
  if (+window.localStorage.getItem("enableBorder")) {
    window.localStorage.setItem("enableBorder", 0);
  } else {
    window.localStorage.setItem("enableBorder", 1);
  }

  toggleBorderHelper();
}

function toggleBorderHelper() {
  const enableBorder = +window.localStorage.getItem("enableBorder");
  document.querySelectorAll("div.embedded-component").forEach((el) => {
    if (enableBorder) {
      el.classList.add("enable-border");
    } else {
      el.classList.remove("enable-border");
    }
  });

  document.querySelectorAll("a.toggle-border").forEach((el) => {
    if (enableBorder) {
      el.innerText = "Disable border";
    } else {
      el.innerText = "Enable border";
    }
  });
}
