// Initialize and add the map
let map;

export async function initMap() {
  // Nairobi Coordinates
  const position = { lat: -1.289112, lng: 36.823288 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 6,
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
