// Initialize and add the map
let map;

export async function initMap() {

  // Nairobi Coordinates
  const position = { lat: -1.289112, lng: 36.823288 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

  // The map, centered at Nairobi
  map = new Map(document.getElementById("map"), {
    zoom: 6,
    center: position,
    mapId: "NAIROBI CBD",
  });

  // Getting the bases
  for (let i = 1; i < 4; i++){
    console.log(i);
    fetch(`http://localhost:55555/getBases/${i}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });

  }
  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerView({
    map: map,
    position: position,
    title: "CBD",
  });
}
