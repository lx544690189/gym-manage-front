import React, { Component } from 'react';
import { connect } from 'dva';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Upload, Icon, Modal } from 'antd';
import { guid } from 'utils';
import './index.less';

// 图片上传地址
const UPLOADURL = 'http://upload.qiniup.com/';
// 图片地址前缀
const URLBASE = 'http://pn7nap6j5.bkt.clouddn.com/';

@connect(({ global }) => ({
  global,
}))
class GymImgUpload extends Component {
  static propTypes = {
    value: PropTypes.array,
    max: PropTypes.number,
  };

  static defaultProps = {
    value: [],
    max: 1,
  }

  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const value = nextProps.value;
      if (Array.isArray(value)) {
        const fileList = value.map(key => {
          return {
            uid: guid(),
            status: 'done',
            url: `${URLBASE}${key}`,
            linkProps: '{"download": "image"}',
          };
        });
        this.setState({
          fileList,
        });
      } else {
        this.setState({
          fileList: [],
        });
      }
    }
  }

  triggerChange = () => {
    const { fileList } = this.state;
    if (fileList.length === 0) {
      this.props.onChange();
    }
    this.props.onChange(fileList);
  }

  handleCancel = () => {
    this.setState({ previewVisible: false });
  }

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList, file }) => {
    if(file.status === 'done'){
      setTimeout(() => {
        const convertFileList = fileList.map(item => {
          if(item.status === 'done'){
            console.log('item: ', JSON.parse(JSON.stringify(item)));
            return {
              uid: item.uid || guid(),
              status: item.status || 'done',
              url: item.response ? `${URLBASE}${item.response.key}` : item.url,
            };
          }
          return item;
        });
        this.setState(
          {
            fileList: convertFileList,
          }, 
          this.triggerChange
        );
      }, 1000);
    }
    this.setState({fileList});
  }


  render() {
    const { className, global, max } = this.props;
    const { fileList, previewVisible, previewImage } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    return (
      <div
        className={classnames("clearfix", "gym-img-upload", className)}
      >
        <Upload
          action={UPLOADURL}
          listType="picture-card"
          data={{
            token: global.qiniu.token,
          }}
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= max ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="img" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default GymImgUpload;