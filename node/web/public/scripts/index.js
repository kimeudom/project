// Importing maps

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

// Getting all the elements of class btn
let lastClickedBtn = null;

function highlightButton(btn) {
  if (lastClickedBtn !== null && lastClickedBtn !== btn) {
    lastClickedBtn.classList.remove('highlight')
  }

  if (btn != lastClickedBtn) {
    btn.classList.add('highlight');
    lastClickedBtn = btn;
  } else {
    lastClickedBtn = null;
  }
}

// Initialize and add the map
let map;

async function initMap() {
  // Nairobi Coordinates
  const position = { lat: -1.289112, lng: 36.823288 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

  // The map, centered at Nariobi
  map = new Map(document.getElementById("map"), {
    zoom: 10,
    center: position,
    mapId: "NAIROBI CBD",
  });

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerView({
    map: map,
    position: position,
    title: "CBD",
  });
}
