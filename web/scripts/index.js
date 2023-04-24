// Loads html content into a div element into a div
// Defined by id and from a file defined by filename
function loadHtml(id, filename) {
  console.log(`div id: ${id}, filename: ${filename}`);

  let xhttp;
  let element = document.getElementById(id);
  let file = filename;

  if (file) {
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) { element.innerHTML = this.responseText; }
        if (this.status == 404) { element.innerHTML = "<h1>Page not found.</h1>" }
      }
    }
    xhttp.open("GET", `templates/${file}`, true);
    xhttp.send();
    return;
  }
}

// Pulses the color of a button on click
function pulseColor(id) {
  const btn = document.getElementById(id);
  btn.style.backgroundColor = 'aqua';
  setTimeout(() => {
    btn.style.backgroundColor = '#212227';
  }, 5000);
}

setInterval(pulseColor, 500);

setTimeout(() => {
  clearInterval(setInterval);
  btn.style.backgroundColor = '#212227';
}, 5000)