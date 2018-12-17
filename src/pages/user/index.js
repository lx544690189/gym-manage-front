import React, { Component } from 'react';
import { Card,Breadcrumb } from 'antd';

/**
 * title: Index Page
 * Routes:
 *   - ./src/pages/user/list.js
 */
class Index extends Component {
  render() {
    return (
      <div className="page1">
        <Breadcrumb>
          <Breadcrumb.Item>用户管理</Breadcrumb.Item>
          <Breadcrumb.Item>用户列表</Breadcrumb.Item>
        </Breadcrumb>
        <Card bordered={false} >
          page2
        </Card>
      </div>
    );
  }
}

export default Index;