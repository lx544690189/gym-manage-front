import React, { Component } from 'react';
import { Link } from 'dva/router';
import { Breadcrumb } from 'antd';
import classnames from 'classnames';
import './index.less';

const BreadcrumbItem = Breadcrumb.Item;

class GymLayout extends Component {
  state = {

  }

  render() {
    const {
      className,
      children,
    } = this.props;
    return (
      <div className={classnames('gym-page', className)}>
        <Breadcrumb>
          <BreadcrumbItem>用户管理</BreadcrumbItem>
          <BreadcrumbItem>用户列表</BreadcrumbItem>
        </Breadcrumb>
        {children}
      </div>
    );
  }
}

export default GymLayout;