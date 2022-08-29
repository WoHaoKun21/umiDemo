import { useEffect } from "react";
import axios from "axios";
import * as echarts from "echarts";
import "./comm.less";

const ItemFour = () => {
  const initEchart = async () => {
    const data = await axios("./mock/four.json");
    const myChart = echarts.init(document.getElementById("myEchartsFour"));
    myChart.setOption({
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: data.data.chartData.day,
        axisLine: {
          lineStyle: {
            color: "#fff",
          },
        },
      },
      yAxis: {
        type: "value",
        axisLine: {
          lineStyle: {
            color: "#fff",
          },
        },
      },
      legend: {},
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      series: [
        {
          name: "服饰",
          type: "bar",
          data: data.data.chartData.num.Clothes,
          stack: "total",
          label: {
            show: true,
          },
          emphasis: {
            focus: "series",
          },
        },
        {
          name: "数码",
          type: "bar",
          data: data.data.chartData.num.digit,
          stack: "total",
          label: {
            show: true,
          },
          emphasis: {
            focus: "series",
          },
        },
        {
          name: "家电",
          type: "bar",
          data: data.data.chartData.num.Electrical,
          stack: "total",
          label: {
            show: true,
          },
          emphasis: {
            focus: "series",
          },
        },
        {
          name: "家居",
          type: "bar",
          data: data.data.chartData.num.gear,
          stack: "total",
          label: {
            show: true,
          },
          emphasis: {
            focus: "series",
          },
        },
        {
          name: "日化",
          type: "bar",
          data: data.data.chartData.num.Chemicals,
          stack: "total",
          label: {
            show: true,
          },
          emphasis: {
            focus: "series",
          },
        },
      ],
    });
  };
  useEffect(() => {
    initEchart();
  }, []);
  return (
    <div>
      <h2>库存统计图</h2>
      <div className="chart" id="myEchartsFour">
        图表的容器
      </div>
    </div>
  );
};
export default ItemFour;
