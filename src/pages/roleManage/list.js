import React, { Component } from 'react';
import { Table, Button } from 'antd';
import { connect } from 'dva';
import { GymLayout } from 'gym';
import './index.less';
import AddOrEdit from './components/addOrEdit';

@connect(({role})=>({
  role,
}))
class Index extends Component {
  state = {
    data: [],
    visible: false,
    formValue: {},
    current: 1,
    total: 0,
  }
  componentDidMount() {
    this.forGetData();
  }
  // 获取角色信息
forGetData=(payload)=>{
  this.props.dispatch({
    type: 'role/list',
    payload,
  }).then((res) => {
    this.setState({
      data: res.data.rows,
      total: res.data.count,
    });
  });
}
  // 新增角色
  forAdd=(payload)=>{
    this.props.dispatch({
      type: 'role/add',
      payload,
    }).then((res) => {
      if (res.success) {
        this.setState({
          visible: false,
        });
        this.forGetData();
      }
    });
  }
  // 编辑角色
  forEdit = (payload) => {
    this.props.dispatch({
      type: 'role/edit',
      payload,
    }).then((res) => {
      if(res.success){
        this.setState({
          visible: false,
        });
        this.forGetData();
      }
    });
  }
  // 新增 编辑
  addOrEdit = (value) => {
    this.ref.props.form.resetFields();
    if (value) {
      this.setState({
        visible: true,
        formValue: value,
      });
    } else {
      this.setState({
        visible: true,
      });
    }
  }
  // 点击下一页
  onChange=(e)=>{
    this.forGetData({pageNumber: e});
  }
  // 关闭弹窗
  onClose = () => {
    this.setState({
      visible: false,
    });
  }

  render() {
    const { data, visible, formValue, current, total } = this.state;
    const columns = [{
      title: '角色名称',
      dataIndex: 'name',
    }, {
      title: '角色Code',
      dataIndex: 'code',
    }, {
      title: '操作',
      render: (text, record) => {
        return (
          <a onClick={()=>this.addOrEdit(record)}>编辑</a>
        );
      },
    }];
    return (
      <GymLayout className="role-manage">
        <div className="wrap">
          <Button type="primary" icon="plus" className="btn-margin"
            onClick={this.addOrEdit}>新增</Button>
          <Table
            columns={columns}
            dataSource={data}
            rowKey={(record) => record.id}
            pagination={{ showTotal: (total) => { return `共${total}条`; }, current, total, onChange: this.onChange}}
          />
        </div>
        <AddOrEdit
          visible={visible}
          formValue={formValue}
          onClose={this.onClose}
          forAdd={this.forAdd}
          forEdit={this.forEdit}
          onRef={(ref)=>this.ref=ref}
        >

        </AddOrEdit>
      </GymLayout>
    );
  }
}
export default Index;