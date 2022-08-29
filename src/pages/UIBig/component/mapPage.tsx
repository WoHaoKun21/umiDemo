import { useEffect } from "react";
import axios from "axios";
import * as echarts from "echarts";
import mapValue from "./map";

const MapPage = () => {
  const initEchart = async () => {
    const mapData = await axios("./mock/onMap.json");
    echarts.registerMap("china", mapData.data);
    const geoCoordMap = {}; // 用来存储地区及其对应的经纬度
    echarts.util.each(mapData.data.features, (item) => {
      geoCoordMap[item.properties.name] = item.properties.center; // 存储地区及其对应的经纬度
    });
    // 添加位置坐标
    const convertData = function (data) {
      const res = [];
      for (let i in data) {
        let dataItem = data[i];
        let toCoord = geoCoordMap[dataItem.to]; // 得到目标城市的坐标
        if (toCoord) {
          res.push({
            name: dataItem.to,
            value: toCoord,
            count: dataItem.value, // 数据大小
            // symbolSize: 4, // 标记的大小
            itemStyle: {
              color: dataItem.color,
            },
          });
        }
      }
      return res;
    };
    // 添加路线图
    const convertLineData = (data) => {
      let res = [];
      for (let i in data) {
        let dataItem = data[i];
        let fromCoord = geoCoordMap[dataItem.from];
        let toCoord = geoCoordMap[dataItem.to];
        if (fromCoord && toCoord) {
          res.push({
            fromName: dataItem.from,
            toName: dataItem.to,
            coords: [fromCoord, toCoord],
            value: dataItem.value,
            color: dataItem.color,
          });
        }
      }
      return res;
    };
    const myChart = echarts.init(document.getElementById("map"));
    myChart.setOption({
      geo: {
        map: "china",
        zoom: 9.6,
        center: [119.485045, 29.797437],
        itemStyle: {
          areaColor: "#0099ff",
          borderColor: "#00ffff",
          shadowColor: "rgba(230,130,70,0.5)",
          shadowBlur: 30,
          emphasis: {
            focus: "self",
          },
        },
      },
      //   散点图数据
      tooltip: {
        trigger: "item",
        axisPointer: {
          type: "shadow",
        },
        textStyle: {
          fontSize: 12,
        },
        formatter: function (params) {
          let returnStr = "";
          if (params.componentSubType === "effectScatter") {
            returnStr += params.marker;
            returnStr += params.name + "：" + params.data.value;
          } else if (params.componentSubType === "lines") {
            returnStr += params.marker;
            returnStr += params.data.fromName + " -> " + params.data.toName;
            returnStr += "：" + params.data.value;
          }
          return returnStr;
        },
      },
      title: {
        text: "城市销量",
        left: "45%",
        textStyle: {
          color: "#fff",
          fontSize: 20,
          textShadowBlur: 10,
          textShadowColor: "#33ffff",
        },
      },
      visualMap: {
        type: "continuous",
        min: 100,
        max: 5000,
        calculable: true,
        inRange: {
          color: ["#50a3ba", "#eac736", "#d94e5d"],
        },
        textStyle: {
          color: "#fff",
        },
      },
      series: [
        {
          type: "effectScatter",
          coordinateSystem: "geo",
          symbolSize: 6,
          showEffectOn: "render", // 绘制完成后显示特效
          zlevel: 1,
          data: convertData(mapValue),
          itemStyle: {
            color: "red",
          },
          label: {
            normal: {
              show: true,
              formatter: (params) => params.data.name,
              position: "right",
              fontSize: 12,
              color: "#000000",
            },
          },
        },
        {
          type: "lines",
          zlevel: 2,
          effect: {
            show: true,
            period: 5, // 动画移动时间
            trailLength: 0.2, // 特效尾迹长度[0,1]值越大，移动越慢
            symbol: "rect", // 图形标记，也可以使用url进行设置
            symbolSize: 10, // 箭头大小
          },
          lineStyle: {
            normal: {
              color: (param) => param.data.color,
              width: 1, // 线条宽度
              // opacity: 0.2,
              curveness: 0.3, // 线条弧度
            },
          },
          data: convertLineData(mapValue),
        },
      ],
    });
  };
  useEffect(() => {
    initEchart();
  }, []);
  return (
    <div
      id="map"
      style={{
        width: "100%",
        height: "100%",
      }}
    ></div>
  );
};
export default MapPage;
