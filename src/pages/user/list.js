import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Table, Form, Input, Button, message, Modal, Select } from 'antd';
import AddOrEditUser from './components/addOrEditUser';
import { GymLayout, GymSearch } from 'gym';
import './index.less';

const confirm = Modal.confirm;
const Option = Select.Option;

@connect(({ loading, user }) => ({
  loading: loading.effects['user/list'],
  user,
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
    this.getRoleList();
  }

  // 获取角色列表
  getRoleList = () => {
    this.props.dispatch({
      type: 'user/roleList',
      payload: {
        pageSize: 100,
      },
    });
  }

  // 获取table数据
  getTableData = (payload) => {
    this.props.dispatch({
      type: 'user/list',
      payload,
    }).then(res => {
      this.setState({
        tableData: res.data.rows,
        total: res.data.count,
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
  search = (values) => {
    this.getTableData({
      pageNumber: 1,
      ...values,
    });
    this.setState({
      current: 1,
    });
  }

  // 重置
  reset = (values) => {
    this.props.form.resetFields();
    this.getTableData({
      pageNumber: 1,
      ...values,
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
        if (res.success) {
          message.success('修改用户信息成功！');
          this.setState({
            addUserVisible: false,
            current: 1,
          });
          this.getTableData({
            pageNumber: 1,
          });
        } else {
          message.error(res.message);
        }
      });
    } else {
      this.props.dispatch({
        type: 'user/addAccount',
        payload: values,
      }).then(res => {
        if (res.success) {
          message.success('新增用户成功！');
          this.setState({
            addUserVisible: false,
            current: 1,
          });
          this.getTableData({
            pageNumber: 1,
          });
        } else {
          message.error(res.message);
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
          if (res.success) {
            message.success(`用户${row.name}密码已重置`);
            this.setState({
              current: 1,
            });
            this.getTableData({
              pageNumber: 1,
            });
          } else {
            message.error(res.message);
          }
        });
      },
    });
  }

  render() {
    const { tableData, addUserVisible, current, total, userInfo } = this.state;
    const { loading, user } = this.props;
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
    const searchItem = [{
      label: '姓名',
      key: 'userName',
      render() {
        return <Input placeholder="请输入" />;
      },
    }, {
      label: '职位',
      key: 'roleCode',
      render() {
        return (
          <Select placeholder="请选择" >
            {user.roleList.map(item => <Option value={item.code} key={item.code}>{item.name}</Option>)}
          </Select>
        );
      },
    }, {
      label: '手机号',
      key: 'mobile',
      render() {
        return <Input placeholder="请输入" />;
      },
    }];
    const extendBtn = [
      <Button key="add" type="primary" icon="plus" onClick={this.addUser}>新增</Button>,
    ];
    return (
      <GymLayout className="user-list">
        <Card bordered={false} >
          <GymSearch
            searchItem={searchItem}
            onSearch={this.search}
            onReset={this.reset}
            extendBtn={extendBtn}
          />
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
      </GymLayout>
    );
  }
}

export default Index;