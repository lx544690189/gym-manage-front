import React, { Component } from 'react';
import { Layout, Menu, Dropdown, Icon } from 'antd';

const { Header } = Layout;

class componentName extends Component {
  render() {
    const { collapsed, toggle } = this.props;
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">个人中心</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">退出登录</Menu.Item>
      </Menu>
    );

    return (
      <Header style={{ background: '#fff', padding: 0 }}>
        <Icon
          className="trigger"
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={toggle}
        />
        <div className="right">
          <Dropdown overlay={menu}>
            <span className="user-info">
              <span className="avatar">
                <img src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" alt="avatar" />
              </span>
              <span className="name">admin</span>
            </span>
          </Dropdown>

        </div>
      </Header>
    );
  }
}

export default componentName;