function Node(data, left, right) {
  return { data, left, right };
}

function Tree(array) {
  let root = buildTree(array);

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

  // Insert value into its position in the tree
  function insert(value) {
    function helper(node) {
      if (node === null) return new Node(value, null, null);
      if (node.data > value) node.left = helper(node.left);
      if (node.data < value) node.right = helper(node.right);
      return node;
    }

    helper(root);
  }

  // Returns node with minimum value in subtree
  function minValueChild(node) {
    if (node.left === null) return node;
    return minValueChild(node.left);
  }

  // Delete value from the tree
  function deleteItem(value) {
    function helper(node, value) {
      if (node === null) return null;
      if (value < node.data) node.left = helper(node.left, value);
      else if (value > node.data) node.right = helper(node.right, value);
      else {
        // Case where node has no children
        if (node.left === null && node.right === null) return null;
        // Case where node has only one child
        else if (node.left === null) return node.right;
        else if (node.right === null) return node.left;
        // Case where node has two children
        else {
          let successor = minValueChild(node.right);
          node.data = successor.data;
          node.right = helper(node.right, successor.data);
        }
      }
      return node;
    }

    helper(root, value);
  }

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
    return Math.max(height(node.left), height(node.right)) + 1;
  }

  // Returns the depth of given node or null
  function depth(node) {
    function helper(node, value) {
      if (node === null) return -1;
      let edges = -1;
      if (
        node.data === value ||
        (edges = helper(node.left, value)) >= 0 ||
        (edges = helper(node.right, value)) >= 0
      ) {
        return edges + 1;
      }

      return edges;
    }
    const depthValue = helper(root, node.data);
    return depthValue < 0 ? null : depthValue;
  }

  // Check whether tree is balanced or not
  function isBalanced() {
    function helper(node) {
      if (node === null) return true;
      if (Math.abs(height(node.left) - height(node.right)) > 1) return false;
      return helper(node.left) || helper(node.right);
    }

    return helper(root);
  }

  // Rebalance tree after inserting new
  // item
  function rebalance() {
    const newArray = [];
    function callback(node) {
      newArray.push(node.data);
    }
    inOrder(callback);
    root = buildTree(newArray);
  }

  function getRoot() {
    return root;
  }

  return {
    getRoot,
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
