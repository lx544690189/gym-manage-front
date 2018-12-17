

import React, { Component } from 'react';
import { connect } from 'dva';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import Layout from '../components/layout/index';

moment.locale('zh-cn');

@connect(({ global }) => ({
  global,
}))
class BasicLayout extends Component {

  componentDidMount() {
    this.props.dispatch({
      type: 'global/getUserInfo',
    });
  }

  renderContainer = () => {
    const { location, children } = this.props;
    if (location.pathname === '/login') {
      return (
        <div>
          {children}
        </div>
      );
    }
    return (
      <Layout>
        {children}
      </Layout>
    );
  }
  
  render() {
    return (
      <LocaleProvider locale={zh_CN}>
        {this.renderContainer()}
      </LocaleProvider>
    );
  }
}

export default BasicLayout;
