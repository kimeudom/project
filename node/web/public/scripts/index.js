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
let isMapSet = false;
function reloadMap() {
  if (isMapSet === true) {
    return
  }
  initMap();
}

async function initMap() {
  // Nairobi Coordinates
  const position = { lat: -1.289112, lng: 36.823288 };
  const archives = { lat: -1.2848900588454208, lng: 36.82551696564829};
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

  // The map, centered at Nariobi
  map = new Map(document.getElementById("map"), {
    zoom: 13,
    center: position,
    mapId: "NAIROBI CBD",
  });

  // Fetching bases
  for (let i = 0; i < 4; i++){
    fetch(`/getBases/${i}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err)
      })
  }
}


function test() {
  // Getting the bases
  dataArray = []
  for (let i = 1; i < 4; i++) {
    fetch(`http://localhost:55555/getBases/`)
      .then(res => res.json())
      .then(data => {
        dataArray += data;
      });
  }
  console.log(dataArray);
}