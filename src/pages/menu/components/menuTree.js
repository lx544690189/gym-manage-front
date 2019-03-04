import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Tree, Icon, Modal } from 'antd';

const { TreeNode } = Tree;

@connect(({ menu }) => ({
  menu,
}))
class Index extends Component {

  state = {
    fileList: [],
  }

  componentDidMount(){
    this.props.dispatch({
      type: 'menu/menuTree',
    });
  }

  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.name} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode title={item.name}  key={`${item.pId}-${item.id}`} dataRef={item} />;
    });
  }

  onSelect = (selectedKeys, e)=>{
    const currentNode = e.node.props.dataRef;
    this.props.onSelect(currentNode);
  }

  render() {
    const { menu } = this.props;

    return (
      <Tree
        className="draggable-tree"
        showLine
        draggable
        onSelect={this.onSelect}
      >
        {this.renderTreeNodes(menu.menuTree)}
      </Tree>
    );
  }
}

export default Index;