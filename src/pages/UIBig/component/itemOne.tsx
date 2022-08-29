import { useEffect } from "react";
import axios from "axios";
import * as echarts from "echarts";
import "./comm.less";

const ItemOne = () => {
  const initChart = async () => {
    const myChart = echarts.init(document.getElementById("oneChart"));
    const data = await axios("./mock/one.json");
    const xdata = data.data.chartData.map((v) => v.title);
    const ydata = data.data.chartData.map((v) => v.num);
    myChart.setOption({
      grid: {
        top: "3%",
        left: "1%",
        right: "6%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "value",
        axisLine: {
          lineStyle: {
            color: "#fff",
          },
        },
      },
      yAxis: {
        type: "category",
        data: xdata,
        axisLine: {
          lineStyle: {
            color: "#fff",
          },
        },
      },
      series: [
        {
          data: ydata,
          type: "bar",
          itemStyle: {
            normal: {
              barBorderRadius: [0, 20, 20, 0],
              // 颜色渐变
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: "#005eaa",
                },
                {
                  offset: 0.5,
                  color: "#339ca8",
                },
                {
                  offset: 1,
                  color: "#cda819",
                },
              ]),
            },
          },
        },
      ],
    });
  };
  useEffect(() => {
    initChart();
  }, []);
  return (
    <div>
      <h2>图表1</h2>
      <div className="chart" id="oneChart">
        图表的容器
      </div>
    </div>
  );
};
export default ItemOne;
