// import * as ReactDOMServer from "react-dom/server";
import { useEffect } from "react";
import * as echarts from "echarts";
const EchartLine = () => {
  useEffect(() => {
    const container = document.getElementById("myChart");
    const myChart = echarts.init(container);
    const option = {
      title: {
        text: "折线图堆叠",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
      },
      toolbox: {
        feature: {
          saveAsImage: {}, // 保存图片
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "邮件营销",
          type: "line",
          stack: "总量",
          areaStyle: { normal: {} },
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: "联盟广告",
          type: "line",
          stack: "总量",
          areaStyle: { normal: {} },
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: "视频广告",
          type: "line",
          stack: "总量",
          areaStyle: { normal: {} },
          data: [150, 232, 201, 154, 190, 330, 410],
        },
        {
          name: "直接访问",
          type: "line",
          stack: "总量",
          areaStyle: { normal: {} },
          data: [320, 332, 301, 334, 390, 330, 320],
        },
      ],
    };
    // echarts的整体点击事件
    myChart.getZr().on("click", (params) => {
      let pointInPixel = [params.offsetX, params.offsetY]; // 获取点击位置的坐标
      // 判断电机的坐标是否在图表区域——第二个参数必须加——返回布尔值
      if (myChart.containPixel("grid", pointInPixel)) {
        // 通过坐标获取点击的点的数据——返回值是一个数组[x轴的值,y轴的坐标]
        let pointInGrid = myChart.convertFromPixel(
          {
            seriesIndex: 0,
          },
          pointInPixel
        );
        let xIndex = pointInGrid[0]; // 得到x轴的索引值
        // let handleIndex = Number(xIndex); // 将索引转换为number类型——可以省略，已经是number类型了
        let seriesObj = myChart.getOption(); // 获取所有的series
        let month = seriesObj.xAxis[0].data[xIndex]; // 得到x轴的值——周一...
        console.log(xIndex, month, seriesObj);
      }
    });
    myChart.setOption(option);
  }, []);
  return (
    <>
      <h3 style={{ textAlign: "center" }}>折线图</h3>
      <p
        id="myChart"
        style={{
          width: 600,
          height: 400,
          margin: "0 auto",
          border: "1px solid #f00",
        }}
      />
    </>
  );
};
// ReactDOMServer.renderToString：将react标签转换为原生的html标签
export default EchartLine;
