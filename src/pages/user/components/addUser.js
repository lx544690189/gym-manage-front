import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Select, Form, Input, DatePicker, Drawer, Alert, Button } from 'antd';
import './index.less';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ loading }) => ({
  loading: loading.effects['user/addAccount'],
}))
@Form.create()
class componentName extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onOk(values);
      }
    });
  }

  render() {
    const { loading } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Drawer
        {...this.props}
        title="新增用户"
        width={720}
        style={{
          overflow: 'auto',
          height: 'calc(100% - 108px)',
          paddingBottom: '108px',
        }}
        // onClose={()=>{
        //   this.props.form.resetFields();
        // }}
      >
        <Alert className="add-user-alert" message="新增用户登录用户名为手机号，密码默认手机号后6位。" type="info" />
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          <Row gutter={40}>
            <Col span={12}>
              <FormItem
                label="姓名"
              >
                {getFieldDecorator('name', {
                  rules: [{
                    required: true, message: '请输入',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label="性别"
              >
                {getFieldDecorator('sex', {
                  rules: [{
                    required: true, message: '请选择',
                  }],
                })(
                  <Select placeholder="请选择">
                    <Option value="male">男</Option>
                    <Option value="female">女</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label="手机号"
              >
                {getFieldDecorator('mobile', {
                  rules: [{
                    required: true, message: '请输入',
                  }, {
                    pattern: /^1[34578]\d{9}$/,
                    message: '请输入正确手机号',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label="出生年月"
              >
                {getFieldDecorator('birthday')(
                  <DatePicker
                    placeholder="请选择"
                    getCalendarContainer={(triggerNode) => triggerNode.parentNode}
                    style={{ width: '100%' }}
                  />
                )}
              </FormItem>
            </Col>
          </Row>
          <FormItem className="submit-btns">
            <Button>取消</Button>
            <Button type="primary" htmlType="submit" loading={loading}>提交</Button>
          </FormItem>
        </Form>
      </Drawer>
    );
  }
}

export default componentName;