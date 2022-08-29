import { useEffect } from 'react';
// import L from "./leaflet/leaflet";
// import "./leaflet/leaflet.css";
// import Map from "./map.js";
let myMap = null;
const VEC = [
  'http://t1.tianditu.com/vec_c/wmts?layer=vec&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=', // 矢量地图
  'http://t1.tianditu.com/cva_c/wmts?layer=cva&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=', // 标注地图
];
const token = 'e94a33a75b012994c51e21fb5ccc40b1';
const TDMap = () => {
  useEffect(() => {
    initMap();
  }, []);
  // 生成天地图
  const initMap = () => {
    myMap = undefined;
    const container = document.getElementById('mapid');
    // 如果已经生成了地图，则清除已有的地图
    if (container) {
      container.innerHTML = '';
    }
    // 一、初始化地图
    // 1.1 创建地图实例
    myMap = L.map(container, {
      minZoom: 3,
      maxZoom: 20,
      center: [29.563761, 106.550464],
      zoom: 10,
      zoomControl: false,
      attributionControl: false,
      crs: L.CRS.EPSG4326,
    }).setView([30.5, 104.5], 5);

    // 给地图添加图层
    L.tileLayer(VEC[0] + 'ad94acfd371958acd04b0ac593c37842', {
      maxZoom: 20,
      tileSize: 256,
      zoomOffset: 1,
    }).addTo(myMap);
    // 给leftlet添加城市标注
    L.tileLayer(VEC[1] + 'ad94acfd371958acd04b0ac593c37842', {
      maxZoom: 20,
      tileSize: 256,
      zoomOffset: 1,
    }).addTo(myMap);


    // // 1、添加天地图阴影地图
    // const imgLayer = L.tileLayer.chinaProvider("TianDiTu.Satellite.Map", {});
    // const imgAnnLayer = L.tileLayer.chinaProvider(
    //   "TianDiTu.Satellite.Annotion",
    //   {}
    // );
    // let imgGroup = L.layerGroup([imgLayer, imgAnnLayer]);
    // // 2、添加天地图矢量地图
    // const vectorMap = L.tileLayer.chinaProvider("TianDiTu.Normal.Map", {});
    // const vectorAnn = L.tileLayer.chinaProvider("TianDiTu.Normal.Annotion", {});
    // let vecGroup = L.layerGroup([vectorMap, vectorAnn]);
    // // 3、添加地形地图
    // const terrainMap = L.tileLayer.chinaProvider("TianDiTu.Terrain.Map", {});
    // const terrainAnn = L.tileLayer.chinaProvider(
    //   "TianDiTu.Terrain.Annotion",
    //   {}
    // );
    // let terrainGroup = L.layerGroup([terrainMap, terrainAnn]);
    // // 将三种类型的地图添加到对象的baseLayer
    // const layer = {
    //   baseLayers: {
    //     矢量地图: vecGroup,
    //     影像地图: imgGroup,
    //     地形地图: terrainGroup,
    //   },
    //   overlays: {},
    // };
    // // 将layers添加到地图
    // L.control
    //   .layers(layer.baseLayers, layer.overlays, { collapsed: true })
    //   .addTo(myMap);
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
