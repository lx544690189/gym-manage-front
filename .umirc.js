
import path from 'path';
// ref: https://umijs.org/config/
export default {
  alias:{
    'src': path.resolve(__dirname, './src'),
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
      "target": "http://192.168.0.108:7001/",
      "changeOrigin": true,
      "pathRewrite": { "^/gym": "" }
    },
    "/account": {
      "target": "http://192.168.0.108:7001/",
      "changeOrigin": true,
    }
  }
}
