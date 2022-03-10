import { useState, useEffect } from "react";
import request from "../../../utils/serverAxios";
import { io } from "socket.io-client";

import StyledDiv from "../../../components/layout/StyledDiv";
import Map from "../../../components/Map";
import UserMapControl from "../../../components/UserMapControl";
import { useNavigate } from "react-router-dom";

const initialPathData = {
  path: [],
  duration: "",
  taxiFare: "",
  distance: "",
  driverLatLon: { lat: "", lon: "" },
};
const socket = io("http://localhost:8080");

const User = () => {
  const [curLatLon, setCurLatLon] = useState({
    lat: 37.3595704,
    lon: 127.105399,
  });
  const [currentAddress, setCurrentAddress] = useState(
    "경기도 성남시 분당구 불정로 6 그린팩토리"
  );
  const [desLatLon, setDesLatLon] = useState();
  const [destinationAddress, setDestinationAddress] = useState("");
  const [pathData, setPathData] = useState(initialPathData);
  const [isMatching, setIsMatching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setCurLatLon({ lat: lat, lon: lon });
      });
    }
    //매칭성공
    socket.on("successMatching", () => {
      setIsMatching(true);
    });
    //driver 위치
    socket.on("driverLocation", (LatLon) => {
      const { lat, lon } = LatLon;
      setPathData({ ...pathData, driverLatLon: { lat: lat, lon: lon } });
    });
    //기사님이 픽업
    socket.on("driverPickUp", (data) => {
      navigate("/user/godestination", {
        state: {
          desLatLon: data.latlon,
          pathData: { path: data.desPath },
          curLoc: curLatLon,
        },
      });
    });
  }, []);

  useEffect(() => {
    //좌표를 주소로
    (async () => {
      const result = await request.post({
        uri: "/api/naver/coordToAdd",
        data: { lat: curLatLon.lat, lon: curLatLon.lon },
      });
      const { address } = result.data;
      setCurrentAddress(address);
    })();
  }, [curLatLon]);

  useEffect(() => {
    //경로 요청
    if (desLatLon) {
      (async () => {
        const result = await request.post({
          data: {
            cur: [curLatLon.lon, curLatLon.lat],
            des: [desLatLon.lon, desLatLon.lat],
          },
          uri: "/api/naver/direction",
        });
        const { path, summary } = await result.data.result;
        const { duration, taxiFare, distance } = summary;
        setPathData({
          ...pathData,
          path: path,
          duration: duration,
          taxiFare: taxiFare,
          distance: distance,
        });
      })();
    }
  }, [desLatLon]);

  return (
    <StyledDiv>
      <Map
        curLatLon={curLatLon}
        setCurLatLon={setCurLatLon}
        pathData={pathData}
        desLatLon={desLatLon}
      />
      <br></br>
      {isMatching ? (
        "기사님 오는 중"
      ) : (
        <UserMapControl
          curLatLon={curLatLon}
          currentAddress={currentAddress}
          desLatLon={desLatLon}
          setDesLatLon={setDesLatLon}
          destinationAddress={destinationAddress}
          setDestinationAddress={setDestinationAddress}
          pathData={pathData}
          socket={socket}
        />
      )}
    </StyledDiv>
  );
};

export default User;
