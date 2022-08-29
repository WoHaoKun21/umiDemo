import { connect, useDispatch, useSelector, useModel } from 'umi';
const umiDva = (props: any) => {
  let { name, count, dispatch } = props;
  const dispat = useDispatch(); // 创建dispatch方法
  const { test }: any = useSelector((data) => data); // 获得store里面的数据
  const model = useModel('global');
  // 创建方法，改变umi中dva的数据
  const add = () => {
    count++;
    dispatch({ type: 'test/add', payload: { count } });
    dispat({ type: 'test/add', payload: { count } });
  };
  const changeName = () => {
    dispatch({ type: 'test/changeName', payload: { name: 'tom' } });
    dispat({ type: 'test/changeName', payload: { name: 'jarry' } });
  };
  return (
    <>
      <p>计数器：{count}</p>
      <p>姓名：{name}</p>
      <button onClick={add}>+</button>
      <button onClick={changeName}>改变名字</button>
    </>
  );
};
const mapStateToProps = ({ test }: any, data: any) => {
  // console.log('数据展示：', state, data);
  return {
    count: test.count,
    name: test.name,
  };
};
export default connect(mapStateToProps)(umiDva);
