const routes: Array<API.Routes> = [
  {
    path: '/',
    redirect: '/react18',
  },
  {
    name: 'react18',
    path: '/react18',
    component: './react18',
  },
  {
    name: 'Echarts实例',
    path: '/echarts',
    routes: [
      {
        name: 'Echarts折线图',
        path: '/echarts/EchartsLine',
        component: './EchartsLine',
      },
      {
        name: '3D柱状图——Echart',
        path: '/echarts/3DEchartBar',
        component: './3DEchartBar',
      },
    ],
  },
  {
    name: '地图',
    path: '/map',
    routes: [
      {
        name: 'Echarts地图',
        path: '/map/echartsMap',
        component: './echartsMap',
      },
      {
        name: '天地图',
        path: '/map/tdMap',
        component: './tdMap',
      },
      {
        name: '百度地图',
        path: '/map/BDMap',
        component: './BDMap',
      },
    ],
  },
  {
    name: '新hooks',
    path: '/newSwr',
    component: './newSwr',
  },
  {
    name: 'UI大屏',
    path: '/UIBig',
    component: './UIBig',
  },
  {
    name: '手风琴',
    path: '/collapse',
    component: './Collapse',
  },
  {
    name: 'dva',
    path: '/dva',
    component: './Dva',
  },
  {
    name: '自定义npm包的使用',
    path: '/npm',
    component: './useNPM',
  },
];
export default routes;
