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

## coding的姿势要优雅
 - ### 配置alias方便import：
```javascript
alias:{
  'src': path.resolve(__dirname, './src'),
  'gym': path.resolve(__dirname, './src/components'),
  'utils': path.resolve(__dirname, './src/utils/tools'),
},
```
现在import无需关注目录层级：
```javascript
// import { GymLayout, GymSearch } from '../../components/index.js';
import { GymLayout, GymSearch } from 'gym';
```

- ### 不喜欢CSS-in-JS？在.umirc.js中增加配置`disableCSSModules: true`，每个页面`import 'page.less'`然后在`page.less`中约定页面名称为当前page的className，同样能防止样式和冲突：
```css
.page1{
  .class1{

  }
  .class2{

  }
}
```

- ### 每次这么拼className？使用[classnames](https://www.npmjs.com/package/classnames)简化代码
```
// <div className={condition ? 'class-default' : 'class-default class-more'}>
import classnames from 'classnames';
<div classNames('class-default', { 'class-more': condition });>
```

- ### 封装的组件带上`props`中的`className`，方便使用时样式覆盖
```javascript
// 组件
class MyComponent extends Component{
  render() {
    const { className } = this.props;
    return (
      <div
        className={classnames("components-class", className)}
      >
        content...
      </div>
    )
  }
}
// 使用
render() {
  <MyComponent className="my-class"/>
}
```

- ### 善用dva-loading
页面上很多异步加载的地方都需要有loading效果来作友好提示，告诉用户数据正在加载。比如一个table中数据的获取，或者点击提交按钮后使用loading并防止用户多次提交，dva-loading可以帮我们减少很多实现loading的代码。
```javascript
import React, { Component } from 'react';
import { connect } from 'dva';
@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule, // models中有异步操作就会为true
  tableLoading: loading.models['rule/fetchTable'], // fetchTable的异步操作才会为true
  tableMultiLoading: loading.models['rule/fetchTable1'] || loading.models['rule/fetchTable2'] //fetchTable1或fetchTable2有在异步过程中，则为true
}))
class demo extends Component{
  render(){
    const { loading, tableLoading, tableMultiLoading } = this.props;
    return (
      <div loading={loading}>content...</div>
    )
  }
}
```

- ### [umi与dva的整合，外部如何访问到 store 或 dispatch 方法？](https://umijs.org/zh/guide/with-dva.html#faq)
```javascript
// 如在axios拦截器中，监听登录状态，在未登录情况下跳转登录页面
request.interceptors.response.use(function(response) {
  return response.data;
}, function(error, data) {
  if (error.response.status === 403) {
    // umi将store暴露在window.g_app._store下
    window.g_app._store.dispatch(
      routerRedux.replace('/login')
    );
  }
  return Promise.reject(error);
});
```

## eslint最佳实践，下面是一些个人偏向的规则
> ESLint 支持几种格式的配置文件：
> - JavaScript - 使用 `.eslintrc.js` 然后输出一个配置对象。
> - YAML - 使用 `.eslintrc.yaml` 或 `.eslintrc.yml` 去定义配置的结构。
> - JSON - 使用 `.eslintrc.json` 去定义配置的结构，ESLint 的 JSON 文件允许 JavaScript 风格的注释。
> - (弃用) - 使用 `.eslintrc`，可以使 JSON 也可以是 YAML。
> - package.json - 在 `package.json` 里创建一个 eslintConfig属性，在那里定义你的配置。

umi创建的是`.eslintrc`已弃用文件类型，json格式不能写注释及其不方便，建议使用`.eslintrc.js`
```javascript
module.exports = {
  "rules": {
    "indent": ["error", 2], //缩进风格
    "semi": [2, "always"], // 句尾强制分号
    "eqeqeq": 2, // 要求使用 === 和 !==
    "no-alert": [2], // 禁止使用alert confirm prompt
    "quotes": [2, "single"], // 单引号
    "arrow-parens": 2, //箭头函数用小括号括起来
    "comma-spacing": ["error", { "before": false, "after": true }], //逗号前后的空格
    "no-trailing-spaces": [2], // 语句前后空格
    "key-spacing": [2, { "beforeColon": false, "afterColon": true }], // 对象字面量中冒号的前后空格
    "space-before-function-paren": [2, "never"], // 函数定义时括号前面要不要有空格
    "no-unreachable": 2, //不能有无法执行的代码
    "spaced-comment": 2, //注释风格，//后加空格
    "jsx-quotes": [2, "prefer-double"], //强制在JSX属性（jsx-quotes）中一致使用双引号
    "react/display-name": 0, //防止在React组件定义中丢失displayName
    "react/jsx-key": 2, //在数组或迭代器中验证JSX具有key属性
    "react/jsx-max-props-per-line": [1, { "maximum": 3 }], // 限制JSX中单行上的props的最大数量
    "react/jsx-wrap-multilines": ["error", { //jsx属性风格
      "declaration": "parens-new-line",
      "assignment": "parens-new-line",
      "return": "parens-new-line",
      "arrow": "parens-new-line",
      "condition": "parens-new-line",
      "logical": "parens-new-line",
      "prop": "ignore"
    }],
    "comma-dangle": ["error", { // 数组、对象逗号风格
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "imports": "always-multiline",
      "exports": "always-multiline",
      "functions": "ignore"
    }],
    "require-yield": [1]
  }
}
```