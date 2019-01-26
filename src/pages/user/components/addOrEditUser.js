import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Select, Form, Input, DatePicker, Drawer, Alert, Button } from 'antd';
import moment from 'moment';
import './index.less';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ loading }) => ({
  loading: loading.effects['user/addAccount'],
}))
@Form.create()
class componentName extends Component {

  constructor(props) {
    super(props);
    this.props.onRef(this);
  }

  handleSubmit = (e) => {
    const { form, userInfo } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.id = userInfo.id;
        this.props.onOk(values);
      }
    });
  }

  render() {
    const { loading, onClose, userInfo } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Drawer
        {...this.props}
        title={userInfo.id ? '修改用户信息' : '新增用户'}
        width={720}
        style={{
          overflow: 'auto',
          height: 'calc(100% - 108px)',
          paddingBottom: '108px',
        }}
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
                  initialValue: userInfo.name,
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
                  initialValue: userInfo.sex,
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
                  initialValue: userInfo.mobile,
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                label="出生年月"
              >
                {getFieldDecorator('birthday', {
                  initialValue: userInfo.birthday ? moment(userInfo.birthday) : undefined,
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
          <FormItem className="submit-btns">
            <Button onClick={onClose}>取消</Button>
            <Button type="primary" htmlType="submit" loading={loading}>提交</Button>
          </FormItem>
        </Form>
      </Drawer>
    );
  }
}

export default componentName;