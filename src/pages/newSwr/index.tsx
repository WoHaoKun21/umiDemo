import useSWR from "swr";
import Nginx from "./Nginx";
const NewSwr = () => {
  const fetcher = (url: string) =>
    fetch(url, { method: "POST" }).then((r) => r.json());
  const { data, error } = useSWR("/api", fetcher);

  return (
    <>
      <h3>新hooks测试</h3>
      <p>数据：{`${data} + ${error}`}</p>
      <Nginx />
    </>
  );
};
export default NewSwr;
