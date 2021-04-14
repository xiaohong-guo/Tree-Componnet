const TreeData = [
  {
    title: 'parent 1',
    key: '0-0',
    level: 1,
    moveLevel: 10,
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        level: 2,
        moveLevel: 4,
        needRelatedLeaf: true,
        children: [
          {
            title: 'leaf1-0-1',
            key: '0-0-0-0',
            level: 3,
            isLeaf: true
          },
          {
            title: 'leaf1-0-2',
            key: '0-0-0-1',
            level: 3,
            isLeaf: true
          },
          {
            title: 'leaf1-0-3',
            key: '0-0-0-2',
            level: 3,
            isLeaf: true
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        level: 2,
        moveLevel: 2,
        needRelatedLeaf: true,
        children: [
          {
            title: 'leaf1-1-1',
            key: '0-0-1-0',
            level: 3,
            isLeaf: true
          },
        ],
      },
      {
        title: 'parent 1-2',
        key: '0-0-2',
        level: 2,
        moveLevel: 3,
        needRelatedLeaf: true,
        children: [
          {
            title: 'leaf1-2-1',
            key: '0-0-2-0',
            level: 3,
            isLeaf: true
          },
          {
            title: 'leaf1-2-2',
            key: '0-0-2-1',
            level: 3,
            isLeaf: true
          },
        ],
      },
    ],
  },
  {
    title: 'parent 2',
    key: '0-1',
    level: 1,
    moveLevel: 4,
    children: [
      {
        title: 'parent 2-0',
        key: '0-1-0',
        level: 2,
        needRelatedLeaf: true,
        children: [
          {
            title: 'leaf2-0-1',
            key: '0-1-0-0',
            level: 3,
            isLeaf: true
          },
          {
            title: 'leaf2-0-2',
            key: '0-1-0-1',
            level: 3,
            isLeaf: true
          },
        ],
      },
    ],
  },
  {
    title: 'parent 3',
    key: '0-2',
    level: 1,
    moveLevel: 6,
    children: [
      {
        title: 'parent 3-0',
        key: '0-3-0',
        level: 2,
        needRelatedLeaf: true,
        children: [
          {
            title: 'leaf3-0-1',
            key: '0-3-0-0',
            level: 3,
            isLeaf: true
          },
          {
            title: 'leaf3-0-2',
            key: '0-3-0-1',
            level: 3,
            isLeaf: true
          },
          {
            title: 'leaf3-0-1',
            key: '0-3-0-0',
            level: 3,
            isLeaf: true
          },
          {
            title: 'leaf3-0-2',
            key: '0-3-0-1',
            level: 3,
            isLeaf: true
          },
        ],
      },
    ],
  },
  {
    title: 'parent 4',
    key: '0-3',
    level: 1,
  }
];

const originTreeData = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        children: [
          {
            title: 'leaf1-0-1',
            key: '0-0-0-0',
          },
          {
            title: 'leaf1-0-2',
            key: '0-0-0-1',
          },
          {
            title: 'leaf1-0-3',
            key: '0-0-0-2',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [
          {
            title: 'leaf1-1-1',
            key: '0-0-1-0',
          },
        ],
      },
      {
        title: 'parent 1-2',
        key: '0-0-2',
        children: [
          {
            title: 'leaf1-2-1',
            key: '0-0-2-0',
          },
          {
            title: 'leaf1-2-2',
            key: '0-0-2-1',
          },
        ],
      },
    ],
  },
  {
    title: 'parent 2',
    key: '0-1',
    children: [
      {
        title: 'parent 2-0',
        key: '0-1-0',
        children: [
          {
            title: 'leaf2-0-1',
            key: '0-1-0-0',
          },
          {
            title: 'leaf2-0-2',
            key: '0-1-0-1',
          },
        ],
      },
    ],
  },
  {
    title: 'parent 3',
    key: '0-2',
    children: [
      {
        title: 'parent 3-0',
        key: '0-2-0',
        children: [
          {
            title: 'leaf3-0-1',
            key: '0-2-0-0',
          },
          {
            title: 'leaf3-0-2',
            key: '0-2-0-1',
          },
          {
            title: 'leaf3-0-1',
            key: '0-2-0-0-2',
          },
          {
            title: 'leaf3-0-2',
            key: '0-2-0-3',
          },
        ],
      },
    ],
  },
  {
    title: 'parent 4',
    key: '0-3',
    children: [
      {
        title: 'parent 4-0',
        key: '0-3-0'
      }
    ]
  }
];

export {
  TreeData,
  originTreeData
}