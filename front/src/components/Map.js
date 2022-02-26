import React, { useEffect, useState } from "react";
import MapLocationForm from "./MapLocationForm";

const { kakao } = window;

const Map = () => {
  const [currentAddress, setCurrentAddress] = useState("");
  const [lat, setLat] = useState(37.3595704);
  const [lon, setLon] = useState(127.105399);
  const [message, setMessage] = useState(
    `<div style="padding:3px;">geolocation 사용X</ div>`
  );

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    });
  }

  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(lat, lon),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);

    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(lat, lon),
    });
    marker.setMap(map);

    const geocoder = new kakao.maps.services.Geocoder();
  }, [lat, lon, message]);

  return (
    <>
      <div
        id="map"
        style={{
          width: "50vw",
          height: "100vh",
        }}
      ></div>
      <MapLocationForm
        currentAddress={currentAddress}
        setCurrentAddress={setCurrentAddress}
      />
    </>
  );
};

export default Map;
