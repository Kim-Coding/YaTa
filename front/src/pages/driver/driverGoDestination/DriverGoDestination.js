import { Button } from "@mui/material";
import Map from "../../../components/Map";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const DriverGoDestination = () => {
  const location = useLocation();
  const { desLatLon, pathData, curLoc } = location.state;
  const [curLatLon, setCurLatLon] = useState({
    lat: curLoc.lat,
    lon: curLoc.lon,
  });

  const finishDrive = () => {};

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
      <Button onClick={finishDrive}>운행종료</Button>
    </>
  );
};

export default DriverGoDestination;
