function Node(data, left, right) {
  return { data, left, right };
}

function Tree(array) {
  const root = buildTree(array);

  function buildTree(array) {
    if (array.length === 1) return new Node(array[0], null, null);
    if (array.length === 0) return null;
    // First sort then remove duplicates
    const sortedArray = Array.from(new Set(array.sort((a, b) => a - b)));
    const mid = Math.floor(sortedArray.length / 2);
    const leftTree = sortedArray.slice(0, mid);
    const rightTree = sortedArray.slice(mid + 1);

    return new Node(
      sortedArray[mid],
      buildTree(leftTree),
      buildTree(rightTree),
    );
  }

  function insert(value) {
    function helper(node) {
      if (node === null) return new Node(value, null, null);
      if (node.data > value) node.left = helper(node.left);
      if (node.data < value) node.right = helper(node.right);
      return node;
    }

    helper(root);
  }

  function deleteItem(value) {}

  // Searches for value inside the tree
  // if it not exist returns null
  function find(value) {
    function helper(node) {
      if (node === null || node.data === value) {
        return node;
      }
      return value < node.data ? helper(node.left) : helper(node.right);
    }

    return helper(root);
  }

  // Recursive level order traversal
  function levelOrder(callback) {
    if (callback === undefined) {
      throw new Error("Callback is required");
    }
    function helper(node, level) {
      if (node === null) return;
      if (level === 1) callback(node);
      helper(node.left, level - 1);
      helper(node.right, level - 1);
    }

    let level = height(root);
    for (let i = 1; i < level + 1; i++) {
      helper(root, i);
    }
  }

  function levelOrderIterative(callback) {
    if (callback === undefined) {
      throw new Error("Callback is required");
    }

    const queue = [];
    queue.push(root);

    while (queue.length !== 0) {
      let node = queue.shift();
      callback(node);
      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }
  }

  // Traverses the tree and call callback
  // on each node
  function inOrder(callback) {
    if (callback === undefined) {
      throw new Error("Callback is required");
    }

    function helper(node) {
      if (node === null) return;
      helper(node.left);
      callback(node);
      helper(node.right);
    }

    helper(root);
  }

  // Traverses the tree and call callback
  // on each node
  function preOrder(callback) {
    if (callback === undefined) {
      throw new Error("Callback is required");
    }

    function helper(node) {
      if (node === null) return;
      callback(node);
      helper(node.left);
      helper(node.right);
    }

    helper(root);
  }
  // Traverses the tree and call callback
  // on each node
  function postOrder(callback) {
    if (callback === undefined) {
      throw new Error("Callback is required");
    }

    function helper(node) {
      if (node === null) return;
      helper(node.left);
      helper(node.right);
      callback(node);
    }

    helper(root);
  }

  // Returns the height of the given node
  function height(node) {
    if (node === null) return 0;
    const leftHeight = height(node.left);
    const rightHeight = height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  function depth(node) {}
  function isBalanced() {}
  function rebalance() {}

  return {
    root,
    insert,
    deleteItem,
    find,
    levelOrder,
    levelOrderIterative,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
}

export default Tree;
