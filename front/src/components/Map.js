import React, { useEffect } from "react";

const { naver } = window;

const Map = ({ curLatLon, setCurLatLon, path, desLatLon }) => {
  // 마커, 인포윈도우 생성
  const setMarkerInfoWindow = (position, map, location) => {
    const marker = new naver.maps.Marker({
      position: position,
      map: map,
    });
    const infowindow = new naver.maps.InfoWindow({
      position: position,
      content: `<div style="padding:5px;">${location}</div>`,
    });
    infowindow.open(map, marker);
  };

  useEffect(() => {
    //맵생성
    const mapOptions = {
      center: new naver.maps.LatLng(curLatLon[0], curLatLon[1]),
      zoom: 19,
      scaleControl: false,
      logoControl: false,
      mapDataControl: false,
      zoomControl: true,
      minZoom: 8,
      disableKineticPan: false,
    };
    const map = new naver.maps.Map("map", mapOptions);

    setMarkerInfoWindow(
      new naver.maps.LatLng(curLatLon[0], curLatLon[1]),
      map,
      "현위치"
    );

    map.addListener("click", (e) => {
      setCurLatLon([e.coord.y, e.coord.x]);
    });

    if (path) {
      const polyline = new naver.maps.Polyline({
        map: map,
        path: path,
        strokeColor: "#ff0000",
        strokeWeight: 3,
      });
      const center = new naver.maps.LatLng(
        (parseFloat(curLatLon[0]) + parseFloat(desLatLon[0])) / 2,
        (parseFloat(curLatLon[1]) + parseFloat(desLatLon[1])) / 2
      );
      map.setCenter(center);
      map.setZoom(14, true);
    }
  }, [curLatLon, path]);

  return (
    <div
      id="map"
      style={{
        width: "100vw",
        height: "100vh",
      }}
    ></div>
  );
};

export default Map;
