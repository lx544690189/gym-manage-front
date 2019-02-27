# gym-project
  react项目的最佳实践
## Development

```bash
$ npm i
$ npm run dev
```

## 技术栈
  - [umi](https://umijs.org/zh/guide/)：一个可插拔的企业级 react 应用框架
  - [antd](https://ant.design/docs/react/introduce-cn)：高质量 React 组件
  - [dva](https://dvajs.com/)：一个基于 redux 和 redux-saga 的数据流方案
  - [axios](https://github.com/axios/axios)：Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。


## coding的姿势要优雅
 - 配置alias方便import：
```
alias:{
  'src': path.resolve(__dirname, './src'),
  'gym': path.resolve(__dirname, './src/components'),
  'utils': path.resolve(__dirname, './src/utils/tools'),
},
```
现在import无需关注目录层级：
```
// import { GymLayout, GymSearch } from '../../components/index.js';
import { GymLayout, GymSearch } from 'gym';
```

- 不喜欢CSS-in-JS？在.umirc.js中增加配置`disableCSSModules: true`，每个页面`import 'page.less'`然后在`page.less`中约定页面名称为当前page的className，同样能防止样式和冲突：
```
.page1{
  .class1{

  }
  .class2{

  }
}
```

- 每次这么拼className？使用[classnames](https://www.npmjs.com/package/classnames)简化代码
```
// <div className={condition ? 'class-default' : 'class-default class-more'}>
import classnames from 'classnames';
<div classNames('class-default', { 'class-more': condition });>
```

- 封装的组件带上`props`中的`className`，方便使用时样式覆盖
```
render() {
  const { className } = this.props;
  return <div className={classnames("components-className", className)}>content...</div>
}
```

## 目录结构
```
├── dist/                          // 默认的 build 输出目录
├── mock/                          // mock 文件所在目录，基于 express
├── config/
    ├── config.js                  // umi 配置，同 .umirc.js，二选一
└── src/                           // 源码目录，可选
    ├── layouts/index.js           // 全局布局
    ├── components                 // 业务组件，统一由components/index.js导出
    ├── pages/                     // 页面目录，里面的文件即路由
        ├── .umi/                  // dev 临时目录，需添加到 .gitignore
        ├── .umi-production/       // build 临时目录，会自动删除
        ├── document.ejs           // HTML 模板
        ├── 404.js                 // 404 页面
    ├── global.css                 // 约定的全局样式文件，自动引入，也可以用 global.less
    ├── global.js                  // 可以在这里加入 polyfill
    ├── app.js                     // 运行时配置文件
├── .umirc.js                      // umi 配置，同 config/config.js，二选一
├── .env                           // 环境变量
└── package.json
```
