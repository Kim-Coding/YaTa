import React, { useEffect, useState } from "react";
import MapLocationForm from "./MapLocationForm";
import request from "../utils/serverAxios";

const { naver } = window;

const Map = () => {
  const [latlon, setLatLon] = useState([37.3595704, 127.105399]);

  const setDirection = async (desCoords) => {
    const result = await request.post({
      data: { cur: [latlon[1], latlon[0]], des: [desCoords[0], desCoords[1]] },
      uri: "/api/naver",
    });
    const { route } = result.data.result;
  };

  // 마커, 인포윈도우 생성
  const setMarkerInfoWindow = (position, map) => {
    const marker = new naver.maps.Marker({
      position: position,
      map: map,
    });
    const infowindow = new naver.maps.InfoWindow({
      position: position,
      content: '<div style="padding:5px;">현위치</div>',
    });
    infowindow.open(map, marker);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setLatLon([lat, lon]);
      });
    }
  }, []);

  useEffect(() => {
    //맵생성
    const mapOptions = {
      center: new naver.maps.LatLng(latlon[0], latlon[1]),
      zoom: 19,
    };
    const map = new naver.maps.Map("map", mapOptions);

    setMarkerInfoWindow(new naver.maps.LatLng(latlon[0], latlon[1]), map);

    map.addListener("click", (e) => {
      setLatLon([e.coord.y, e.coord.x]);
    });
  }, [latlon]);

  return (
    <>
      <div
        id="map"
        style={{
          width: "100vw",
          height: "100vh",
        }}
      ></div>
      <br></br>
      <MapLocationForm latlon={latlon} setDirection={setDirection} />
    </>
  );
};

export default Map;
