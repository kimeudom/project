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

// Wait
// Delays function execution for time given in seconds
function wait(time, func) {
  setTimeout(func, time * 1000);
}

// Reloads the  map in the map div
function reloadMap() {
  // Refreshes the map
  const mapContainer = document.getElementById("main-content");
  const map = document.getElementById("map");

  map.remove();

  const mapDiv = document.createElement("div");
  mapDiv.id = "map";
  mapContainer.appendChild(mapDiv);

  wait(0.5, initMap);
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

  // Centering the map on nairobi
  map = new Map(document.getElementById("map"), {
    zoom: 11,
    center: nrb,
    mapId: '2600f378d59f65e8'
  });

  // Adding right click functionality
  map.addListener("rightclick", (event) => {
 
  console.log("Right clicked")
  var lat = event.latLng.lat();
  var lng = event.latLng.lng();
  // Define broadcast circle
  const broadcastCircle = new google.maps.Circle({
    strokeColor: "#32c755",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#32c755",
    fillOpacity: 0.55,
    map: map,
    center: { lat: lat, lng: lng },
    radius: 1000,
    draggable: true,
   editable: true
  })

  // Appending a broadcast button
  const content = document.getElementById("main-content");
  const sendBtn = document.createElement("button")
  sendBtn.className = "btn";
  sendBtn.innerText = "Send";
  sendBtn.style.marginLeft = "auto"
  sendBtn.style.marginRight = "auto"
  content.appendChild(sendBtn);
  sendBtn.addEventListener("click", () => {
    var msg = prompt("Enter Emergency Broadcast Message:");
    console.log(msg + " in lat : " + lat + " and long: " + lng);

    // Get the form input DOM 
    document.getElementById("msg").value = msg;
    document.getElementById("latitude").value = lat;
    document.getElementById("longitude").value = lng;
    document.getElementById("radius").value = 1000;
    document.getElementById("broadcast-submit-button").click();
   })
 })

  // Show tbe bases and cells
  //showBases()
  showCells()

  // Defines the broadcast Circle

  function showBases() {
    fetch('http://localhost:55555/getAllBases')
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error retreiving bases");
      }
      return res.json();
    })
    .then((bases) => {
      len = bases.length
      for (let i = 0; i < len; i++) {
        // Hardcoded base station points
        const base = document.createElement("img");
        base.src = "/src/images/tower2.png";
        const marker = new AdvancedMarkerElement({
          map: map,
          position: { lat: parseFloat(bases[i].latitude), lng: parseFloat(bases[i].longitude) },
          title: "Base Station",
          draggable: false,
          content: base
        });

        const cellCircle = new google.maps.Circle({
          strokeColor: "#FF000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "FF0000",
          fillOpacity: 0.35,
          map: map,
          center: { lat: parseFloat(cells[i].latitude), lng: parseFloat(cells[i].longitude) },
          radius: 1000
        });
      }
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
  }

  function showCells() {
    
  fetch('http://localhost:55555/getAllCells')
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error retreiving cells");
      }
      return res.json();
    })
    .then((cells) => {
      len = cells.length
      for (let i = 0; i < len; i++) {
        const cell = new AdvancedMarkerElement({
          map: map,
          position: { lat: parseFloat(cells[i].latitude), lng: parseFloat(cells[i].longitude) },
          title: "Zone Center",
          draggable: false,
        });

        const cellCircle = new google.maps.Circle({
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "FF0000",
          fillOpacity: 0.35,
          map: map,
          center: { lat: parseFloat(cells[i].latitude), lng: parseFloat(cells[i].longitude) },
          radius: 1000
        });
      }
    });
  }
}

// Reloads the  map in the map div
function reloadMapZones() {
  // Refreshes the map
  const mapContainer = document.getElementById("main-content");
  const map = document.getElementById("map");

  map.remove();

  const mapDiv = document.createElement("div");
  mapDiv.id = "map";
  mapContainer.appendChild(mapDiv);

  wait(0.5, addZone);
}

async function addZone() {
  let map;

  // Nairobi Coordinates
  const nrb = { lat: -1.289112, lng: 36.823288 };

  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // Centering the map on nairobi
  map = new Map(document.getElementById("map"), {
    zoom: 11,
    center: nrb,
    mapId: '2600f378d59f65e8'
  });

  // Adding right click functionality
  map.addListener("rightclick", (event) => {
 
       console.log("Right clicked")
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();
    // Define broadcast circle
    const broadcastCircle = new google.maps.Circle({
          strokeColor: "#32c755",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#32c755",
          fillOpacity: 0.55,
          map: map,
          center: { lat: lat, lng: lng },
          radius: 1000,
          draggable: true,
          editable: true
    })

    // Appending a broadcast button
    const content = document.getElementById("main-content");
    const sendBtn = document.createElement("button")
    sendBtn.id = "snd_btn";
    sendBtn.className = "btn";
    sendBtn.innerText = "Set Broadcast";
    sendBtn.style.marginLeft = "auto"
    sendBtn.style.marginRight = "auto"
    content.appendChild(sendBtn);

    sendBtn.addEventListener("click", () => {
      console.log(msg + " in lat : " + lat + " and long: " + lng);
   })
  })
}

function getRecords() {
  document.getElementById("main-content");
  fetch('http://localhost:55555/getRecords')
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error receiving records");
      }
      return res.json();
  }) 
    .then((records) => {
      len = records.length
      // creating the table
      const table = document.createElement("table");
      const thead = document.createElement("thread");
      const tbody = document.createElement("tbody");


      // Creating the table header row
      const headerRow = document.createElement("tr");
      for (const key in records[0]){
        const th = document.getElementById("th");
        th.textContent = key;
        headerRow.appendChild(th);
      }

      thead.appendChild(headerRow)


      // Table body
      records.forEach(item => {
        const row = document.getElementById("tr");
        for (const key in item) {
          const td = document.getElementById("td");
          td.textContent = item[key];
          row.appendChild(td);
        }
        tbody.appendChild(row);
      });

      // Assembling the table
      table.appendChild(thead);
      table.appendChild(tbody);
      tableContainer.appendChild(table);
    })
}