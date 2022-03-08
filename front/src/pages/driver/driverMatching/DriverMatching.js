import { Button } from "@mui/material";
import Map from "../../../components/Map";
import { useState } from "react";

const DriverMatching = () => {
  const [curLatLon, setCurLatLon] = useState({
    lat: 37.3595704,
    lon: 127.105399,
  });
  const payment = () => {};
  return (
    <>
      <Map curLatLon={curLatLon} />
      <Button onClick={payment}>운행종료</Button>
    </>
  );
};

export default DriverMatching;
