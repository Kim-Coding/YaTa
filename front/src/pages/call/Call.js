import { verifyAxios } from "../../utils/authAxios";
import { setToken } from "../../utils/token";

const Call = () => {
  const result = () => {
    verifyAxios("get", "verify").then((result) => {
      if (result.data.result) {
        setToken("accessToken", result.data.accessToken);
      }
    });
  };
  result();
  return <div>Call</div>;
};

export default Call;
