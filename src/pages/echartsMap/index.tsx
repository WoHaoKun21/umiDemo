import * as echarts from "echarts";
import { useEffect } from "react";
import getJson from "./getJSON.json";
import mapData from "./map";
echarts.registerMap("china", { geoJSON: getJson });
const EchartMap = () => {
  const initMap = () => {
    const chartDom = document.getElementById("myChart");
    const myChart = echarts.init(chartDom);
    // 折线——开始
    const geoCoordMap = {};
    // 使用
    echarts.util.each(getJson.features, (dataItem, idx) => {
      geoCoordMap[dataItem.properties.name] = dataItem.properties.center; // centroid
    });
    const convertLineData = (data: any) => {
      let res = [];
      for (let i = 0; i < data.length; i++) {
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
    const convertPointData = (data) => {
      // 生成指定城市的坐标
      let res = [];
      for (let i = 0; i < data.length; i++) {
        let dataItem = data[i];
        let toCoord = geoCoordMap[dataItem.to];
        console.log("生城的数据：", dataItem, toCoord);
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
    // 折线——结束
    let option = {
      tooltip: {
        trigger: "item",
        axisPointer: {
          type: "shadow",
        },
        textStyle: {
          fontSize: 12,
        },
        formatter: function (params: any) {
          let returnStr = "";
          if (params.componentSubType === "effectScatter") {
            console.log("地图数据悬浮框参数：", params);
            returnStr += params.marker;
            returnStr += params.name + "：" + params.data.value;
          } else if (params.componentSubType === "lines") {
            console.log("折线数据悬浮框参数：", params);
            returnStr += params.marker;
            returnStr += params.data.fromName + " -> " + params.data.toName;
            returnStr += "：" + params.data.value;
          }

          return returnStr;
        },
      },
      geo: {
        type: "map",
        map: "china",
        roam: true, // 是否开启缩放和漫游
        zoom: 1.6,
        center: [104.397428, 35.90923],
        scaleLimit: {
          min: 1.5,
          // max: 5,
        },
        label: {
          // 划入进去的字体颜色
          normal: {
            show: false, // 显示省份标签
            textStyle: {
              fontSize: 10,
              color: "#1DE9B6", // 字体颜色
            },
          },
          // 划入后的字体颜色
          emphasis: {
            show: true,
            fontSize: 12,
            color: "#fff",
          },
        },
        // 高亮状态
        emphasis: {
          textStyle: {
            color: "rgb(183, 185, 14)", // 鼠标放上去显示的文字颜色
          },
        },
        itemStyle: {
          normal: {
            areaColor: {
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#08429F",
                },
                {
                  offset: 1,
                  color: "#061E3D",
                },
              ],
            },
            borderColor: "#215495",
            borderWidth: 2,
          },
          emphasis: {
            areaColor: {
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "#084DBC",
                },
                {
                  offset: 1,
                  color: "#092F5E",
                },
              ],
            },
          },
        },
        data: mapData,
      },
      series: [
        {
          type: "effectScatter",
          coordinateSystem: "geo",
          markPoint: {
            symbolSize: 1,
          },
          data: convertPointData(mapData),
          symbolSize: 10, // 标记大小，如果在data里面设置，以data里面为准
          showEffectOn: "render", // 绘制完成后显示特效
          rippleEffect: {
            brushType: "stroke", // 鼠标划入到标点，有波纹
          },
          hoverAnimation: true, // 鼠标划入标点后的动画
          // 文本显示——指定城市
          label: {
            normal: {
              show: true,
              formatter: function (param) {
                return param.data.name;
              },
              position: "right",
              fontSize: 12,
              color: "#fff",
            },
          },
          // 标点的样式
          itemStyle: {
            normal: {
              color: function (param) {
                return param.data.color;
              },
              shadowBlur: 10,
              shadowColor: "#fff",
            },
          },
          zlevel: 1, // 图形的所有图形元素都会被放置到zlevel层上，zlevel层可以通过zlevel属性进行控制。
        },
        {
          type: "lines",
          zlevel: 2,
          effect: {
            show: true,
            period: 5, // 移动速度
            trailLength: 0.2,
            symbol: "arrow",
            symbolSize: 4, // 箭头大小
          },
          lineStyle: {
            normal: {
              color: function (param) {
                return param.data.color;
              },
              width: 1, // 线条宽度
              opacity: 0.2,
              curveness: 0.3, // 线条弧度
            },
          },
          data: convertLineData(mapData),
        },
      ],
    };
    option && myChart.setOption(option, true);
  };
  useEffect(() => {
    initMap();
  }, []);
  return (
    <div>
      <div
        id="myChart"
        style={{
          width: 600,
          height: 500,
          margin: "100px auto",
          border: "1px solid #f00",
        }}
      />
    </div>
  );
};

export default EchartMap;
