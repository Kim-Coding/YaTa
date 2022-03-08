import Map from "../../../components/Map";
import { useState, useEffect } from "react";

const UserWaiting = () => {
  const [curLatLon, setCurLatLon] = useState({
    lat: 37.3595704,
    lon: 127.105399,
  });

  const watchUpdateCurrentLocation = (location) => {
    setCurLatLon({
      lat: location.coords.latitude,
      lon: location.coords.longitude,
    });
  };

  useEffect(() => {
    const watchLocation = navigator.geolocation.watchPosition(
      watchUpdateCurrentLocation
    );
    return () => {
      navigator.geolocation.clearWatch(watchLocation);
    };
  }, []);
  return (
    <>
      <Map curLatLon={curLatLon} />
    </>
  );
};

export default UserWaiting;
