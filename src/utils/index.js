
/**
 * 获取某个节点的子节点与及子孙节点的总个数
 * @param {*} obj 节点
 * @param {*} type 节点子节点key值
 * @returns 子节点+子孙节点总数
 */
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

/**
 * 找某个节点的父节点
 * @param {*} source 数据源
 * @param {*} obj 当前节点
 * @returns 当前节点的直接上级父节点
 */
function findParentNode(source,obj) {
  let parentNode = null;
  if(obj.level === 1) {
    parentNode = source;
  }
  const forFn = (data, obj) => {
    const parentKey = obj.level !== 1 && obj.key.slice(0, obj.key.length - 2);
    Array.isArray(data) && data.forEach(item => {
      if(item.key === parentKey) {
        parentNode = item
      } else {
        if(item.children) {
          forFn(item.children, obj)
        }
      }
    })
  }
  forFn(source, obj);
  return parentNode;
}

/**
 * 判断当前节点是否为同层级的最后一个节点
 * @param {*} source 数据源
 * @param {*} obj 当前节点
 * @returns boolean value
 */
 const isSameLevelLastNode = (source, obj) => {
  // 直属父级
  const parentNode = findParentNode(source, obj);
  const len = Array.isArray(parentNode) ? parentNode.length : parentNode?.children?.length;
  console.log(parentNode);
  let isLastNode = false;
  if(Array.isArray(parentNode)) {
    isLastNode = parentNode[len - 1].key === obj.key;
  } else {
    isLastNode =  parentNode?.children[len-1].key === obj.key;
  }
  return isLastNode;
}

/**
 * 查找某个节点的所有父节点
 * @param {*} source 数据源
 * @param {*} id 当前节点字段值
 * @param {*} type 以哪个字段去查找
 * @returns 当前节点的所有父节点
 */
 function findAllParentNode (source, id, type) {
  var temp = []
  var forFn = function (arr, id) {
    for (var i = 0; i < arr.length; i++) {
      var item = arr[i]
      if (item[type] === id) {
        temp.push(item)
        forFn(source, item[type].slice(0, item[type].length -2))
        break
      } else {
        if (item.children) {
          forFn(item.children, id)
        }
      }
    }
  }
  forFn(source, id)
  return temp
}

/**
 * 更新多个子节点
 * @param {*} source 数据源
 * @param {*} newNodeList 更新值
 * @param {*} type 操作类型
 * @returns 更新后的数据
 */
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

/**
 * 更新单一子节点
 * @param {*} source 数据源
 * @param {*} obj 需要被更新的节点
 * @param {*} newVal 需要被更新的节点的新值
 * @returns 更新后的数据
 */
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

/**
 * 为🌲标记叶子节点
 * @param {*} source 
 * @returns 标记叶子节点
 */
const setLeaf = (source) => {

  return source;
}
/**
 * 对treeData🌲形结构进行处理, 添加节点的层级、画线的深度等作图需要的信息
 * @param {*} data 数据源
 * @param {*} maxLevel 最大层级
 * @param {*} currLevel 当前层级
 * @returns 处理后的数据
 */
const reduceTreeData = function(data, maxLevel, currLevel = 0, levelArr=[]) {
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
      levelArr.push(currLevel)
			newNode.children = reduceTreeData(temp.children, maxLevel, currLevel, levelArr);
			currLevel--  
      newNode.deep = getLeafCountTree(temp, 'children') + 1
      newNode.backupChild = newNode.children;
		}  else {
      if(newNode.level !== 1) {
        newNode.isLeaf = true
      }
    }
    // if(newNode.level === Math.max.apply(null, levelArr) + 1) {
    //   newNode.isLeaf = true;
    // }
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
  updateSomeNode,
  isSameLevelLastNode
}