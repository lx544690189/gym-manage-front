import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Breadcrumb, Table, Form, Input, Button, Drawer } from 'antd';
import AddUser from './components/addUser';
import './index.less';

const FormItem = Form.Item;

@connect()
@Form.create()
class Index extends Component {

  state = {
    tableData: [],
    addUserVisible: false,
  }

  componentDidMount() {
    console.log(this.props);
    this.props.dispatch({
      type: 'user/list',
      payload: {},
    }).then(res => {
      console.log('res: ', res);
      this.setState({
        tableData: res.data.data.rows,
      });
    });
  }

  // 新增用户
  addUser = () => {
    this.setState({
      addUserVisible: true,
    });
  }



  render() {
    const { tableData, addUserVisible } = this.state;
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
      title: '年龄',
      dataIndex: 'age',
    }, {
      title: '手机号',
      dataIndex: 'mobile',
    }, {
      title: '操作',
      render: () => {
        return (
          <div>
            <a>修改</a>
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
          <Form layout="inline" onSubmit={this.handleSubmit} className="search">
            <FormItem label="姓名">
              {getFieldDecorator('userName')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
            <FormItem className="btn">
              <Button type="primary">搜索</Button>
              <Button>重置</Button>
            </FormItem>
          </Form>
          <div className="add">
            <Button type="primary" icon="plus" onClick={this.addUser}>新增</Button>
          </div>
          <Table
            rowKey="id"
            columns={columns}
            dataSource={tableData}
          />
        </Card>
        <AddUser
          visible={addUserVisible}
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