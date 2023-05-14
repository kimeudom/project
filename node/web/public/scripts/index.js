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

  // Hardcoded bases
  // Carrier 1
  const bases = [[{ lat:  36.8256897638913000000, lng: -1.2845577671088600000 }, { lat: 36.8033937816614000000, lng: -1.2615738782723600000}, { lat: 36.8491497232374000000, lng: -1.3249785763381700000}], [{ lat:  36.7854573912814000000, lng: -1.2589492805767900000}, { lat: 36.7263590361103000000, lng: -1.2615294050256100000}, { lat: 36.7418823186195000000, lng: -1.3073201116690000000}],[{ lat: 36.7519878797052000000, lng: -1.3026663961548400000 }, { lat: 36.7788319088049000000, lng: -1.3307445511233200000}, { lat: 36.9232090893511000000, lng: -1.3246457448945000000}]];


  // Hardcoded base station data
  for (let i = 0; i < 3; i++){
    for (let j = 0; j < 3; j++){
      const base = document.createElement("img");
      base.src = "/src/images/tower2.png";
      const marker = new AdvancedMarkerElement({
      map: map,
      position: { lat:bases[i][j].lng, lng:bases[i][j].lat},
      title: "Base Station",
      draggable: false,
      content: base
      });
    }
  }
}