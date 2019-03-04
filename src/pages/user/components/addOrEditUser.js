import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Select, Form, Input, DatePicker, Drawer, Alert, Button, Upload, Icon, Modal } from 'antd';
import moment from 'moment';
import './index.less';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ loading, user, global }) => ({
  loading: loading.effects['user/addAccount'],
  user,
  global,
}))
@Form.create()
class componentName extends Component {

  state = {
    previewVisible: false,
    previewImage: '',
  }

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
        if (Array.isArray(values.userImg) && values.userImg.length > 0) {
          if (values.userImg[0].response) {
            values.userImg = values.userImg[0].response.key;
          } else {
            values.userImg = values.userImg[0].url.split('http://pn7nap6j5.bkt.clouddn.com/')[1];
          }
        }
        this.props.onOk(values);
      }
    });
  }

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleCancel = () => {
    this.setState({ previewVisible: false });
  }

  render() {
    const { loading, onClose, userInfo, user, form, global } = this.props;
    const { getFieldDecorator } = form;
    const { previewVisible, previewImage } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    return (
      <Drawer
        {...this.props}
        title={userInfo.id ? '修改用户信息' : '新增用户'}
        width={720}
        style={{
          overflow: 'auto',
          height: 'calc(100% - 55px)',
          paddingBottom: '108px',
        }}
      >
        <Alert className="add-user-alert" message="新增用户登录用户名为手机号，密码默认手机号后6位。" type="info" />
        <Form layout="vertical" onSubmit={this.handleSubmit}>
          <Row gutter={40}>
            <Col span={12}>
              <FormItem
                label="用户照片"
              >
                {getFieldDecorator('userImg', {
                  rules: [{
                    required: true, message: '请上传照片',
                  }],
                  valuePropName: 'fileList',
                  getValueFromEvent: (e) => {
                    if (e && e.fileList) {
                      return e.fileList;
                    }
                  },
                  initialValue: userInfo.userImg ? [{ uid: userInfo.userImg, url: `http://pn7nap6j5.bkt.clouddn.com/${userInfo.userImg}` }] : [],
                })(
                  <Upload
                    action="http://upload.qiniup.com/"
                    data={{
                      token: global.qiniu.token,
                    }}
                    listType="picture-card"
                    onPreview={this.handlePreview}
                  >
                    {form.getFieldValue('userImg').length === 1 ? null : uploadButton}
                  </Upload>
                )}
              </FormItem>
            </Col>
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
                label="职位"
              >
                {getFieldDecorator('roleCode', {
                  rules: [{
                    required: true, message: '请选择',
                  }],
                  initialValue: userInfo.roleCode,
                })(
                  <Select placeholder="请选择">
                    {user.roleList.map((item) => <Option value={item.code} key={item.code}>{item.name}</Option>)}
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
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </Drawer>
    );
  }
}

export default componentName;