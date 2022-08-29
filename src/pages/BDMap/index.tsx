import { useEffect } from 'react';
import './index.less';

let map: any;
let map2: any;

const BDMap = () => {
  // 普通地图
  const initMap = () => {
    map = new window.BMapGL.Map('myMap'); // 创建百度地图的map对象
    const point = new window.BMapGL.Point(116.404, 39.915); // 创建坐标点
    map.centerAndZoom(point, 14); // 设置中心点坐标，并设置缩放比
    map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
  };
  // 地球类型地图
  const typeMap = () => {
    map2 = new window.BMapGL.Map('typeMap'); // 创建百度地图的map对象
    const point = new window.BMapGL.Point(116.404, 39.915); // 创建坐标点
    map2.centerAndZoom(point, 5); // 设置中心点坐标，并设置缩放比
    map2.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    map2.setMapType(BMAP_EARTH_MAP); // 设置地图类型为地球模式
    map2.addEventListener('click', (e: any) => {
      console.log('地图事件点击对象：', e.latlng); // 点击后得到点击位置经纬度：{lng: 114.8394598988045, lat: 38.76497841679448}
    });
  };
  useEffect(() => {
    initMap(); // 普通地图
    typeMap(); // 地球
  }, []);
  return (
    <>
      <div id="myMap"></div>
      <div id="typeMap"></div>
    </>
  );
};
export default BDMap;
