import { useEffect } from 'react';
import * as echarts from 'echarts';
import 'echarts-gl';

const optionData = [
  {
    name: '林地面积统计',
    value: 10000,
    itemStyle: {
      color: '#22c4ff',
    },
  },
  {
    name: '草地面积统计',
    value: 12116,
    itemStyle: {
      color: '#000000',
    },
  },
  {
    name: '草地面积统计1',
    value: 19899,
    itemStyle: {
      color: '#5665bb',
    },
  },
  {
    name: '草地面积统计2',
    value: 22116,
    itemStyle: {
      color: '#dd66dd',
    },
  },
  {
    name: '草地面积统计3',
    value: 62996,
    itemStyle: {
      color: '#9630ff',
    },
  },
  {
    name: '耕地地面积统计',
    value: 46616,
    itemStyle: {
      color: '#ffaaff',
    },
  },
];

let myChart: any;
let option: any;

const EchartPie = () => {
  // 初始化3D饼状图
  const initEchartPie = () => {
    myChart = echarts.init(document.getElementById('myPie')!);
    option = getPie3D(optionData, 0); // 0.8透明空心占比
    myChart.setOption(option);
    //是否需要label指引线，如果要就添加一个透明的2d饼状图并调整角度使得labelLine和3d的饼状图对齐，并再次setOption
    option.series.push({
      name: 'pie2d',
      type: 'pie',
      labelLine: {
        length: 10,
        length2: 10,
      },
      startAngle: -20, //起始角度，支持范围[0, 360]。
      clockwise: false, //饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
      radius: ['20%', '50%'],
      center: ['50%', '50%'],
      data: optionData,
      itemStyle: {
        opacity: 0,
      },
    });

    myChart.setOption(option);
    bindListen(myChart);
  };

  // 处理饼状图数据;
  const getPie3D = (pieData: any[], internalDiameterRatio: number) => {
    let series = [];
    let sumValue = 0;
    let startValue = 0;
    let endValue = 0;
    let legendData: any = [];
    let legendBfb: any = [];
    let k = 1 - internalDiameterRatio;
    pieData.sort((a, b) => {
      return b.value - a.value;
    });
    // 为每一个饼图数据，生成一个 series-surface 配置
    for (let i = 0; i < pieData.length; i++) {
      sumValue += pieData[i].value;
      let seriesItem: any = {
        name:
          typeof pieData[i].name === 'undefined'
            ? `series${i}`
            : pieData[i].name,
        type: 'surface',
        parametric: true,
        wireframe: {
          show: false,
        },
        pieData: pieData[i],
        pieStatus: {
          selected: false,
          hovered: false,
          k: k,
        },
        center: ['10%', '50%'],
      };
      if (typeof pieData[i].itemStyle != 'undefined') {
        let itemStyle: any = {};
        typeof pieData[i].itemStyle.color != 'undefined'
          ? (itemStyle.color = pieData[i].itemStyle.color)
          : null;
        typeof pieData[i].itemStyle.opacity != 'undefined'
          ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
          : null;
        seriesItem.itemStyle = itemStyle;
      }
      series.push(seriesItem);
    }
    for (let i = 0; i < series.length; i++) {
      endValue = startValue + series[i].pieData.value;
      series[i].pieData.startRatio = startValue / sumValue;
      series[i].pieData.endRatio = endValue / sumValue;
      series[i].parametricEquation = getParametricEquation(
        series[i].pieData.startRatio,
        series[i].pieData.endRatio,
        false,
        false,
        k,
        series[i].pieData.value,
      );
      startValue = endValue;
      let bfb = fomatFloat(series[i].pieData.value / sumValue, 4);
      legendData.push({
        name: series[i].name,
        value: bfb,
      });
      legendBfb.push({
        name: series[i].name,
        value: bfb,
      });
    }
    let boxHeight = getHeight3D(series, 30); //通过传参设定3d饼/环的高度，26代表26px
    console.log(series, boxHeight);

    let option = {
      legend: {
        data: legendData,
        orient: 'horizontal',
        left: 10,
        top: 10,
        itemGap: 10,
        textStyle: {
          color: '#A1E2FF',
        },
        show: false,
        icon: 'circle',
        formatter: function (param: any) {
          let item = legendBfb.filter((item: any) => item.name == param)[0];
          let bfs = fomatFloat(item.value * 100, 2) + '%';
          return `${item.name}  ${bfs}`;
        },
      },
      labelLine: {
        show: false,
        lineStyle: {
          color: 'rgba(255,0,0,0)',
        },
      },
      label: {
        show: false,
        position: 'center',
        rich: {
          b: {
            color: '#7BC0CB',
            fontSize: 12,
            lineHeight: 20,
          },
          c: {
            fontSize: 16,
          },
        },
        formatter: '{b|{b} \n}{c|{c}}{b|  亩}',
      },
      tooltip: {
        formatter: (params: any) => {
          // console.log(this.optionData[params.seriesIndex].value);
          if (
            params.seriesName !== 'mouseoutSeries' &&
            params.seriesName !== 'pie2d'
          ) {
            // console.log(params.seriesName)
            let bfb = (
              (option.series[params.seriesIndex].pieData.endRatio -
                option.series[params.seriesIndex].pieData.startRatio) *
              100
            ).toFixed(2);
            return (
              `${params.seriesName}<br/>` +
              `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>` +
              `${bfb}%<br/>` +
              `${optionData[params.seriesIndex].value}`
            );
          }
        },
      },
      xAxis3D: {
        min: -1,
        max: 1,
      },
      yAxis3D: {
        min: -1,
        max: 1,
      },
      zAxis3D: {
        min: -1,
        max: 1,
      },
      grid3D: {
        show: false,
        boxHeight: boxHeight, //圆环的高度
        viewControl: {
          //3d效果可以放大、旋转等，请自己去查看官方配置
          alpha: 20, //角度
          distance: 200, //调整视角到主体的距离，类似调整zoom
          rotateSensitivity: 1, //设置为0无法旋转
          zoomSensitivity: 1, //设置为0无法缩放
          panSensitivity: 1, //设置为0无法平移
        },
      },
      series: series,
    };
    return option;
  };

  // 获取3d丙图的最高扇区的高度
  const getHeight3D = (series: any[], height: number) => {
    series.sort((a, b) => {
      return b.pieData.value - a.pieData.value;
    });
    return (height * 25) / series[0].pieData.value;
  };

  // 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
  const getParametricEquation = (
    startRatio: number,
    endRatio: number,
    isSelected: boolean,
    isHovered: boolean,
    k: number,
    h: number,
  ) => {
    // 计算
    let midRatio = (startRatio + endRatio) / 2;
    let startRadian = startRatio * Math.PI * 2;
    let endRadian = endRatio * Math.PI * 2;
    let midRadian = midRatio * Math.PI * 2;
    // 如果只有一个扇形，则不实现选中效果。
    if (startRatio === 0 && endRatio === 1) {
      isSelected = false;
    }
    // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
    k = typeof k !== 'undefined' ? k : 1 / 3;
    // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
    let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
    let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;
    // 计算高亮效果的放大比例（未高亮，则比例为 1）
    let hoverRate = isHovered ? 1.05 : 1;
    // 返回曲面参数方程
    return {
      u: {
        min: -Math.PI,
        max: Math.PI * 3,
        step: Math.PI / 32,
      },
      v: {
        min: 0,
        max: Math.PI * 2,
        step: Math.PI / 20,
      },
      x: function (u: number, v: number) {
        if (u < startRadian) {
          return (
            offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
          );
        }
        if (u > endRadian) {
          return (
            offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
          );
        }
        return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
      },
      y: function (u: number, v: number) {
        if (u < startRadian) {
          return (
            offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
          );
        }
        if (u > endRadian) {
          return (
            offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
          );
        }
        return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
      },
      z: function (u: number, v: number) {
        if (u < -Math.PI * 0.5) {
          return Math.sin(u);
        }
        if (u > Math.PI * 2.5) {
          return Math.sin(u) * h * 0.1;
        }
        return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
      },
    };
  };

  const fomatFloat = (num: any, n: number) => {
    var f = parseFloat(num);
    if (isNaN(f)) {
      return false;
    }
    f = Math.round(num * Math.pow(10, n)) / Math.pow(10, n); // n 幂
    var s = f.toString();
    var rs = s.indexOf('.');
    //判定如果是整数，增加小数点再补0
    if (rs < 0) {
      rs = s.length;
      s += '.';
    }
    while (s.length <= rs + n) {
      s += '0';
    }
    return s;
  };

  // 生成饼状图事件监听器
  const bindListen = (myChart: any) => {
    // 监听鼠标事件，实现饼图选中效果（单选），近似实现高亮（放大）效果。
    let selectedIndex = '';
    let hoveredIndex = '';
    // 监听点击事件，实现选中效果（单选）
    myChart.on('click', function (params: any) {
      if (params.seriesIndex === option.series.length - 1) return '';
      // 从 option.series 中读取重新渲染扇形所需的参数，将是否选中取反。
      let isSelected = option.series[params.seriesIndex].pieStatus.selected;
      let isHovered = option.series[params.seriesIndex].pieStatus.hovered;
      let k = option.series[params.seriesIndex].pieStatus.k;
      let startRatio = option.series[params.seriesIndex].pieData.startRatio;
      let endRatio = option.series[params.seriesIndex].pieData.endRatio;
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
      isSelected ? (selectedIndex = params.seriesIndex) : null;
      // 使用更新后的 option，渲染图表
      myChart.setOption(option);
    });
    // 监听 mouseover，近似实现高亮（放大）效果
    myChart.on('mouseover', function (params: any) {
      // 准备重新渲染扇形所需的参数
      let isSelected;
      let isHovered;
      let startRatio;
      let endRatio;
      let k;
      // 如果触发 mouseover 的扇形当前已高亮，则不做操作
      if (hoveredIndex === params.seriesIndex) {
        return;
        // 否则进行高亮及必要的取消高亮操作
      } else {
        // 如果当前有高亮的扇形，取消其高亮状态（对 option 更新）
        if (hoveredIndex !== '') {
          // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
          isSelected = option.series[hoveredIndex].pieStatus.selected;
          isHovered = false;
          startRatio = option.series[hoveredIndex].pieData.startRatio;
          endRatio = option.series[hoveredIndex].pieData.endRatio;
          k = option.series[hoveredIndex].pieStatus.k;
          // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
          option.series[hoveredIndex].parametricEquation =
            getParametricEquation(
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
        // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）
        if (
          params.seriesName !== 'mouseoutSeries' &&
          params.seriesName !== 'pie2d'
        ) {
          // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
          isSelected = option.series[params.seriesIndex].pieStatus.selected;
          isHovered = true;
          startRatio = option.series[params.seriesIndex].pieData.startRatio;
          endRatio = option.series[params.seriesIndex].pieData.endRatio;
          k = option.series[params.seriesIndex].pieStatus.k;
          // 对当前点击的扇形，执行高亮操作（对 option 更新）
          option.series[params.seriesIndex].parametricEquation =
            getParametricEquation(
              startRatio,
              endRatio,
              isSelected,
              isHovered,
              k,
              option.series[params.seriesIndex].pieData.value + 5,
            );
          option.series[params.seriesIndex].pieStatus.hovered = isHovered;
          // 记录上次高亮的扇形对应的系列号 seriesIndex
          hoveredIndex = params.seriesIndex;
        }
        // 使用更新后的 option，渲染图表
        myChart.setOption(option);
      }
    });
    // 修正取消高亮失败的 bug
    myChart.on('globalout', function () {
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
