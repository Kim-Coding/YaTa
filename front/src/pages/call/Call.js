import { useState, useEffect } from "react";
import request from "../../utils/serverAxios";
import { io } from "socket.io-client";
import { useCookies } from "react-cookie";

import StyledDiv from "../../components/layout/StyledDiv";
import Map from "../../components/Map";
import MapLocationForm from "../../components/MapLocationForm";
import { Button } from "@mui/material";

const { naver } = window;
const socket = io("http://localhost:8080");

const Call = () => {
  const [curLatLon, setCurLatLon] = useState([37.3595704, 127.105399]);
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
        setCurLatLon([lat, lon]);
        setCurrentAddress(
          searchDetailAddrFromCoords(curLatLon[0], curLatLon[1])
        );
      });
    }
  }, []);

  useEffect(() => {
    setCurrentAddress(searchDetailAddrFromCoords(curLatLon[0], curLatLon[1]));
  }, [curLatLon]);

  //매칭성공
  socket.on("successMatching", (text) => {
    console.log(text);
  });

  const submitCall = () => {
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

  const cancelCall = () => {
    setIsCall(false);
    socket.emit("cancelCall", {
      id: cookies.userId,
      userType: cookies.userType,
      startLatLon: curLatLon,
      startAddress: currentAddress,
      destinationLatLon: desLatLon,
      destinationAddress: destinationAddress,
      status: "canceled",
    });
  };

  //경로 요청
  const setDirection = async (desCoords) => {
    setDesLatLon([parseFloat(desCoords[1]), parseFloat(desCoords[0])]);
    const result = await request.post({
      data: {
        cur: [curLatLon[1], curLatLon[0]],
        des: [desCoords[0], desCoords[1]],
      },
      uri: "/api/naver/direction",
    });
    const { path, summary } = result.data.result.route.traavoidtoll[0];
    const { duration, taxiFare, distance } = summary;
    setPathData([duration, taxiFare, distance]);
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
        setDirection([data.x, data.y]);
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

export default Call;
