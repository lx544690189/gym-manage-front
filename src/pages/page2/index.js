import React, { Component } from 'react';
import { Card,Breadcrumb } from 'antd';

class Index extends Component {
  render() {
    return (
      <div className="page1">
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>page1</Breadcrumb.Item>
        </Breadcrumb>
        <Card bordered={false} >
          page2
        </Card>
      </div>
    );
  }
}

export default Index;