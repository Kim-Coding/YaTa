import { useState, useEffect } from "react";
import request from "../../../utils/serverAxios";
import { io } from "socket.io-client";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import StyledDiv from "../../../components/layout/StyledDiv";
import Map from "../../../components/Map";
import MapLocationForm from "../../../components/MapLocationForm";
import { Button } from "@mui/material";

const { naver } = window;

const socket = io("http://localhost:8080");

const User = () => {
  const navigate = useNavigate();
  const [curLatLon, setCurLatLon] = useState({
    lat: 37.3595704,
    lon: 127.105399,
  });
  const [currentAddress, setCurrentAddress] = useState(
    "경기도 성남시 분당구 불정로 6 그린팩토리"
  );
  const [desLatLon, setDesLatLon] = useState();
  const [destinationAddress, setDestinationAddress] = useState("");
  const [path, setPath] = useState();
  const [pathData, setPathData] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [isCall, setIsCall] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setCurLatLon({ lat: lat, lon: lon });
        setCurrentAddress(
          searchDetailAddrFromCoords(curLatLon.lat, curLatLon.lon)
        );
      });
    }
    //매칭성공
    socket.on("successMatching", (bool) => {
      if (bool) {
        navigate("/user/waiting");
      }
    });
  }, []);

  useEffect(() => {
    setCurrentAddress(searchDetailAddrFromCoords(curLatLon.lat, curLatLon.lon));
  }, [curLatLon]);

  const submitCall = (e) => {
    e.preventDefault();
    setIsCall(true);
    socket.emit("clientCall", {
      socketId: socket.id,
      id: cookies.userId,
      userType: cookies.userType,
      startLatLon: curLatLon,
      startAddress: currentAddress,
      destinationLatLon: desLatLon,
      destinationAddress: destinationAddress,
      status: "waiting",
    });
  };

  const cancelCall = async () => {
    const result = await request.post({
      uri: "/api/call/cancel",
      data: {
        id: cookies.userId,
        userType: cookies.userType,
        startLatLon: curLatLon,
        startAddress: currentAddress,
        destinationLatLon: desLatLon,
        destinationAddress: destinationAddress,
        status: "canceled",
      },
    });
    if (result.data.result) {
      setIsCall(false);
    } else console.log("콜취소 안됨");
  };

  //경로 요청
  const setDirection = async (desCoords) => {
    setDesLatLon({
      lon: desCoords.lon,
      lat: desCoords.lat,
    });
    const result = await request.post({
      data: {
        cur: [curLatLon.lon, curLatLon.lat],
        des: [desCoords.lon, desCoords.lat],
      },
      uri: "/api/naver/direction",
    });
    const { path, summary } = result.data.result.route.traavoidtoll[0];
    const { duration, taxiFare, distance } = summary;
    setPathData({ duration: duration, taxiFare: taxiFare, distance: distance });
    setPath(path);
  };

  //주소를 좌표로
  const searchDetailCoordsrFromAdd = (add) => {
    setDestinationAddress(add);
    naver.maps.Service.geocode(
      {
        query: `${add}`,
      },
      (status, response) => {
        if (status !== naver.maps.Service.Status.OK) {
          return alert("Something wrong!");
        }
        const data = response.v2.addresses[0];
        setDirection({ lon: data.x, lat: data.y });
      }
    );
  };

  //좌표를 주소로
  const searchDetailAddrFromCoords = (lat, lon) => {
    naver.maps.Service.reverseGeocode(
      {
        coords: new naver.maps.LatLng(lat, lon),
        orders: [
          naver.maps.Service.OrderType.ADDR,
          naver.maps.Service.OrderType.ROAD_ADDR,
        ].join(","),
      },
      (status, result) => {
        if (status === naver.maps.Service.Status.OK) {
          setCurrentAddress(
            result.v2.address.roadAddress || result.v2.address.jibunAddress
          );
        }
      }
    );
  };

  return (
    <StyledDiv>
      <Map
        curLatLon={curLatLon}
        setCurLatLon={setCurLatLon}
        path={path}
        desLatLon={desLatLon}
      />
      <br></br>
      {isCall ? (
        <>
          "콜잡는 중"
          <Button onClick={cancelCall}>콜 취소</Button>
        </>
      ) : (
        <MapLocationForm
          curLatLon={curLatLon}
          searchDetailCoordsrFromAdd={searchDetailCoordsrFromAdd}
          searchDetailAddrFromCoords={searchDetailAddrFromCoords}
          currentAddress={currentAddress}
          destinationAddress={destinationAddress}
          pathData={pathData}
          submitCall={submitCall}
        />
      )}
    </StyledDiv>
  );
};

export default User;
