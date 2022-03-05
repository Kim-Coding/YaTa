import DriverControl from "../../components/DriverControl";
import Map from "../../components/Map";
import { useState, useEffect } from "react";
import StyledDiv from "../../components/layout/StyledDiv";

const Driver = () => {
  const [curLatLon, setCurLatLon] = useState([37.3595704, 127.105399]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setCurLatLon([lat, lon]);
      });
    }
  }, []);
  return (
    <StyledDiv>
      <Map curLatLon={curLatLon} />
      <DriverControl></DriverControl>
    </StyledDiv>
  );
};

export default Driver;
