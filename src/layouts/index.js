

import React, { Component } from 'react';
import { connect } from 'dva';
import Layout from '../components/layout/index';

@connect(({ global }) => ({
  global,
}))
class BasicLayout extends Component {
  componentDidMount(){
    this.props.dispatch({
      type: 'global/getUserInfo',
    });
  }
  render () {
    const {location,children} = this.props;
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
}

export default BasicLayout;
