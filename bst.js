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

  function insert(value) {}
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

  function levelOrder(callback) {}
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
  function preOrder(callback) {}
  function postOrder(callback) {}
  function height(node) {}
  function depth(node) {}
  function isBalanced() {}
  function rebalance() {}

  return {
    root,
    insert,
    deleteItem,
    find,
    levelOrder,
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
