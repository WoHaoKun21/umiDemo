import { useEffect } from 'react';
import Map from './map.js';
let map = null;
const VEC = [
  'http://t1.tianditu.com/vec_c/wmts?layer=vec&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=', // 矢量地图
  'http://t1.tianditu.com/cva_c/wmts?layer=cva&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=', // 标注地图
];
const tdtKeyList = [
  '71270bd99accdda913f3341432d41fd8',
  'd2fee6c7f5073a18f3197b7b12132fa5',
  'b4f1f86c40f714a624d1bf04480b2c2b',
];
const token = 'e94a33a75b012994c51e21fb5ccc40b1';
const TDMap = () => {
  useEffect(() => {
    initMap();
  }, []);
  // 生成天地图
  const initMap = () => {
    map = undefined;
    const container = document.getElementById('mapid');
    // 如果已经生成了地图，则清除已有的地图
    if (container) {
      container.innerHTML = '';
    }
    // 一、初始化地图
    map = L.map(container, {
      crs: L.CRS.EPSG3857, //参考坐标系
      attributionControl: false, //不添加属性说明控件
      center: [40, 116.3], //显示中心
      minZoom: 1, //最小显示等级
      maxZoom: 18, //最大显示等级
      zoom: 2, //当前显示等级
      maxBounds: [
        [-90, -180],
        [90, 180],
      ], //限制显示地理范围
    });
    // 二、添加天地图矢量图
    let vectorMap = L.tileLayer(
      'http://t0.tianditu.gov.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk=ba23ed543116379ad63387bf7fc2a045',
      {
        noWrap: true,
        // bounds: [
        //   [-90, -180],
        //   [90, 180],
        // ],
      },
    );
    // 创建天地图底图
    let imageMap = L.tileLayer(
      'http://t0.tianditu.gov.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk=ba23ed543116379ad63387bf7fc2a045',
      {
        noWrap: true,
        // bounds: [
        //   [-90, -180],
        //   [90, 180],
        // ],
      },
    );
    // 添加天地如影像标注
    let imageAnnotion = L.tileLayer(
      'http://t0.tianditu.gov.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}&tk=ba23ed543116379ad63387bf7fc2a045',
      {
        noWrap: true,
        // bounds: [
        //   [-90, -180],
        //   [90, 180],
        // ],
      },
    );
    // 设置图层组
    let vector = L.layerGroup([vectorMap, imageAnnotion]);
    let image = L.layerGroup([imageMap, imageAnnotion]);
    let baseLayers = {
      影像: image,
      矢量: vector,
    };
    map.addLayer(vector);
    L.control.layers(baseLayers).addTo(map);
  };
  return (
    <>
      <div
        id="mapid"
        style={{
          width: 600,
          height: 500,
          border: '1px solid #f00',
        }}
      />
    </>
  );
};

export default TDMap;
