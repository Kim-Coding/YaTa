import { useEffect, useState } from "react";
import Map from "../../../components/Map";
import { useLocation, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import request from "../../../utils/serverAxios";

const socket = io("http://localhost:8080");

const UserWaiting = () => {
  const location = useLocation();
  const { pathData, driverStartLatLon, preSocketId } = location.state;
  const [driverLatLon, setDriverLatLon] = useState({ lat: "", lon: "" });
  const navigate = useNavigate();

  useEffect(() => {
    setDriverLatLon({ lat: driverStartLatLon.lat, lon: driverStartLatLon.lon });
    (async () => {
      await request.post({
        uri: "/api/call/updateid",
        data: { userSocketId: socket.id, preSocketId: preSocketId },
      });
    })();

    //driver 위치
    socket.on("driverLocation", (LatLon) => {
      const { lat, lon } = LatLon;
      setDriverLatLon({
        lat: lat,
        lon: lon,
      });
    });
    //기사님이 픽업
    socket.on("driverPickUp", (data) => {
      const { desLL, pathD, startLatLon } = data;
      navigate("/user/godestination", {
        state: {
          desLatLon: desLL,
          pathData: { path: pathD },
          curLL: startLatLon,
          preSocketId: socket.id,
        },
      });
    });
  }, []);

  return (
    <>
      <Map curLatLon={driverLatLon} pathData={pathData} userType="driver" />
      "기사님 오는 중"
    </>
  );
};

export default UserWaiting;
