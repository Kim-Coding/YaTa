import { Button } from "@mui/material";
import Map from "../../../components/Map";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import request from "../../../utils/serverAxios";

const DriverGoDestination = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { desLatLon, pathData, driverLatLon, userId } = location.state;
  const [curLatLon, setCurLatLon] = useState({
    lat: driverLatLon.lat,
    lon: driverLatLon.lon,
  });

  const finishDrive = async () => {
    const result = await request.post({
      uri: "/api/call/finish",
      data: { userId: userId },
    });
    if (result.data.result) {
      alert("안전 운전 감사합니다");
      navigate("/driver");
    }
  };

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
