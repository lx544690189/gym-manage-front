import React, { Component } from 'react';
import { Card, Breadcrumb, Table, Form, Input, Button } from 'antd';
import { connect } from 'dva';
import AddOrEditTenant from './components/addOrEdit';
import './index.less';

@connect(({tenant, loading })=>({
  tenant,
  loading: loading.models.tenant,
}))
@Form.create()
class Index extends Component {
  state = {
    tableData: [],
    visible: false,
    options: [],
    tenantInfo: {},
    total: 0,
    current: 1,
  }
  componentDidMount() {
    this.getTableData();
  }
  // 获取地址
  getAddress = (payload) => {
    this.props.dispatch({
      type: 'tenant/addressList',
      payload,
    }).then((res) => {
      this.setState({
        options: res.data,
      });
    });
  }
  // 获取表格数据
  getTableData = (payload) => {
    this.props.dispatch({
      type: 'tenant/list',
      payload,
    }).then((res) => {
      const data = [...res.data.rows];
      data.forEach((item) => {
        item.addressDetails = item.province + item.city + item.district + item.address;
      });
      this.setState({
        tableData: data,
        total: res.data.count,
      });
    });
  }
  // 新增租户信息
  addTenantInfo = (data) => {
    this.props.dispatch({
      type: 'tenant/addTenantInfo',
      payload: data,
    }).then((res) => {
      if (res.success) {
        this.setState({
          visible: false,
        });
        this.getTableData();
      }
    });
  }
  // 修改
  editTenantInfo=(data)=>{
    this.props.dispatch({
      type: 'tenant/editTenantInfo',
      payload: data,
    }).then((res)=>{
      if (res.success) {
        this.setState({
          visible: false,
        });
        this.getTableData();
      }
    });
  }
  // 跳转页
  onChange=(e)=>{
    this.setState({
      current: e,
    });
    this.getTableData({pageNumber: e});
  }
  // 搜索
  search = () => {
    const formSearch = this.props.form.getFieldsValue();
    this.getTableData({
      pageNumber: 1,
      ...formSearch,
    });
    this.setState({
      current: 1,
    });
  }
  // 重置
  reset = () => {
    this.props.form.resetFields();
    this.getTableData();
    this.setState({
      current: 1,
    });
  }
  // 修改或新增
  editOrAdd = (value) => {
    if(value){
      this.setState({
        tenantInfo: value,
        visible: true,
        current: 1,
      });
    }else{
      this.setState({
        visible: true,
        current: 1,
      });
    }
    this.getAddress();
  }
  // 关闭弹窗
  onClose = () => {
    this.formRef.props.form.resetFields();
    this.setState({
      visible: false,
    });
  }
  render() {
    const {loading}=this.props;
    const { getFieldDecorator } = this.props.form;
    const { tableData, visible, options, tenantInfo, rowEditInfo, total, current} = this.state;
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
      dataIndex: 'addressDetails',
      key: 'addressDetails',
    }, {
      title: '操作',
      render: (text, record) => (
        <div>
          <a onClick={() => this.editOrAdd(record)}>修改</a>
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
          <Button type="primary" icon="plus" className="newAddBtn"
            onClick={this.editOrAdd}>新增</Button>
          <Table
            columns={columns}
            dataSource={tableData}
            loading={loading}
            pagination= {{total, current, showTotal: (total) => `共 ${total} 条`, onChange: this.onChange}}
            rowKey={(record) => record.id}
            rowClassName="editable-row"
            rowEditInfo={rowEditInfo}
          />
        </Card>
        <AddOrEditTenant
          visible={visible}
          options={options}
          tenantInfo={tenantInfo}
          onRef={(ref)=>this.formRef=ref}
          onClose={this.onClose}
          onChange={this.onChange}
          addTenantInfo={this.addTenantInfo}
          editTenantInfo={this.editTenantInfo}
        >

        </AddOrEditTenant>
      </div>
    );
  }
}

export default Index;