import React, { Component } from 'react';
import { Form, Input, Button, Drawer, Cascader, Row, Col } from 'antd';
import { connect } from 'dva';

@connect()
@Form.create()
class componentName extends Component {
  // constructor(props) {
  //   super(props);
  // }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let tenantInfos = { ...values }

        //  [provinceCode, cityCode, districtCode] =

      }
    });
  }
  render() {
    const { visible, tenantInfo, onClose, options, onChange}=this.props
    const { getFieldDecorator } = this.props.form;
    return (
      <Drawer
        title="新增用户"
        width={720}
        onClose={onClose}
        visible={visible}
        style={{
          overflow: 'auto',
          height: 'calc(100% - 108px)',
          paddingBottom: '108px',
        }}
      >
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          <Row gutter={40}>
            <Col span={12}>
              <Form.Item
                label="公司名"
              >
                {getFieldDecorator('tenantName', {
                  rules: [{
                    required: true, message: '请输入',
                  }],
                  initialValue: tenantInfo.tenantName,
                })
                (<Input type="text" placehoder="请输入" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="联系人"
              >
                {getFieldDecorator('userName', {
                  rules: [{
                    required: true, message: '请输入',
                  }],
                  initialValue:tenantInfo.name,
                })
                (<Input type="text" placehoder="请输入" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="联系电话"
              >
                {getFieldDecorator('userMobile',{
                  rules: [{
                    required: true, message: '请输入',
                  }],
                  initialValue: tenantInfo.name,
                })(
                  <Input type="text" placehoder="请输入" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="客服电话"
              >
                {getFieldDecorator('tenantPhone')(
                  <Input type="text" placehoder="请输入" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="省市区"
              >
                {getFieldDecorator('provinces', {
                  rules: [{
                    required: true, message: '请输入',
                  }],
                  initialValue: tenantInfo.provinces,
                })(
                  <Cascader options={options} onChange={onChange} placeholder="请选择" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="详细地址"
              >
                {getFieldDecorator('address', {
                  rules: [{
                    required: true, message: '请输入',
                  }],
                  initialValue: tenantInfo.address,
                })(
                  <Input type="text" placehoder="请输入" />)}
              </Form.Item>
            </Col>
          </Row>
          <Form.Item className="btn-right">
            <Button type="primary" onClick={this.cancel} className="btn-cancel">取消</Button>
            <Button type="primary" htmlType="submit">提交</Button>
          </Form.Item>
        </Form>
      </Drawer >
    )
  }
}
export default componentName;