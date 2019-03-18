import React, { Component } from 'react';
import { Form, Input, Button, Drawer, Cascader, Row, Col } from 'antd';
import { connect } from 'dva';

@connect()
@Form.create()
class componentName extends Component {
  constructor(props){
    super(props);
    this.props.onRef(this);
  }
  // 提交 新增或修改
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (this.props.tenantInfo.id === undefined) {
          const [provinceCode, cityCode, districtCode] = values.provinceValue;
          delete values.provinceValue;
          this.props.addTenantInfo({ ...values, provinceCode, cityCode, districtCode });
        }else{
          const [provinceCode, cityCode, districtCode] = values.provinceValue;
          delete values.provinceValue;
          this.props.editTenantInfo({ ...values, provinceCode, cityCode, districtCode, id: this.props.tenantInfo.id });
        }
        this.props.form.resetFields();
      }
    });
  }
  render() {
    const { visible, options, tenantInfo, onClose } = this.props;
    let provinceValue=[];
    if (tenantInfo.provinceCode!==undefined){
      provinceValue = [tenantInfo.provinceCode, tenantInfo.cityCode, tenantInfo.districtCode];
    }else{
      provinceValue=[];
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <Drawer
        title={(tenantInfo.id)?'修改租户':'新增租户'}
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
                (<Input type="text" placeholder="请输入" />)}
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
                  initialValue: tenantInfo.userName,
                })
                (<Input type="text" placeholder="请输入" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="联系电话"
              >
                {getFieldDecorator('userMobile', {
                  rules: [{
                    required: true, message: '请输入',
                  },
                  { pattern: /^[1][3,4,5,7,8][0-9]{9}$/, message: '请输入正确格式' }],
                  initialValue: tenantInfo.userMobile,
                })(
                  <Input type="text" placeholder="请输入" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="客服电话"
              >
                {getFieldDecorator('tenantPhone', {
                  rules: [{
                    pattern: /^0\d{2,3}-?\d{7,8}$/, message: '请输入正确格式',
                  }],
                  initialValue: tenantInfo.tenantPhone,
                })(
                  <Input type="text" placeholder="请输入" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="省市区"
              >
                {getFieldDecorator('provinceValue', {
                  rules: [{
                    required: true, message: '请输入',
                  }],
                  initialValue: provinceValue,
                })(
                  <Cascader options={options} placeholder="请选择" />)}
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
                  <Input type="text" placeholder="请输入"/>)}
              </Form.Item>
            </Col>
          </Row>
          <Form.Item className="btn-right">
            <Button  onClick={onClose} className="btn-cancel">取消</Button>
            <Button type="primary" htmlType="submit">提交</Button>
          </Form.Item>
        </Form>
      </Drawer >
    );
  }
}
export default componentName;