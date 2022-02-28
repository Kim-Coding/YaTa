import { useState } from "react";
import StyledDiv from "./layout/StyledDiv";
import {
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

const DriverControl = () => {
  const [isWork, setIsWork] = useState(false);
  const [orderData, setOrderData] = useState(true);

  const changeIsWork = () => {
    setIsWork(!isWork);
  };

  const clickAccept = () => {};
  const clickRefuse = () => {};
  return (
    <StyledDiv>
      {isWork ? (
        <>
          {orderData ? (
            <Box
              sx={{
                width: "100%",
                maxWidth: 360,
                backgroundColor: "primary.main",
              }}
            >
              <List>
                <ListItem disablePadding>
                  <ListItemText primary={`출발지 : ${orderData}`} />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemText primary={`목적지 : ${orderData}`} />
                </ListItem>
              </List>
              <Button
                onClick={clickRefuse}
                variant="contained"
                color="secondary"
              >
                거절
              </Button>
              <Button onClick={clickAccept} variant="contained" color="success">
                콜 수락
              </Button>
            </Box>
          ) : (
            <Typography variant="h1" component="div">
              콜 대기중...
            </Typography>
          )}
          <br></br>
          <Button onClick={changeIsWork} variant="contained" color="success">
            퇴근하기
          </Button>
        </>
      ) : (
        <Button onClick={changeIsWork} variant="contained">
          출근하기
        </Button>
      )}
    </StyledDiv>
  );
};

export default DriverControl;
