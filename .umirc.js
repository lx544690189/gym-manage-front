
import path from 'path';
// ref: https://umijs.org/config/
export default {
  alias:{
    'src': path.resolve(__dirname, './src'),
    'gym': path.resolve(__dirname, './src/components'),
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
      "target": "http://10.201.116.237:7001/",
      "changeOrigin": true,
      "pathRewrite": { "^/gym": "" }
    },
  }
}
