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
async function initMap() {
  let map;

  // Nairobi Coordinates
  const nrb = { lat: -1.289112, lng: 36.823288 };

  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // Centering the map in nairobi
  map = new Map(document.getElementById("map"), {
    zoom: 11,
    center: nrb,
    mapId: '2600f378d59f65e8'
  });

  fetch('http://localhost:55555/getAllBases')
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error retreiving bases");
    }
      return res.json();
  })
    .then((bases) => {
      len = bases.length
      for (let i = 0; i < len; i++){
        // Hardcoded base station points
          const base = document.createElement("img");
          base.src = "/src/images/tower2.png";
          const marker = new AdvancedMarkerElement({
            map: map,
            position: { lat:parseFloat(bases[i].latitude), lng:parseFloat(bases[i].longitude)},
            title: "Base Station",
            draggable: false,
            content: base
          });
        }
    })
    .catch((err) => {
      console.log("Error: ", err);
  })

  fetch('http://localhost:55555/getAllCells')
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error retreiving cells");
    }
      return res.json();
  })
    .then((cells) => {
      len = cells.length
      for (let i = 0; i < len; i++){
        const marker = new AdvancedMarkerElement({
          map: map,
          position: {lat:parseFloat(cells[i].latitude), lng:parseFloat(cells[i].longitude)},
          title: "Zone Center",
          draggable: false,
        });

        const cellCircle = new google.maps.Circle({
          strokeColor: "#FF000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "FF0000",
          fillOpacity: 0.35,
          map: map,
          center: {lat:parseFloat(cells[i].latitude), lng:parseFloat(cells[i].longitude)},
          radius: 1000
        });
      }
    })
}