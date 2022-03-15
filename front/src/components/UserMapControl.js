import React, { useState, useEffect } from "react";
import { Box, Modal, Button, TextField } from "@mui/material";
import Postcode from "./Postcode";
import { useCookies } from "react-cookie";
import request from "../utils/serverAxios";

const UserMapControl = ({
  curLatLon,
  currentAddress,
  desLatLon,
  setDesLatLon,
  destinationAddress,
  setDestinationAddress,
  pathData,
  socket,
}) => {
  const [open, setOpen] = useState(false);
  const [second, setSecond] = useState(0);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (second > 0) {
        setSecond(second - 1);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [second]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const returnAddress = async (desAddress) => {
    handleClose();
    //주소를 좌표로
    const result = await request.post({
      uri: "/api/naver/addToCoord",
      data: { address: desAddress },
    });
    const { lat, lon } = result.data;
    setDesLatLon({ lat: lat, lon: lon });
    setDestinationAddress(desAddress);
  };

  //콜 요청
  const submitCall = async (e) => {
    e.preventDefault();
    setSecond(30);
    await request.post({
      uri: "api/call/request",
      data: {
        userSocketId: socket.id,
        userId: cookies.userId,
        userType: cookies.userType,
        startLatLon: curLatLon,
        startAddress: currentAddress,
        destinationLatLon: desLatLon,
        destinationAddress: destinationAddress,
        path: pathData.path,
        status: "waiting",
      },
    });
  };

  //콜 취소
  const cancelCall = async () => {
    const result = await request.post({
      uri: "/api/call/cancel",
      data: {
        socketId: socket.id,
        userId: cookies.userId,
        userType: cookies.userType,
        startLatLon: curLatLon,
        startAddress: currentAddress,
        destinationLatLon: desLatLon,
        destinationAddress: destinationAddress,
        status: "waiting",
      },
    });
    if (result.data.result) {
      setSecond(0);
    }
  };

  return (
    <>
      {second !== 0 ? (
        <>
          "콜잡는 중"
          <br />
          {second}
          <Button onClick={cancelCall}>콜 취소</Button>
        </>
      ) : (
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <span style={{ display: "flex", alignItems: "center" }}>
            현위치
            <TextField value={currentAddress} id="departure" />
          </span>
          <span style={{ display: "flex", alignItems: "center" }}>
            목적지
            <TextField
              type="text"
              value={destinationAddress}
              id="destination"
            />
            <Button onClick={handleOpen}>검색</Button>
            <Modal open={open} onClose={handleClose}>
              <Box>
                <Postcode returnAddress={returnAddress} />
              </Box>
            </Modal>
          </span>
          <span style={{ display: "flex", justifyContent: "center" }}>
            {destinationAddress
              ? `소요시간 : ${
                  Math.round(parseInt(pathData.duration) / 60000) || ""
                }분 / 택시요금 : ${pathData.taxiFare || ""}원 / 거리 : ${
                  parseInt(pathData.distance) / 1000 || ""
                }km`
              : ""}
          </span>
          <Button type="submit" variant="contained" onClick={submitCall}>
            콜 잡아~
          </Button>
        </Box>
      )}
    </>
  );
};

export default UserMapControl;
