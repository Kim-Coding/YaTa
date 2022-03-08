const computeDistance = (startLat, startLon, desLat, desLon) => {
  const Radius = 6371;
  const distance =
    Math.acos(
      Math.sin(startLat) * Math.sin(desLat) +
        Math.cos(startLat) * Math.cos(desLat) * Math.cos(startLon - desLon)
    ) * Radius;
  return distance / 100;
};

export default computeDistance;
