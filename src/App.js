/* eslint-disable react/style-prop-object */
/* eslint-disable array-callback-return */
import React from 'react';
import { originTreeData } from './const/treeData.js';
import Tree from './componnets/tree/Tree';

const App = () => {
  return (
    <div className="app">
      <Tree treeData={originTreeData}/>
    </div>
  )
}

export default App;
