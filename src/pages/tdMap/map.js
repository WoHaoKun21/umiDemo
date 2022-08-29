// this L.CRS.Baidu from https://github.com/muyao1987/leaflet-tileLayer-baidugaode/blob/master/src/tileLayer.baidu.js
// import L from "./leaflet/leaflet";
// L.TileLayer.ChinaProvider.providers = {
//   TianDiTu: {
//     Normal: {
//       Map: "//t{s}.tianditu.gov.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk={e94a33a75b012994c51e21fb5ccc40b1}",
//       Annotion:
//         "//t{s}.tianditu.gov.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk={e94a33a75b012994c51e21fb5ccc40b1}",
//     },
//     Satellite: {
//       Map: "//t{s}.tianditu.gov.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk={e94a33a75b012994c51e21fb5ccc40b1}",
//       Annotion:
//         "//t{s}.tianditu.gov.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}&tk={e94a33a75b012994c51e21fb5ccc40b1}",
//     },
//     Terrain: {
//       Map: "//t{s}.tianditu.gov.cn/DataServer?T=ter_w&X={x}&Y={y}&L={z}&tk={e94a33a75b012994c51e21fb5ccc40b1}",
//       Annotion:
//         "//t{s}.tianditu.gov.cn/DataServer?T=cta_w&X={x}&Y={y}&L={z}&tk={e94a33a75b012994c51e21fb5ccc40b1}",
//     },
//     Subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
//     key: "174705aebfe31b79b3587279e211cb9a",
//   },
// };

const TianDiTu = {
  Normal: {
    Map: "//t{s}.tianditu.gov.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk={e94a33a75b012994c51e21fb5ccc40b1}",
    Annotion:
      "//t{s}.tianditu.gov.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk={e94a33a75b012994c51e21fb5ccc40b1}",
  },
  Satellite: {
    Map: "//t{s}.tianditu.gov.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk={e94a33a75b012994c51e21fb5ccc40b1}",
    Annotion:
      "//t{s}.tianditu.gov.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}&tk={e94a33a75b012994c51e21fb5ccc40b1}",
  },
  Terrain: {
    Map: "//t{s}.tianditu.gov.cn/DataServer?T=ter_w&X={x}&Y={y}&L={z}&tk={e94a33a75b012994c51e21fb5ccc40b1}",
    Annotion:
      "//t{s}.tianditu.gov.cn/DataServer?T=cta_w&X={x}&Y={y}&L={z}&tk={e94a33a75b012994c51e21fb5ccc40b1}",
  },
  Subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
  key: "174705aebfe31b79b3587279e211cb9a",
};

export default TianDiTu;
