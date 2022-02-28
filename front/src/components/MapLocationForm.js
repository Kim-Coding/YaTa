import React, { useState } from "react";
import { Box, Input, Modal, Button } from "@mui/material";
import Postcode from "./Postcode";

const MapLocationForm = ({ currentAddress }) => {
  const [open, setOpen] = useState(false);
  const [destination, setDestination] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const returnAddress = (address) => {
    handleClose();
    setDestination(address);
  };

  const requestCall = () => {};

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
        현위치&nbsp;
        <Input value={currentAddress} id="departure" />
      </span>
      <span style={{ display: "flex", alignItems: "center" }}>
        목적지&nbsp;
        <Input value={destination} id="destination" />
        <Button onClick={handleOpen}>검색</Button>
        <Modal open={open} onClose={handleClose}>
          <Box>
            <Postcode returnAddress={returnAddress} />
          </Box>
        </Modal>
      </span>
      <Button variant="contained" onClick={requestCall}>
        콜 잡아~
      </Button>
    </Box>
  );
};

export default MapLocationForm;
