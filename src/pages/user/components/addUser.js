import React, { Component } from 'react';
import { Row, Col, Select, Form, Input, DatePicker, Drawer } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;

@Form.create()
class componentName extends Component {
  render() {
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
      >
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
                label="出生年月"
              >
                {getFieldDecorator('birthday', {
                  rules: [{
                    required: true, message: '请选择',
                  }],
                })(
                  <DatePicker
                    placeholder="请选择"
                    getCalendarContainer={(triggerNode) => triggerNode.parentNode}
                    style={{ width: '100%' }}
                  />
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Drawer>
    );
  }
}

export default componentName;