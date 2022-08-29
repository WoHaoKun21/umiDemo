import { defineConfig } from 'umi';
import routes from './config/routes';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  layout: {},
  routes,
  fastRefresh: {},
  dva: {
    immer: true,
    hmr: false,
  },
});
