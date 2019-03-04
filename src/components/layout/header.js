import React, { Component } from 'react';
import { connect } from 'dva';
import { Layout, Menu, Dropdown, Icon } from 'antd';

const { Header } = Layout;

@connect(({ global }) => ({
  global,
}))
class componentName extends Component {

  logout=()=>{
    this.props.dispatch({
      type: 'global/logout',
    });
  }

  render() {
    const { collapsed, toggle, global } = this.props;
    const menu = (
      <Menu>
        <Menu.Item key="0">
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">个人中心</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3" onClick={this.logout}>退出登录</Menu.Item>
      </Menu>
    );

    return (
      <Header className="gym-header">
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
              <span className="name" >{global.userInfo.username}</span>
            </span>
          </Dropdown>

        </div>
      </Header>
    );
  }
}

export default componentName;