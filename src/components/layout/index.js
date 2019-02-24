import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import Header from './header';
import './index.less';

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

@connect()
class componentName extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    const { collapsed } = this.state;
    return (
      <Layout className="layout">
        <Sider
          collapsed={collapsed}
          style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}
        >
          <div className="logo">
            GYM
          </div>
          <Menu 
            theme="dark" mode="inline" defaultSelectedKeys={['1']}
          >
            <Menu.Item key="1">
              <Icon type="user" />
              <span className="nav-text">guide</span>
            </Menu.Item>
            <SubMenu key="sub1" title={<span><Icon type="mail" /><span>用户管理</span></span>}>
              <Menu.Item
                key="/user/list"
                onClick={() => {
                  this.props.dispatch(routerRedux.push('/user/list'));
                }}
              >
                用户列表
              </Menu.Item>
              <Menu.Item
                key="page2"
                onClick={() => {
                  this.props.dispatch(routerRedux.push('/page2'));
                }}
              >
                page2
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="mail" /><span>租户管理</span></span>}>
              <Menu.Item
                key="/tenantManage/message"
                onClick={() => {
                  this.props.dispatch(routerRedux.push('/tenantManage/message'));
                }}
              >
              租户信息
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout
          className="main-content"
          style={{ marginLeft: collapsed ? 80 : 200 }}
        >
          <Header collapsed={collapsed} toggle={this.toggle} />
          <Content className="content">
            {this.props.children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default componentName;