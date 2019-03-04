import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Tree, Icon, Modal } from 'antd';
import { GymLayout } from 'gym';
import MenuTree from './components/menuTree';
import './index.less';

const { TreeNode } = Tree;

@connect(({ global }) => ({
  global,
}))
class Index extends Component {

  state = {
    currentNode: {},
  }

  onSelect = (currentNode) => {
    this.setState({
      currentNode,
    });
  }


  render() {
    const { currentNode } = this.state;
    const { global } = this.props;
    return (
      <GymLayout className="menu">
        <div className="menu-layout">
          <Card
            title="菜单树"
            className="tree"
            bordered={false}
          >
            <MenuTree
              onSelect={this.onSelect}
            />
          </Card>
          <Card
            title={`配置${currentNode.name ? ` - ${currentNode.name}` : ''}`}
            className="options"
            bordered={false}
          >
            2
          </Card>
        </div>
      </GymLayout>
    );
  }
}

export default Index;