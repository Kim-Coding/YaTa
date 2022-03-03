import React, { useState, useEffect } from "react";
import { Box, Modal, Button, TextField } from "@mui/material";
import Postcode from "./Postcode";

const { naver } = window;

const MapLocationForm = ({ latlon, setDirection }) => {
  const [open, setOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(
    "경기도 성남시 분당구 불정로 6 그린팩토리"
  );
  const [destinationAddress, setDestinationAddress] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const returnAddress = async (desAddress) => {
    handleClose();
    setDestinationAddress(desAddress);
    searchDetailCoordsrFromAdd(desAddress);
  };
  const submitCall = () => {};

  //주소를 좌표로
  const searchDetailCoordsrFromAdd = (add) => {
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

  useEffect(() => {
    searchDetailAddrFromCoords(latlon[0], latlon[1]);
  }, [latlon]);

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <span style={{ display: "flex", alignItems: "center" }}>
        현위치
        <TextField value={currentAddress} id="departure" />
      </span>
      <span style={{ display: "flex", alignItems: "center" }}>
        목적지
        <TextField type="text" value={destinationAddress} id="destination" />
        <Button onClick={handleOpen}>검색</Button>
        <Modal open={open} onClose={handleClose}>
          <Box>
            <Postcode returnAddress={returnAddress} />
          </Box>
        </Modal>
      </span>
      <Button variant="contained" onClick={submitCall}>
        콜 잡아~
      </Button>
    </Box>
  );
};

export default MapLocationForm;
