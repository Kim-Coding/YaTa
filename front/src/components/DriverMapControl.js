import { useState } from "react";
import request from "../utils/serverAxios";

import StyledDiv from "./layout/StyledDiv";
import { Button } from "@mui/material";
import DriverMapCallInfo from "./DriverMapCallInfo";
import { useNavigate } from "react-router-dom";

const DriverMapControl = ({
  curLatLon,
  setPathData,
  orderData,
  setOrderData,
}) => {
  const {
    startAddress,
    destinationAddress,
    userId,
    startLatLon,
    desLatLon,
    path,
  } = orderData;
  const [isWork, setIsWork] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const navigate = useNavigate();

  //경로 설정
  const setDirection = async () => {
    const result = await request.post({
      data: {
        cur: [curLatLon.lon, curLatLon.lat],
        des: [startLatLon.lon, startLatLon.lat],
      },
      uri: "/api/naver/direction",
    });

    const { path } = result.data.result;
    setPathData({ path: path });
  };

  //콜 수락
  const clickAccept = async () => {
    setIsMatching(true);
    const result = await request.post({
      uri: "/api/call/accept",
      data: { userId: userId, driverLatLon: curLatLon },
    });
    if (result.data.result) {
      setDirection();
    } else {
      setOrderData({
        startAddress: "",
        destinationAddress: "",
        desLatLon: {},
        userId: "",
        startLatLon: "",
        path: [],
      });
    }
  };

  //콜 거절
  const clickRefuse = () => {
    setOrderData({
      startAddress: "",
      destinationAddress: "",
      desLatLon: {},
      userId: "",
      startLatLon: "",
      path: [],
    });
  };

  const changeIsWork = () => {
    setIsWork(!isWork);
  };

  const pickUp = async () => {
    const result = await request.post({
      uri: "/api/call/driverpickup",
      data: { userId: orderData.userId },
    });
    if (result.data.result) {
      navigate("/driver/godestination", {
        state: {
          desLatLon: desLatLon,
          pathData: { path: path },
          driverLatLon: curLatLon,
          userId: orderData.userId,
        },
      });
    }
  };

  return (
    <StyledDiv>
      {isWork ? (
        <>
          {isMatching ? (
            <Button onClick={pickUp}>승객픽업완료</Button>
          ) : (
            <>
              <DriverMapCallInfo
                startAddress={startAddress}
                destinationAddress={destinationAddress}
                clickAccept={clickAccept}
                clickRefuse={clickRefuse}
              />
              <Button
                onClick={changeIsWork}
                variant="contained"
                color="success"
              >
                퇴근하기
              </Button>
            </>
          )}
        </>
      ) : (
        <Button onClick={changeIsWork} variant="contained">
          출근하기
        </Button>
      )}
    </StyledDiv>
  );
};

export default DriverMapControl;
