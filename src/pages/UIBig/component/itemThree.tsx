import { useEffect } from "react";
import axios from "axios";
import * as echarts from "echarts";
import "./comm.less";

const IemThree = () => {
  const initEcharts = async () => {
    const data = await axios("./mock/three.json");
    const myChart = echarts.init(document.getElementById("myEcharts"));
    myChart.setOption({
      legend: {
        top: "bottom",
      },
      tooltip: {
        show: true,
      },
      series: [
        {
          type: "pie",
          data: data.data.chartData,
          radius: [10, 100],
          center: ["50%", "45%"],
          roseType: "area",
          itemStyle: {
            borderRadius: 10,
          },
        },
      ],
    });
  };
  useEffect(() => {
    initEcharts();
  }, []);
  return (
    <div>
      <h2>库存统计</h2>
      <div className="chart" id="myEcharts">
        图表的容器
      </div>
    </div>
  );
};
export default IemThree;
