import Map from "../../../components/Map";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import request from "../../../utils/serverAxios";

const socket = io("http://localhost:8080");

const UserGoDestination = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { desLatLon, pathData, curLL, preSocketId } = location.state;
  const [curLatLon, setCurLatLon] = useState({
    lat: curLL.lat,
    lon: curLL.lon,
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
    (async () => {
      await request.post({
        uri: "/api/call/updateid",
        data: { userSocketId: socket.id, preSocketId: preSocketId },
      });
    })();

    socket.on("finishDrive", () => {
      alert("운행이 종료되었습니다");
      navigate("/user");
    });

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
