import React, { Component } from 'react';
import { Card, Breadcrumb, Table, Form, Input, Button } from 'antd';
import { connect } from 'dva';
import  AddOrEditTenant from './components/addOrEdit'
import './index.less';

@connect()
@Form.create()
class Index extends Component {

  state = {
    tableData: [],
    visible: false,
    tenantInfo:{},
    options: [],
  }
  componentDidMount() {
    this.getTableData();
  }
  //获取地址
  getAdress = (payload) => {
    this.props.dispatch({
      type: 'tenant/addressList',
      payload,
    }).then(res => {
      this.setState({
        options: res.data.data,
      });
    });
  }
  //获取表格数据
  getTableData = (payload) => {
    this.props.dispatch({
      type: 'tenant/list',
      payload,
    }).then(res => {
      res.data.data.rows.forEach(item => {
        item.address = item.province + item.city + item.district + item.address
      });
      this.setState({
        tableData: res.data.data.rows,
      });
    });
  }
  //搜索
  search = () => {
    const formSearch = this.props.form.getFieldsValue();
    this.getTableData({
      pageNumber: 1,
      ...formSearch,
    });
  }
  //重置
  reset = () => {
    this.props.form.resetFields()
    this.getTableData();
  }
  //修改
  edit = () => {

  }
  //新增
  newAdd = () => {
    this.setState({
      visible: true,
    })
    this.getAdress()
  }
  //关闭弹窗
  onClose = () => {
    this.setState({
      visible: false,
    })
  }
  
  onChange=(value)=>{
    console.log(value);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { tableData, visible, options, tenantInfo } = this.state;
    const columns = [{
      title: '公司名',
      dataIndex: 'tenantName',
      key: 'tenantName',
    }, {
      title: '联系人',
      dataIndex: 'userName',
      key: 'userName',
    }, {
      title: '联系电话',
      dataIndex: 'userMobile',
      key: 'userMobile',
    }, {
      title: '客服电话',
      dataIndex: 'tenantPhone',
      key: 'tenantPhone',
    }, {
      title: '地址',
      dataIndex: 'address',
      key: 'addressDetails',
    }, {
      title: '操作',
      render: () => (
        <div>
          <a onClick={this.edit}>修改</a>
        </div>
      ),
    },
    ];
    return (
      <div className="page1">
        <Breadcrumb>
          <Breadcrumb.Item>租户管理</Breadcrumb.Item>
          <Breadcrumb.Item>租户信息</Breadcrumb.Item>
        </Breadcrumb>
        <Card bordered={false} >
          <Form layout="inline" className="search-form">
            <Form.Item
              label="公司名"

            >
              {getFieldDecorator('tenantName')(
                <Input type="text" placehoder="请输入" />)}
            </Form.Item>
            <Form.Item
              label="联系人"

            >
              {getFieldDecorator('userName')(
                <Input type="text" placehoder="请输入" />)}
            </Form.Item>
            <Form.Item >
              <Button type="primary" onClick={this.search}>搜索</Button>
            </Form.Item>
            <Form.Item >
              <Button type="primary" onClick={this.reset}>重置</Button>
            </Form.Item>
          </Form>
          <Button type="primary" icon="plus" className="newAddBtn" onClick={this.newAdd}>新增</Button>
          <Table
            columns={columns}
            dataSource={tableData}
            rowClassName="editable-row"
          />
        </Card>
        <AddOrEditTenant
          visible={visible}
          options={options}
          onClose={this.onClose}
          onChange={this.onChange}
          tenantInfo={tenantInfo}
        >

        </AddOrEditTenant>
      </div>
    );
  }
}

export default Index;