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

    // Get the form input DOM 
    document.getElementById("msg").value = msg;
    document.getElementById("latitude").value = broadcastCircle.getCenter().lat();
    document.getElementById("longitude").value = broadcastCircle.getCenter().lng();
    document.getElementById("radius").value = broadcastCircle.getRadius();
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
      let noOfRecords = records.length

      // Initial display of records
      displayRecords(0, 5, records);

      // Button click event handlers
      const prevButton = document.getElementById("prev-button"); 
      const nextButton = document.getElementById("next-button"); 

      const recordsPerPage = 5;
      let currentPage = 0;
      const totalPages = Math.ceil(noOfRecords / recordsPerPage);

      prevButton.addEventListener("click", () => {
        if (currentPage > 0) {
          currentPage--;
          const startIndex = currentPage * recordsPerPage;
          const endIndex = startIndex - recordsPerPage;
          displayRecords(startIndex, endIndex, records);
        }
      });

      nextButton.addEventListener("click", () => {
        const totalRecords = records.length;
        const totalPages = Math.ceil(totalRecords / recordsPerPage);
        if (currentPage < totalPages - 1) {
          const startIndex = currentPage * recordsPerPage;
          const endIndex = startIndex + recordsPerPage;
          displayRecords(startIndex, endIndex, records);
        }
      } )

    })
}

// Create rows from json objs
function generateTableRows(records) {
  let rows = `
    <th>Date and Time</th>
    <th>Broadcast Message</th>
    <th>Radius</th>
    <th>Visualize on Map</th>
 `;
  for (const record of records) {
    const date = new Date(parseInt(record.id));

    // Get individual components of the date and time
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Month is zero-based, so adding 1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    rows += `
    <tr>
      <td>${year}-${month}-${day} ${hours}:${minutes}:${seconds}</td>
      <td>${record.msg}</td>
      <td>${(record.radius / 1000).toFixed(3)} Km(s)</td>
      <td><button class="btn" onclick="visualizeMap(${record.lat}, ${record.lng}, ${record.radius}, ${record.id}, '${record.msg}')">Visualize</button></td>
    </tr>
    `;
  }

  return rows;
}

// Display records in a table
function displayRecords(start, end, data, msg) {
  const tableBody = document.getElementById("table");
  const records = data.slice(start, end);

  tableBody.innerHTML = generateTableRows(records);
}

function visualizeMap(lat, lng, radius, timestamp, msg) {
  var mainContent = document.getElementById("main-content");
 mainContent.innerHTML = `
 <div>
 <div>
 <button class="btn" onclick="loadHtml('main-content', 'records.html'); getRecords()">Back</button>
 </div>
  <div id="map">
  <script src="../scripts/map.js"></script>
    <script
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAX-HF4LHmA6Nhgm2k-oUs3KueCL09MHa0&map_ids=2600f378d59f65e8&callback=visualize"></script>
 
  </div> 
 </div>
  `;
  async function visualize() {
    let map;

    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    // Center the map on the broadcast zone
    map = new Map(document.getElementById("map"), {
      zoom: 08,
      center: { lat: lat, lng: lng },
      mapId: '2600f378d59f65e8'
    });

  // Former broadcast zone
    broadCastZone = new google.maps.Circle({
      strokeColor: "#eb9534",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#eb9534",
      fillOpacity: 0.55,
      map: map,
      center: { lat: lat, lng: lng },
      radius: radius,
      draggable: false,
      editable: false
    });

    const date = new Date(parseInt(timestamp));
    console.log(timestamp)

    // Get individual components of the date and time
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Month is zero-based, so adding 1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
 
    messageBox = `
    Timestamp: ${year}-${month}-${day} ${hours}:${minutes}:${seconds}<br>
    Message Payload: <b>${msg}</b><br>
    Broadcast Range: <b>${(radius / 1000).toFixed(3)} Km(s)</b>`

    banner = new google.maps.InfoWindow({
      content: messageBox,
      position: broadCastZone.center,
      map: map,
      closeBoxUrl: '',
      enableEventPropagation: true
    });

    broadCastZone.addListener("click", () => {
      banner.open(map);
    })
 }
  visualize();
}

function getTransactions() {
  // Open a new tab
  const newTab = window.open('', '_blank');

  // Send a GET request to the server endpoint
  fetch('/transactionalReport')
    .then(response => {
      if (response.ok) {
        // Return the response as a blob
        return response.blob();
      } else {
        throw new Error('Error generating PDF');
      }
    })
    .then(blob => {
      // Create a URL object from the blob
      const url = URL.createObjectURL(blob);

      // Set the URL as the source of the new tab
      newTab.location.href = url;
    })
    .catch(error => {
      console.error('Error: ', error);
      newTab.close(); // Close the new tab in case of an error
    });
}