
import path from 'path';
// ref: https://umijs.org/config/
export default {
  alias:{
    'src': path.resolve(__dirname, './src'),
    'gym': path.resolve(__dirname, './src/components'),
    'utils': path.resolve(__dirname, './src/utils/tools'),
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: true,
      title: 'test',
      dll: true,
      routes: {
        exclude: [],
      },
      hardSource: false,
    }],
  ],
  disableCSSModules: true,
  proxy: {
    "/gym": {
      "target": "http://127.0.0.1:7001/",
      "changeOrigin": true,
      "pathRewrite": { "^/gym": "" }
    },
  }
}
