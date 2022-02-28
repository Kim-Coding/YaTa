import React, { useEffect, useState } from "react";
import MapLocationForm from "./MapLocationForm";

const { kakao } = window;

const Map = () => {
  const [currentAddress, setCurrentAddress] = useState(
    "경기도 성남시 분당구 불정로 6 그린팩토리"
  );
  const [lat, setLat] = useState(37.3595704);
  const [lon, setLon] = useState(127.105399);

  //좌표를 주소로
  const geocoder = new kakao.maps.services.Geocoder();
  const searchDetailAddrFromCoords = () => {
    geocoder.coord2Address(lon, lat, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setCurrentAddress(result[0].address.address_name);
      }
    });
  };

  //마커, 인포윈도우 생성
  const setMarkerInfoWindow = (position, map) => {
    const marker = new kakao.maps.Marker({
      position: position,
    });
    const infowindow = new kakao.maps.InfoWindow({
      position: position,
      content: '<div style="padding:5px;">현위치</div>',
    });
    marker.setMap(map);
    infowindow.open(map, marker);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
        searchDetailAddrFromCoords();
      });
    }
  }, []);

  useEffect(() => {
    //맵생성
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(lat, lon),
      level: 2,
    };
    const map = new kakao.maps.Map(container, options);

    setMarkerInfoWindow(new kakao.maps.LatLng(lat, lon), map);
    searchDetailAddrFromCoords();

    // 마우스 드래그로 지도 이동이 완료되었을 때
    kakao.maps.event.addListener(map, "dragend", () => {
      const latlng = map.getCenter();
      setLat(latlng.getLat());
      setLon(latlng.getLng());
      searchDetailAddrFromCoords();
    });
  }, [lat, lon, currentAddress]);

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
      <MapLocationForm currentAddress={currentAddress} />
    </>
  );
};

export default Map;
