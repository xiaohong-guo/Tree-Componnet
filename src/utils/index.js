
function getLeafCountTree(obj, type) {
  let val = obj[type];
  if(!val || !val.length){
      return 1;
  }else{
      var leafCount = 0;
      for(var i = 0 ; i < val?.length ; i++){
        if(val[i][type]) {
          leafCount = leafCount + getLeafCountTree(val[i], 'children');
        }
        leafCount = leafCount + getLeafCountTree(val[i]);
      }
      return leafCount;
  }
}

function findParentNode(source,obj) {
  const parentKey = obj.key.slice(0, obj.key.length - 2);
  let parentNode = null;
  Array.isArray(source) && source.forEach(item => {
    if(!item.children) {
      if(item.key === parentKey) {
        parentNode=item;
      }
    } else {
      if(item.key === parentKey) {
        parentNode=item;
      }
      findParentNode(item.children, obj);
    }
  })
  return parentNode;
}

 function findAllParentNode (arr1, id, type) {
  var temp = []
  var forFn = function (arr, id) {
    for (var i = 0; i < arr.length; i++) {
      var item = arr[i]
      if (item[type] === id) {
        temp.push(item)
        forFn(arr1, item[type].slice(0, item[type].length -2))
        break
      } else {
        if (item.children) {
          forFn(item.children, id)
        }
      }
    }
  }
  forFn(arr1, id)
  return temp
}

const updateSomeNode = (source, newNodeList, type) => {
  let res = null;
  if(Array.isArray(newNodeList)) {
    newNodeList.forEach(newNode => {
      if(!res) {
        res = updateNode(source, newNode, { 
          deep: 
            type === 'plus' ? 
            getLeafCountTree(newNode, 'children') : 
            getLeafCountTree(newNode, 'children') + 1
        });
      } else {
        res = updateNode(res, newNode, { 
          deep: 
            type === 'plus' ? 
            getLeafCountTree(newNode, 'children') : 
            getLeafCountTree(newNode, 'children') + 1
        });
      }
    })
  }
  return res;
}

const updateNode = (source, obj, newVal) => {
  if(Array.isArray(source)) {
    source.map(item => {
      if(!item.children) {
        if(item.key === obj.key) {
          for(let key in newVal) {
            item[key] = newVal[key]
          }
        }
      } else {
        if(item.key === obj.key) {
          for(let key in newVal) {
            item[key] = newVal[key]
          }
        }
        updateNode(item.children, obj, newVal);
      }
      return item;
    })
  }
  return source;
}

const reduceTreeData = function(data, maxLevel, currLevel = 0) {
	if (!(data instanceof Array)) throw new TypeError('The data should be an array!');
	let result = [];
	for (let k = 0; k < data.length; k++) {
		let temp = data[k];
		let newNode = {
			...temp,
			level: currLevel + 1,
			children: null,
      isLeaf: false,
      open: true,
		};
		delete newNode.children;
		//是否在指定层级范围
		if (currLevel >= maxLevel) continue;
		if (temp.children && temp.children.length > 0) {
      // 添加叶子节点之前的line
      if(temp.children.every(item => !item.children)) {
        newNode.needRelatedLeaf = true;
      }
      // 计算tree每个子节点的层级level
			currLevel++
			newNode.children = reduceTreeData(temp.children, maxLevel, currLevel);
			currLevel--  
      newNode.deep = getLeafCountTree(temp, 'children') + 1
      newNode.backupChild = newNode.children;
		} else {
      // 判断是否为叶子节点
      if(newNode.level !== 1 ) {
        newNode.isLeaf = true;
      }
    }
		result.push(newNode);
	}
	return result;
}

export {
  reduceTreeData,
  updateNode,
  getLeafCountTree,
  findParentNode,
  findAllParentNode,
  updateSomeNode
}