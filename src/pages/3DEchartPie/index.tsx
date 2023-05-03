import { useEffect } from 'react';
import * as echarts from 'echarts';
import 'echarts-gl';
import { getParametricEquation, getPie3D } from './config';

const color = ['#005aff', '#f8b551'];
const optionData = [
  {
    name: '启用电梯',
    value: 176,
  },
  {
    name: '停用电梯',
    value: 288,
  },
];

let myChart: any;
let option: any;

const EchartPie = () => {
  // 初始化3D饼状图
  const initEchartPie = () => {
    myChart = echarts.init(document.getElementById('myPie')!);
    // 初始化label样式
    optionData.forEach((item: any, index: number) => {
      item.itemStyle = {
        color: color[index],
      };
      item.label = {
        normal: {
          show: true,
          color: color[index],
          formatter: ['{b|{b}}', '{c|{c}}{b|台}', '{d|{d}%}'].join('\n'), // 用\n来换行
          rich: {
            b: {
              color: '#fff',
              lineHeight: 25,
              align: 'left',
            },
            c: {
              fontSize: 22,
              color: '#fff',
              textShadowColor: '#1c90a6',
              textShadowOffsetX: 0,
              textShadowOffsetY: 2,
              textShadowBlur: 5,
            },
            d: {
              color: color[index],
              align: 'left',
            },
          },
        },
      };
      item.labelLine = {
        normal: {
          lineStyle: {
            width: 1,
            color: 'rgba(255,255,255,0.7)',
          },
        },
      };
    });
    // 传入数据生成 option, 构建3d饼状图, 参数工具文件已经备注的很详细
    option = getPie3D(optionData, 0, 240, 28, 26, 1);
    myChart.setOption(option);
    // 是否需要label指引线，如果要就添加一个透明的2d饼状图并调整角度使得labelLine和3d的饼状图对齐，并再次setOption
    option.series.push({
      name: '电梯状态', //自己根据场景修改
      backgroundColor: 'transparent',
      type: 'pie',
      label: {
        opacity: 1,
        fontSize: 13,
        lineHeight: 20,
      },
      startAngle: -40, // 起始角度，支持范围[0, 360]。
      clockwise: false, // 饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
      radius: ['20%', '50%'],
      center: ['50%', '50%'],
      data: optionData,
      itemStyle: {
        opacity: 0, //这里必须是0，不然2d的图会覆盖在表面
      },
    });
    myChart.setOption(option);
    bindListen(myChart);
  };

  // 监听鼠标事件，实现饼图选中效果（单选），近似实现高亮（放大）效果。
  // optionName是防止有多个图表进行定向option传递，单个图表可以不传，默认是opiton
  const bindListen = (myChart: any) => {
    let selectedIndex = '';
    let hoveredIndex = '';
    // 监听点击事件，实现选中效果（单选）
    myChart.on('click', (params: any) => {
      if (params.seriesIndex === option.series.length - 1) return '';
      // 从 option.series 中读取重新渲染扇形所需的参数，将是否选中取反。
      const isSelected = !option.series[params.seriesIndex].pieStatus.selected;
      const isHovered = option.series[params.seriesIndex].pieStatus.hovered;
      const k = option.series[params.seriesIndex].pieStatus.k;
      const startRatio = option.series[params.seriesIndex].pieData.startRatio;
      const endRatio = option.series[params.seriesIndex].pieData.endRatio;
      // 如果之前选中过其他扇形，将其取消选中（对 option 更新）
      if (selectedIndex !== '' && selectedIndex !== params.seriesIndex) {
        option.series[selectedIndex].parametricEquation = getParametricEquation(
          option.series[selectedIndex].pieData.startRatio,
          option.series[selectedIndex].pieData.endRatio,
          false,
          false,
          k,
          option.series[selectedIndex].pieData.value,
        );
        option.series[selectedIndex].pieStatus.selected = false;
      }
      // 对当前点击的扇形，执行选中/取消选中操作（对 option 更新）
      option.series[params.seriesIndex].parametricEquation =
        getParametricEquation(
          startRatio,
          endRatio,
          isSelected,
          isHovered,
          k,
          option.series[params.seriesIndex].pieData.value,
        );
      option.series[params.seriesIndex].pieStatus.selected = isSelected;
      // 如果本次是选中操作，记录上次选中的扇形对应的系列号 seriesIndex
      selectedIndex = isSelected ? params.seriesIndex : null;
      // 使用更新后的 option，渲染图表
      myChart.setOption(option);
    });
    // // 监听 mouseover，近似实现高亮（放大）效果
    // myChart.on('mouseover', (params: any) => {
    //   // 准备重新渲染扇形所需的参数
    //   let isSelected;
    //   let isHovered;
    //   let startRatio;
    //   let endRatio;
    //   let k;
    //   // 如果触发 mouseover 的扇形当前已高亮，则不做操作
    //   if (hoveredIndex === params.seriesIndex) {
    //     // 否则进行高亮及必要的取消高亮操作
    //   } else {
    //     // 如果当前有高亮的扇形，取消其高亮状态（对 option 更新）
    //     if (hoveredIndex !== '') {
    //       // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
    //       isSelected = option.series[hoveredIndex].pieStatus.selected;
    //       isHovered = false;
    //       startRatio = option.series[hoveredIndex].pieData.startRatio;
    //       endRatio = option.series[hoveredIndex].pieData.endRatio;
    //       k = option.series[hoveredIndex].pieStatus.k;
    //       // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
    //       option.series[hoveredIndex].parametricEquation =
    //         getParametricEquation(
    //           startRatio,
    //           endRatio,
    //           isSelected,
    //           isHovered,
    //           k,
    //           option.series[hoveredIndex].pieData.value,
    //         );
    //       option.series[hoveredIndex].pieStatus.hovered = isHovered;
    //       // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
    //       hoveredIndex = '';
    //     }
    //     // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）
    //     if (
    //       params.seriesName !== 'mouseoutSeries' &&
    //       params.seriesName !== 'pie2d'
    //     ) {
    //       // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
    //       isSelected = option.series[params.seriesIndex].pieStatus.selected;
    //       isHovered = true;
    //       startRatio = option.series[params.seriesIndex].pieData.startRatio;
    //       endRatio = option.series[params.seriesIndex].pieData.endRatio;
    //       k = option.series[params.seriesIndex].pieStatus.k;
    //       // 对当前点击的扇形，执行高亮操作（对 option 更新）
    //       option.series[params.seriesIndex].parametricEquation =
    //         getParametricEquation(
    //           startRatio,
    //           endRatio,
    //           isSelected,
    //           isHovered,
    //           k,
    //           option.series[params.seriesIndex].pieData.value + 60,
    //         );
    //       option.series[params.seriesIndex].pieStatus.hovered = isHovered;
    //       // 记录上次高亮的扇形对应的系列号 seriesIndex
    //       hoveredIndex = params.seriesIndex;
    //     }
    //     // 使用更新后的 option，渲染图表
    //     myChart.setOption(option);
    //   }
    // });
    // 修正取消高亮失败的 bug
    myChart.on('globalout', () => {
      // 准备重新渲染扇形所需的参数
      let isSelected;
      let isHovered;
      let startRatio;
      let endRatio;
      let k;
      if (hoveredIndex !== '') {
        // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
        isSelected = option.series[hoveredIndex].pieStatus.selected;
        isHovered = false;
        k = option.series[hoveredIndex].pieStatus.k;
        startRatio = option.series[hoveredIndex].pieData.startRatio;
        endRatio = option.series[hoveredIndex].pieData.endRatio;
        // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
        option.series[hoveredIndex].parametricEquation = getParametricEquation(
          startRatio,
          endRatio,
          isSelected,
          isHovered,
          k,
          option.series[hoveredIndex].pieData.value,
        );
        option.series[hoveredIndex].pieStatus.hovered = isHovered;
        // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
        hoveredIndex = '';
      }
      // 使用更新后的 option，渲染图表
      myChart.setOption(option);
    });
  };

  useEffect(() => {
    initEchartPie();
    window.onresize = () => {
      myChart.resize();
    };
  }, []);
  return (
    <>
      <div
        id="myPie"
        style={{
          width: 800,
          height: 600,
          border: '1px solid #f00',
          margin: '0 auto',
        }}
      />
    </>
  );
};

export default EchartPie;
