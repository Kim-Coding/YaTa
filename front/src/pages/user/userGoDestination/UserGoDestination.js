import Map from "../../../components/Map";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const UserGoDestination = () => {
  const location = useLocation();
  const { desLatLon, pathData, curLoc } = location.state;
  const [curLatLon, setCurLatLon] = useState({
    lat: curLoc.lat,
    lon: curLoc.lon,
  });

  const watchUpdateCurrentLocation = (location) => {
    const lat = location.coords.latitude;
    const lon = location.coords.longitude;
    setCurLatLon({
      lat: lat,
      lon: lon,
    });
  };

  useEffect(() => {
    navigator.geolocation.watchPosition(watchUpdateCurrentLocation);
    return () => {
      navigator.geolocation.clearWatch();
    };
  }, []);
  return (
    <>
      <Map curLatLon={curLatLon} desLatLon={desLatLon} pathData={pathData} />
    </>
  );
};

export default UserGoDestination;
