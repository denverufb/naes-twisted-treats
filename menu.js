const menuSwitch = document.querySelector(".menu-switch");
const buttons = [...menuSwitch.querySelectorAll("[data-menu-button]")];
const panels = new Map(buttons.map(button => {
  const name = button.dataset.menuButton;
  return [name, document.getElementById(name)];
}));

function showMenu(name) {
  for (const [key, panel] of panels) {
    panel.hidden = key !== name;
  }
  for (const button of buttons) {
    button.setAttribute("aria-pressed", String(button.dataset.menuButton === name));
  }
}

function showMenuFromHash() {
  const name = location.hash.slice(1);
  if (panels.has(name)) showMenu(name);
}

for (const button of buttons) {
  button.addEventListener("click", () => {
    const name = button.dataset.menuButton;
    showMenu(name);
    history.replaceState(null, "", "#" + name);
  });
}

for (const link of document.querySelectorAll("[data-menu-link]")) {
  link.addEventListener("click", () => showMenu(link.dataset.menuLink));
}

showMenu("food");
showMenuFromHash();
window.addEventListener("hashchange", showMenuFromHash);
menuSwitch.hidden = false;
