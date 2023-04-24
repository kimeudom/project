// Getting all the elements of class btn
let lastClickedBtn = null;

function highlightButton(btn) {
  if (lastClickedBtn !== null) {
    lastClickedBtn.classList.remove('highlight')
  }

  if (button != lastClickedBtn) {
    button.classList.add('highlight');
    lastClickedBtn = btn;
  } else {
    lastClickedBtn = null;
  }
}