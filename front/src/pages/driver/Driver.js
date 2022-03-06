import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import request from "../../utils/serverAxios";

import DriverControl from "../../components/DriverControl";
import Map from "../../components/Map";
import StyledDiv from "../../components/layout/StyledDiv";
import { Button } from "@mui/material";

const computeDistance = (startLat, startLon, desLat, desLon) => {
  const Radius = 6371;
  const distance =
    Math.acos(
      Math.sin(startLat) * Math.sin(desLat) +
        Math.cos(startLat) * Math.cos(desLat) * Math.cos(startLon - desLon)
    ) * Radius;
  return distance / 100;
};

const socket = io("http://localhost:8080");

const Driver = () => {
  const [curLatLon, setCurLatLon] = useState([37.3595704, 127.105399]);
  const [isWork, setIsWork] = useState(false);
  const [orderData, setOrderData] = useState();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setCurLatLon([lat, lon]);
      });
    }
  }, []);

  socket.on("successMatching", (data) => {
    console.log(data);
  });

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
        startLatLon[0],
        startLatLon[1],
        destinationLatLon[0],
        destinationLatLon[1]
      ) < 10 &&
      isWork
    ) {
      setOrderData([startAddress, destinationAddress, socketId]);
    }
  });

  const changeIsWork = () => {
    setIsWork(!isWork);
  };
  const clickAccept = async () => {
    const result = await request.post({
      uri: "/api/call",
      data: { socketId: orderData[2] },
    });
    console.log(result);
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
