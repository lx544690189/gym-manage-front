import React, { Component } from 'react';
import { connect } from 'dva';
import { Tabs, Form, Icon, Input, Button, Checkbox } from 'antd';
import './index.less';

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

@connect(({ login }) => ({
  login,
}))
@Form.create()
class Index extends Component {

  componentDidMount() {
    this.props.dispatch({
      type: 'login/testGet',
      payload: {
        id: 1,
      },
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'login/userLogin',
          payload: values,
        });
      }
    });
  }


  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="login">
        <div className="logo">
          管理系统
        </div>
        <div className="des">
          ant Design 是西湖区最具影响力的 Web 设计规范
        </div>
        <div className="form-content">
          <Tabs defaultActiveKey="1" >
            <TabPane tab="账户密码登录" key="1">
              <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                  {getFieldDecorator('username', {
                    rules: [{ required: true, message: '请输入用户名' }],
                  })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入密码' }],
                  })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                  })(
                    <Checkbox>记住我</Checkbox>
                  )}
                  <a className="login-form-forgot" href="">忘记密码</a>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    登录
                  </Button>
                  没有账号？<a href="">注册</a>
                </FormItem>
              </Form>
            </TabPane>
            <TabPane tab="手机号登录" key="2">Content of Tab Pane 2</TabPane>
          </Tabs>
        </div>
      </div>
    );
  }



}

export default Index;