import { Button } from "@mui/material";
import { useState } from "react";

const DriverControl = () => {
  const [isWork, setIsWork] = useState(false);

  const changeIsWork = () => {
    setIsWork(!isWork);
  };
  return (
    <>
      <div>DriverControl</div>
      {isWork ? (
        <Button onClick={changeIsWork} variant="contained" color="success">
          퇴근하기
        </Button>
      ) : (
        <Button onClick={changeIsWork} variant="contained">
          출근하기
        </Button>
      )}
    </>
  );
};

export default DriverControl;
