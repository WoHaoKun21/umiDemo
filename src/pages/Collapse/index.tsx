import className from "classnames";
import "./index.less";
const Collapse = () => {
  const dataSource = [
    {
      id: 1,
      name: "姚江大闸站",
      deviceType: 2,
      address: "浙江省宁波市鄞州区甬江大道杨木碶河",
      children: [
        { name: "杨木碶浊度仪", id: 1, driveType: 2 },
        { name: "杨木碶流量计", id: 2, driveType: 1 },
      ],
    },
    {
      id: 2,
      name: "保丰碶站",
      deviceType: 2,
      address: "浙江省宁波市鄞州区甬江大道杨木碶河",
      children: [
        { name: "杨木碶浊度仪", id: 1, driveType: 2 },
        { name: "杨木碶流量计", id: 2, driveType: 1 },
      ],
    },
    {
      id: 3,
      name: "澄浪堰站",
      deviceType: 1,
      address: "浙江省宁波市海曙区澄浪巷36号",
      children: [{ name: "澄浪堰流量计", id: 1 }],
    },
    {
      id: 4,
      name: "杨木碶站",
      deviceType: 2,
      address: "浙江省宁波市鄞州区甬江大道杨木碶河",
      children: [
        { name: "杨木碶浊度仪", id: 1, driveType: 2 },
        { name: "杨木碶流量计", id: 2, driveType: 1 },
      ],
    },
  ];

  const initCollapse = (data: any) => {
    const box = data.map((item: any) => {
      return (
        <div className="CollapseItem" key={item.id}>
          <div
            className="CollapseHeader"
            onClick={(e: any) => handleShow(e, item.id)}
          >
            {item.name}
          </div>
          <div className={className(["CollapseContent", item.id])}>
            {item.children.map((i: any, index: number) => (
              <div key={index}>{i.name}</div>
            ))}
          </div>
        </div>
      );
    });
    return <div className="collapse">{box}</div>;
  };

  // 显示/隐藏子集
  const handleShow = (e: any, cl: any) => {
    let count;
    const domArr = document.getElementsByClassName("CollapseContent");
    for (let i = 0; i < domArr.length; i++) {
      domArr[i].style.display = "none";
    }
    if (count === cl) {
      document.getElementsByClassName(cl)[0].style.display = "none";
      count = 0;
    } else {
      document.getElementsByClassName(cl)[0].style.display = "block";
      count = cl;
    }
  };

  return <>{initCollapse(dataSource)}</>;
};
export default Collapse;
