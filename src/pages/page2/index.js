import React, { Component } from 'react';
import { Card, Breadcrumb, Upload, Icon, Modal } from 'antd';

class Index extends Component {
  state = {
    fileList: [],
  }
  handleChange = ({ fileList }) => {
    this.setState({ fileList });
    console.log('fileList: ', fileList);
  }
  render() {
    const {fileList} = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="page1">
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>page2</Breadcrumb.Item>
        </Breadcrumb>
        <Card bordered={false} >
          <Upload
            action="http://upload.qiniup.com/"
            data={{
              token:'mXwjcgGVXFTqgbZf-aogv_mbmD0lKFePOw-spOu0:V0k__e4hANWdZOxv-gmFDnERoVg=:eyJyZXR1cm5Cb2R5Ijoie1wibmFtZVwiOlwiJChmbmFtZSlcIixcInNpemVcIjpcIiQoZnNpemUpXCIsXCJ3aWR0aFwiOlwiJChpbWFnZUluZm8ud2lkdGgpXCIsXCJoZWlnaHRcIjpcIiQoaW1hZ2VJbmZvLmhlaWdodClcIixcImltYWdlQXZlXCI6XCIkKGltYWdlQXZlLlJHQilcIixcInR5cGVcIjpcIiQobWltZVR5cGUpXCIsXCJrZXlcIjpcIiQoa2V5KVwiLFwiaGFzaFwiOlwiJChldGFnKVwiLFwiYnVja2V0XCI6XCIkKGJ1Y2tldClcIn0iLCJzY29wZSI6Imd5bS1yZXNvdXJjZXMiLCJkZWFkbGluZSI6MTU1MDgxNTgxN30=',
            }}
            multiple
            listType="picture-card"
            fileList={fileList}
            onChange={this.handleChange}
          >
            {fileList.length >= 3 ? null : uploadButton}
          </Upload>
        </Card>
      </div>
    );
  }
}

export default Index;