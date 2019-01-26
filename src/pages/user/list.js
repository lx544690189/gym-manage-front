import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Breadcrumb, Table, Form, Input, Button, message, Modal } from 'antd';
import AddOrEditUser from './components/addOrEditUser';
import './index.less';

const FormItem = Form.Item;
const confirm = Modal.confirm;

@connect(({ loading }) => ({
  loading: loading.effects['user/list'],
}))
@Form.create()
class Index extends Component {

  state = {
    tableData: [],
    current: 1,
    total: 0,
    addUserVisible: false,
    userInfo: {},
  }

  componentDidMount() {
    this.getTableData();
  }

  getTableData = (payload) => {
    this.props.dispatch({
      type: 'user/list',
      payload,
    }).then(res => {
      this.setState({
        tableData: res.data.data.rows,
        total: res.data.data.count,
      });
    });
  }

  pageChange = (pageNumber) => {
    this.setState({
      current: pageNumber,
    });
    this.getTableData({
      pageNumber,
    });
  }

  // 搜索
  search = () => {
    const values = this.props.form.getFieldsValue();
    this.getTableData({
      pageNumber: 1,
      ...values,
    });
    this.setState({
      current: 1,
    });
  }

  // 重置
  reset = () => {
    this.props.form.resetFields();
    this.getTableData({
      pageNumber: 1,
    });
    this.setState({
      current: 1,
    });
  }

  // 新增用户
  addUser = () => {
    this.setState({
      addUserVisible: true,
      userInfo: {},
    });
    this.addUserRef.props.form.resetFields();
  }

  // 修改用户信息
  edit = (row) => {
    this.setState({
      addUserVisible: true,
      userInfo: row,
    });
    this.addUserRef.props.form.resetFields();
  }

  // 新增/修改 提交
  onOk = (values) => {
    if (values.id) {
      this.props.dispatch({
        type: 'user/updateAccount',
        payload: values,
      }).then(res => {
        if (res.data.success) {
          message.success('修改用户信息成功！');
          this.setState({
            addUserVisible: false,
            current: 1,
          });
          this.getTableData({
            pageNumber: 1,
          });
        } else {
          message.error(res.data.message);
        }
      });
    } else {
      this.props.dispatch({
        type: 'user/addAccount',
        payload: values,
      }).then(res => {
        if (res.data.success) {
          message.success('新增用户成功！');
          this.setState({
            addUserVisible: false,
            current: 1,
          });
          this.getTableData({
            pageNumber: 1,
          });
        } else {
          message.error(res.data.message);
        }
      });
    }
  }

  // 重置用户密码
  resetPassword = (row) => {
    confirm({
      title: '确认要重置此用户的密码？',
      content: '该用户密码将重置为手机号后6位，请谨慎操作！',
      okType: 'danger',
      onOk: () => {
        this.props.dispatch({
          type: 'user/resetPassword',
          payload: {
            id: row.id,
            mobile: row.mobile,
          },
        }).then(res => {
          if (res.data.success) {
            message.success(`用户${row.name}密码已重置`);
            this.setState({
              current: 1,
            });
            this.getTableData({
              pageNumber: 1,
            });
          } else {
            message.error(res.data.message);
          }
        });
      },
    });
  }

  render() {
    const { tableData, addUserVisible, current, total, userInfo } = this.state;
    const { loading } = this.props;
    const { getFieldDecorator } = this.props.form;
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
    }, {
      title: '性别',
      dataIndex: 'sex',
      render: (text, record) => {
        if (text === 'male') {
          return '男';
        }
        if (text === 'female') {
          return '女';
        }
        return '-';
      },
    }, {
      title: '手机号',
      dataIndex: 'mobile',
    }, {
      title: '出生日期',
      dataIndex: 'birthday',
    }, {
      title: '创建日期',
      dataIndex: 'created_at',
    }, {
      title: '操作',
      render: (row) => {
        return (
          <div className="operation">
            <a onClick={this.edit.bind(this, row)}>修改</a>
            <a onClick={this.resetPassword.bind(this, row)}>重置密码</a>
          </div>
        );
      },
    }];
    return (
      <div className="user-list">
        <Breadcrumb>
          <Breadcrumb.Item>用户管理</Breadcrumb.Item>
          <Breadcrumb.Item>用户列表</Breadcrumb.Item>
        </Breadcrumb>
        <Card bordered={false} >
          <Form layout="inline" className="search">
            <FormItem label="姓名">
              {getFieldDecorator('userName')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
            <FormItem label="手机号">
              {getFieldDecorator('mobile')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
            <FormItem className="btn">
              <Button type="primary" onClick={this.search}>搜索</Button>
              <Button onClick={this.reset}>重置</Button>
            </FormItem>
          </Form>
          <div className="add">
            <Button type="primary" icon="plus" onClick={this.addUser}>新增</Button>
          </div>
          <Table
            rowKey="id"
            columns={columns}
            dataSource={tableData}
            loading={loading}
            pagination={{
              current,
              total,
              showTotal(total) {
                return `共 ${total} 条`;
              },
              onChange: this.pageChange,
            }}
          />
        </Card>
        <AddOrEditUser
          onRef={ref => this.addUserRef = ref}
          visible={addUserVisible}
          userInfo={userInfo}
          onOk={this.onOk}
          onClose={() => {
            this.setState({
              addUserVisible: false,
            });
          }}
        />
      </div>
    );
  }
}

export default Index;