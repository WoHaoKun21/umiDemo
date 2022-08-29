import { useEffect } from "react";
import axios from "axios";

const Nginx = () => {
  useEffect(() => {
    axios.post("http://localhost:3003/php/test.php").then((res) => {
      console.log("得到的数据：", res);
    });
  }, []);
  return <></>;
};
export default Nginx;
