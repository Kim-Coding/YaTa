import StyledDiv from "./layout/StyledDiv";
import {
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

const DriverControl = ({
  changeIsWork,
  clickAccept,
  clickRefuse,
  orderData,
}) => {
  return (
    <StyledDiv>
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
              <ListItemText primary={`출발지 : ${orderData[0]}`} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary={`목적지 : ${orderData[1]}`} />
            </ListItem>
          </List>
          <Button onClick={clickRefuse} variant="contained" color="secondary">
            거절
          </Button>
          <Button onClick={clickAccept} variant="contained" color="success">
            콜 수락
          </Button>
        </Box>
      ) : (
        <Typography variant="h2" component="div">
          콜 대기중...
        </Typography>
      )}
      <br></br>
      <Button onClick={changeIsWork} variant="contained" color="success">
        퇴근하기
      </Button>
    </StyledDiv>
  );
};

export default DriverControl;
