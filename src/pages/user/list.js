import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Breadcrumb, Table, Form, Input, Button, message } from 'antd';
import AddUser from './components/addUser';
import './index.less';

const FormItem = Form.Item;

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

  // 新增用户
  addUser = () => {
    this.setState({
      addUserVisible: true,
    });
  }

  onAdd = (values) => {
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



  render() {
    const { tableData, addUserVisible, current, total } = this.state;
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
      title: '出生日期',
      dataIndex: 'birthday',
    }, {
      title: '手机号',
      dataIndex: 'mobile',
    }, {
      title: '创建日期',
      dataIndex: 'created_at',
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
        <AddUser
          visible={addUserVisible}
          onOk={this.onAdd}
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