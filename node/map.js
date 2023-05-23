// Map functions

// Harvesine Distance
function harvesineDistance(x, y) {
  const earthRadius = 6371e3;

  // Converting the latitudes and longitudes supplied into radians
  const phi1 = x.lat * (Math.PI / 180);
  const phi2 = y.lat * (Math.PI / 180);
  const deltaPhi = (y.lat - x.lat) * (Math.PI / 180);
  const deltaLambda = (y.lng - x.lng) * (Math.PI / 180);

  // Apply Haversine formula
  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Calculate the distance in meters
  const distance = earthRadius * c;
  return distance;

}

// Returns true if a client is within range of a broadcast circle
function inBroadcastCircle(clientCoords, broadcastCoords, radius) {

  var euchDistance = harvesineDistance(clientCoords, broadcastCoords);

  return (euchDistance <= radius);
}

// Returns true if a client is within range of a base station's cell
function inRange(clientCoords, cellCoords, radius) {
  var euchDistance = harvesineDistance(clientCoords, cellCoords);

  return (euchDistance <= radius);
}

module.exports = {
  inBroadcastCircle,
  inRange
}