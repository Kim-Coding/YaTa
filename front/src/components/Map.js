import React, { useEffect } from "react";

const { naver } = window;

const Map = ({ curLatLon, setCurLatLon, pathData, desLatLon }) => {
  useEffect(() => {
    //맵생성
    const mapOptions = {
      center: new naver.maps.LatLng(curLatLon.lat, curLatLon.lon),
      zoom: 19,
      scaleControl: false,
      logoControl: false,
      mapDataControl: false,
      zoomControl: true,
      minZoom: 8,
      disableKineticPan: false,
    };
    const map = new naver.maps.Map("map", mapOptions);

    //마커
    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(curLatLon.lat, curLatLon.lon),
      map: map,
    });

    //인포윈도우
    if (pathData?.driverLatLon?.lat) {
      const infowindow = new naver.maps.InfoWindow({
        position: new naver.maps.LatLng(
          pathData.driverLatLon.lat,
          pathData.driverLatLon.lon
        ),
        content: '<div style="padding:5px;">기사님</div>',
      });
      infowindow.open(map, marker);
    } else {
      const infowindow = new naver.maps.InfoWindow({
        position: new naver.maps.LatLng(curLatLon.lat, curLatLon.lon),
        content: '<div style="padding:5px;">현위치</div>',
      });
      infowindow.open(map, marker);
    }

    map.addListener("click", (e) => {
      const lat = e.coord.y;
      const lon = e.coord.x;
      setCurLatLon({ lat: lat, lon: lon });
    });

    if (pathData.path.length !== 0) {
      const polyline = new naver.maps.Polyline({
        map: map,
        path: pathData.path,
        strokeColor: "#ff0000",
        strokeWeight: 3,
      });
      const center = new naver.maps.LatLng(
        (parseFloat(curLatLon.lat) + parseFloat(desLatLon.lat)) / 2,
        (parseFloat(curLatLon.lon) + parseFloat(desLatLon.lon)) / 2
      );
      map.setCenter(center);
      map.setZoom(13, true);
    }
  }, [curLatLon, pathData]);

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
