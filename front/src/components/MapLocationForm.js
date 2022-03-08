import React, { useState, useEffect } from "react";
import { Box, Modal, Button, TextField } from "@mui/material";
import Postcode from "./Postcode";

const MapLocationForm = ({
  curLatLon,
  searchDetailCoordsrFromAdd,
  searchDetailAddrFromCoords,
  currentAddress,
  destinationAddress,
  pathData,
  submitCall,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const returnAddress = async (desAddress) => {
    handleClose();
    searchDetailCoordsrFromAdd(desAddress);
  };

  useEffect(() => {
    searchDetailAddrFromCoords(curLatLon.lat, curLatLon.lon);
  }, [curLatLon]);

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
      <span style={{ display: "flex", justifyContent: "center" }}>
        {pathData
          ? `소요시간 : ${Math.round(
              parseInt(pathData.duration) / 60000
            )}분 / 택시요금 : ${pathData.taxiFare} / 거리 : ${
              parseInt(pathData.distance) / 1000
            }km`
          : ""}
      </span>
      <Button type="submit" variant="contained" onClick={submitCall}>
        콜 잡아~
      </Button>
    </Box>
  );
};

export default MapLocationForm;
