// import { Button } from 'use-commonses';

const useNPM = () => {
  const handleClick = (e: any) => {
    console.log('数据：', e);
  };
  return (
    <>
      <h3>自定义npm组件</h3>
      <hr />
      {/* <Button>数据</Button> */}
    </>
  );
};
export default useNPM;
