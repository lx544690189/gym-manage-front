import React, { Component } from 'react';
import { Link } from 'dva/router';
import { Breadcrumb } from 'antd';
import classnames from 'classnames';
import './index.less';

const BreadcrumbItem = Breadcrumb.Item;

class Page extends Component {
  state={
    
  }

  render() {
    const {
      className,
      router = [],
      children,
    } = this.props
    return (
      <div className={classnames('gym-page', className)}>
        {
          router.length > 0 && (
            <Breadcrumb>
              <BreadcrumbItem>用户管理</BreadcrumbItem>
            </Breadcrumb>
          )
        }
        {children}
      </div>
    );
  }
}

export default Page;