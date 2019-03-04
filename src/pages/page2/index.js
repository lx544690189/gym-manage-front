import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Breadcrumb, Upload, Icon, Modal } from 'antd';
import { GymLayout } from 'gym';

@connect(({ global }) => ({
  global,
}))
class Index extends Component {
  state = {
    fileList: [],
  }
  handleChange = ({ fileList }) => {
    this.setState({ fileList });
    console.log('fileList: ', fileList);
  }
  render() {
    const { fileList } = this.state;
    const { global } = this.props;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <GymLayout>
        <Card bordered={false} >
          <Upload
            action="http://upload.qiniup.com/"
            data={{
              token: global.qiniu.token,
            }}
            multiple
            listType="picture-card"
            fileList={fileList}
            onChange={this.handleChange}
          >
            {fileList.length >= 3 ? null : uploadButton}
          </Upload>
        </Card>
      </GymLayout>
    );
  }
}

export default Index;