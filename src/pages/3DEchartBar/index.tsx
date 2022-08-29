import { useEffect } from 'react';
import * as echarts from 'echarts';
import 'echarts-gl';

const EchartBar = () => {
  useEffect(() => {
    EchartBar();
  }, []);
  const EchartBar = () => {
    let chartDom: any = document.getElementById('main');
    let myChart = echarts.init(chartDom);
    let option;
    let data = [
      [0, 1, 35],
      [0, 2, 45],
      [0, 3, 20],
      [0, 4, 32],
      [0, 5, 41],
      [0, 6, 26],
    ];
    option = {
      tooltip: {},
      visualMap: {
        type: 'piecewise', // continuous 线性, piecewise 饼图
        max: 60,
        inRange: {
          color: ['#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff'],
        },
        // itemWidth: 30, // 每个item的宽度,默认是30
      },
      xAxis3D: {
        type: 'category',
      },
      yAxis3D: {
        type: 'category',
      },
      zAxis3D: {
        type: 'value',
      },
      grid3D: {
        // 关闭网格
        show: true,
        boxWidth: 200,
        boxDepth: 20, // 图表的深度
        viewControl: {
          // projection: 'perspective'// 投影方式, orthographic 平行投影, perspective 立体投影
        },
        light: {
          main: {
            intensity: 1.2,
            shadow: false,
          },
          ambient: {
            intensity: 0.3,
          },
        },
        // 阴影效果
        shadow: {
          // 阴影的显示与隐藏
          show: true,
          // 阴影的颜色
          color: 'f00',
          // 阴影的透明度
          // opacity: 0.8,
          // // 阴影的模糊程度
          // blur: 0,
          // // 阴影的圆角
          // size: 10,
          // // 阴影的 X 轴偏移
          // x: 60,
          // // 阴影的 Y 轴偏移
          // y: 60,
          // // 阴影的 Z 轴偏移
          // z: 60,
        },
      },
      series: [
        {
          type: 'bar3D',
          data: data.map(function (item) {
            return {
              value: [item[1], item[0], item[2]],
            };
          }),
          shading: 'lambert', // 表面光照, 可选值: flat, gouraud, phong
          label: {
            show: false,
            fontSize: 16,
            borderWidth: 1,
          },
          emphasis: {
            label: {
              fontSize: 20,
              color: '#900',
            },
            itemStyle: {
              color: '#900',
            },
          },
        },
      ],
    };
    option && myChart.setOption(option);
  };
  return (
    <>
      <div
        id="main"
        style={{
          width: 600,
          height: 400,
          border: '1px solid #f00',
          margin: '0 auto',
        }}
      />
    </>
  );
};

export default EchartBar;
