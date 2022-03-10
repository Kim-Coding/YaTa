import {
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

const DriverMapCallInfo = ({
  startAddress,
  destinationAddress,
  clickAccept,
  clickRefuse,
}) => {
  return (
    <>
      {startAddress !== "" ? (
        <Box
          sx={{
            width: "100%",
            maxWidth: 360,
            backgroundColor: "primary.main",
          }}
        >
          <List>
            <ListItem disablePadding>
              <ListItemText primary={`출발지 : ${startAddress || ""}`} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary={`목적지 : ${destinationAddress || ""}`} />
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
    </>
  );
};

export default DriverMapCallInfo;
