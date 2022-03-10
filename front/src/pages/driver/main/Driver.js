import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import computeDistance from "../../../utils/computeDistance";

import DriverMapControl from "../../../components/DriverMapControl";
import Map from "../../../components/Map";
import StyledDiv from "../../../components/layout/StyledDiv";
import request from "../../../utils/serverAxios";

const initialOrderData = {
  startAddress: "",
  destinationAddress: "",
  desLatLon: {},
  userSocketId: "",
  startLatLon: "",
  path: [],
};
const initialPathData = {
  path: [],
};
const socket = io("http://localhost:8080");

const Driver = () => {
  const [curLatLon, setCurLatLon] = useState({
    lat: 37.3595704,
    lon: 127.105399,
  });
  const [pathData, setPathData] = useState(initialPathData);
  const [orderData, setOrderData] = useState(initialOrderData);
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
  }, []);

  useEffect(() => {
    (async () => {
      if (orderData.userSocketId) {
        await request.post({
          uri: "/api/call/driverlocation",
          data: {
            driverLatLon: curLatLon,
            userSocketId: orderData.userSocketId,
          },
        });
      }
    })();
  }, [curLatLon]);

  useEffect(() => {
    socket.on("clientCallToDriver", async (data) => {
      const {
        userSocketId,
        startAddress,
        startLatLon,
        destinationAddress,
        destinationLatLon,
        path,
      } = data;

      const distance = await computeDistance(
        startLatLon.lat,
        startLatLon.lon,
        destinationLatLon.lat,
        destinationLatLon.lon
      );

      if (distance < 10) {
        setOrderData({
          startAddress: startAddress,
          destinationAddress: destinationAddress,
          desLatLon: destinationLatLon,
          userSocketId: userSocketId,
          startLatLon: startLatLon,
          path: path,
        });
      }
    });
  }, []);

  return (
    <StyledDiv>
      <Map
        curLatLon={curLatLon}
        setCurLatLon={setCurLatLon}
        pathData={pathData}
        desLatLon={orderData.startLatLon}
      />
      <DriverMapControl
        curLatLon={curLatLon}
        setPathData={setPathData}
        orderData={orderData}
        setOrderData={setOrderData}
      />
    </StyledDiv>
  );
};

export default Driver;
