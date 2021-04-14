/* eslint-disable react/style-prop-object */
/* eslint-disable array-callback-return */
import React from 'react';
import './Tree.css';
import { 
  reduceTreeData, 
  updateNode, 
  getLeafCountTree,
  findAllParentNode,
  updateSomeNode
} from '../../utils/index.js';
import { PlusSquareOutlined, MinusSquareOutlined } from '@ant-design/icons';

const Tree = ({ treeData }) => {
  const reducedData = reduceTreeData(treeData);
  const [originData] = React.useState(reducedData);
  const [data, setData] = React.useState(reducedData);

  const renderLine = (width, obj) => (
    <>
      {
        !obj.isLeaf && obj.deep ? (
          <svg xmlns="http://wwww.w3.org/2000/svg" height={obj.deep * 24} className="line-item">
            <line 
              x1={ width * 1.5} 
              y1="26" 
              x2={ width*1.5 } 
              y2={obj.deep * 24} 
              style={{stroke: 'silver', strokeWidth: 1}}
            />
          </svg>
        ) : null
      }
      {
        obj.needRelatedLeaf ? (
          <>
            <svg height={(obj.children.length + 1) * 24} xmlns="http://wwww.w3.org/2000/svg" className="line-item">
              <line 
                x1={ width * 2.2} 
                y1="26" 
                x2={ width*2.2 }
                y2={(obj.children.length + 0.75) * 24 - 2} 
                style={{stroke: 'silver', strokeWidth: 1}}
              />
            </svg>
          </>
        ) : null 
      }
      {
        obj.isLeaf ? (
          <>
            <svg width="32" height="32" xmlns="http://wwww.w3.org/2000/svg" className="line-item-H" style={{left: `${width * 1.77}`, marginTop: 16}}>
              <line 
                x1="0" 
                y1="0" 
                x2="16" 
                y2="0" 
                style={{stroke: 'silver', strokeWidth: 1}}
              />
            </svg>
          </>
        ) : null
      }
      <svg width={width} height={20} xmlns="http://wwww.w3.org/2000/svg">
        <rect 
          stroke="transparent"
          fill="transparent"
          width={width}
          height="20"
          x="0"
          y="0"
        ></rect>
      </svg>
    </>
  )


  const handlePlus = (e, obj) => {
    let res = updateNode(data, obj, {
      open: false,
      children: [],
      deep: 1
    })
    const parentKey = obj.key.slice(0, obj.key.length -2);
    let parentNodeList = findAllParentNode(data, parentKey, 'key');
    if(parentNodeList?.length) {
      res = updateSomeNode(res,parentNodeList, 'plus');
    }
    parentNodeList?.length && parentNodeList.forEach(node => {

      console.log('deep', getLeafCountTree(node, 'children'))
    })
    setData([...res]);
  
  }

  const handleMinus = (e, obj) => {
    const children = 
      (obj.backupChild.length && !obj.children.length) ? 
      obj.backupChild : 
      []
    let res = updateNode(data, obj, {
      open: true,
      children: children,
      deep: getLeafCountTree(obj, 'backupChild') + 1
    })
    const parentKey = obj.key.slice(0, obj.key.length -2);
    let parentNodeList = findAllParentNode(data, parentKey, 'key');
    if(parentNodeList?.length) {
      res = updateSomeNode(res,parentNodeList, 'minus');
    }
    setData([...res]);
  }


  const renderTree = (data) => (
    data.map(obj => 
      obj.children ? (
        <div>
          {obj.isLeaf ? renderLine(16 * (obj.level + 3), obj) : renderLine(16 * obj.level, obj)}
          <span className="icon-item">
           {
             obj.open ? (
              <span onClick={(e) => handlePlus(e, obj)}>
                <MinusSquareOutlined />
              </span>
             ) : (
              <span onClick={(e) => handleMinus(e, obj)}>
                <PlusSquareOutlined />
              </span>
             )
           }
          </span>
          <span className="tree-node-content">
            <span>{obj.title}</span>
          </span>
          {renderTree(obj.children)}
       </div>
      ) : (
        <div>
          {obj.isLeaf ? renderLine(16 * (obj.level + 3), obj) : renderLine(16 * obj.level, obj)}
          <span className="tree-node-content">
            <span>{obj.title}</span>
          </span>
        </div>
      )
    )
  )

  return (
    <div className="tree-container">
      {renderTree(data)}
    </div>
  )
}

export default Tree;
