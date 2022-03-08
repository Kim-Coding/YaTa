import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import request from "../../../utils/serverAxios";
import computeDistance from "../../../utils/computeDistance";

import DriverControl from "../../../components/DriverControl";
import Map from "../../../components/Map";
import StyledDiv from "../../../components/layout/StyledDiv";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:8080");

const Driver = () => {
  const navigate = useNavigate();
  const [curLatLon, setCurLatLon] = useState({
    lat: 37.3595704,
    lon: 127.105399,
  });
  const [isWork, setIsWork] = useState(false);
  const [orderData, setOrderData] = useState();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setCurLatLon({ lat: lat, lon: lon });
      });
    }
    socket.on("clientCallToDriver", (data) => {
      const {
        socketId,
        startAddress,
        startLatLon,
        destinationAddress,
        destinationLatLon,
      } = data;

      if (
        computeDistance(
          startLatLon.lat,
          startLatLon.lon,
          destinationLatLon.lat,
          destinationLatLon.lon
        ) < 10 &&
        isWork
      ) {
        setOrderData({
          startAddress: startAddress,
          destinationAddress: destinationAddress,
          socketId: socketId,
        });
      }
    });
  }, []);

  const changeIsWork = () => {
    setIsWork(!isWork);
  };
  const clickAccept = async () => {
    const result = await request.post({
      uri: "/api/call/accept",
      data: { socketId: orderData.socketId },
    });
    if (result.data.result) {
      navigate("/driver/matching");
    }
  };
  const clickRefuse = () => {
    setOrderData();
  };
  return (
    <StyledDiv>
      <Map curLatLon={curLatLon} />
      {isWork ? (
        <DriverControl
          changeIsWork={changeIsWork}
          clickAccept={clickAccept}
          clickRefuse={clickRefuse}
          orderData={orderData}
        />
      ) : (
        <Button onClick={changeIsWork} variant="contained">
          출근하기
        </Button>
      )}
    </StyledDiv>
  );
};

export default Driver;
