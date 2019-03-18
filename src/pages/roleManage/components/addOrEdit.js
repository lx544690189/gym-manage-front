import React, { Component } from 'react';
import { Drawer, Form, Input, Row, Col, Button } from 'antd';
import { connect } from 'dva';

@connect()
@Form.create()
class Index extends Component {
  constructor(props){
    super(props);
    this.props.onRef(this);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (this.props.formValue.id===undefined){
          this.props.forAdd({...values});
        }else{
          const id = this.props.formValue.id;
          this.props.forEdit({ ...values, id });
        }
      }
    });
  }
  render() {
    const { visible, onClose, formValue } = this.props;
    const { getFieldDecorator } = this.props.form;
    const FormItem = Form.Item;
    return (
      <Drawer
        title="新增"
        width={720}
        onClose={onClose}
        visible={visible}
      >
        <Form onSubmit={this.handleSubmit} layout="vertical">
          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="角色名称">
                {getFieldDecorator('name', {
                  rules: [{
                    required: true, message: '请输入',
                  }],
                  initialValue: formValue.name,
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="角色Code">
                {getFieldDecorator('code', {
                  rules: [{
                    required: true, message: '请输入',
                  }],
                  initialValue: formValue.code,
                })(<Input />)}
              </FormItem>
            </Col>
          </Row>
        </Form>
        <div
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            padding: '10px 16px',
            background: '#fff',
            textAlign: 'right',
          }}
        >
          <Button onClick={onClose}>取消</Button>
          <Button onClick={this.handleSubmit} type="primary" style={{ marginLeft: '10px' }}>确认</Button>
        </div>
      </Drawer>
    );
  }
}
export default Index;